//! HCAI 中转站：额度查询（绕过 WebView CORS）
//!
//! 主站不可达时按顺序尝试区域备用节点。

use serde_json::Value;
use std::time::Duration;

/// 用量路径（挂在各区域网关 `/v1` 下）
const USAGE_PATH: &str = "/v1/usage";
/// 主站优先，其后为区域备用
const HCAI_GATEWAY_ROOTS: &[&str] = &[
    "https://ai.hctopup.com",
    "https://ai-us.hctopup.com",
    "https://ai-prod.hctopup.com",
];
const FETCH_TIMEOUT_SECS: u64 = 20;

/// 查询 HCAI 密钥额度 / 用量
///
/// `GET {gateway}/v1/usage?...` + `Authorization: Bearer <api_key>`
/// 主站连接失败或 5xx 时自动切换备用网关。
#[tauri::command(rename_all = "camelCase")]
pub async fn fetch_hcai_usage(
    api_key: String,
    start_date: Option<String>,
    end_date: Option<String>,
    days: Option<u32>,
    timezone: Option<String>,
) -> Result<Value, String> {
    let key = api_key.trim();
    if key.is_empty() {
        return Err("API Key is required".to_string());
    }

    let days = days.unwrap_or(30);
    let tz = timezone.unwrap_or_else(|| "Asia/Shanghai".to_string());

    let client = crate::proxy::http_client::get();
    let mut last_err = String::from("HCAI usage: all endpoints failed");

    for root in HCAI_GATEWAY_ROOTS {
        let mut url = match reqwest::Url::parse(&format!("{root}{USAGE_PATH}")) {
            Ok(u) => u,
            Err(e) => {
                last_err = format!("HCAI usage invalid URL for {root}: {e}");
                continue;
            }
        };
        {
            let mut qp = url.query_pairs_mut();
            qp.append_pair("days", &days.to_string());
            qp.append_pair("timezone", &tz);
            if let Some(s) = start_date.as_deref().filter(|s| !s.is_empty()) {
                qp.append_pair("start_date", s);
            }
            if let Some(e) = end_date.as_deref().filter(|e| !e.is_empty()) {
                qp.append_pair("end_date", e);
            }
        }

        let response = match client
            .get(url)
            .header("Authorization", format!("Bearer {key}"))
            .header("Accept", "application/json")
            .timeout(Duration::from_secs(FETCH_TIMEOUT_SECS))
            .send()
            .await
        {
            Ok(r) => r,
            Err(e) => {
                // 连接失败 / 超时 → 尝试下一个备用节点
                last_err = format!("HCAI usage request failed ({root}): {e}");
                continue;
            }
        };

        let status = response.status();
        let body = match response.text().await {
            Ok(b) => b,
            Err(e) => {
                last_err = format!("HCAI usage read body failed ({root}): {e}");
                continue;
            }
        };

        if status.is_server_error() {
            // 5xx 视为该节点不可用，换备用
            let snippet: String = body.chars().take(200).collect();
            last_err = format!("HCAI usage HTTP {status} ({root}): {snippet}");
            continue;
        }

        if !status.is_success() {
            // 4xx（鉴权失败等）对所有节点通常一致，直接返回，避免无意义重试
            let snippet: String = body.chars().take(300).collect();
            return Err(format!("HCAI usage HTTP {status}: {snippet}"));
        }

        return serde_json::from_str::<Value>(&body)
            .map_err(|e| format!("HCAI usage invalid JSON ({root}): {e}"));
    }

    Err(last_err)
}
