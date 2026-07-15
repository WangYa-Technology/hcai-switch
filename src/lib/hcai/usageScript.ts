/**
 * HCAI 中转站用量查询脚本。
 *
 * 请求 `{{baseUrl}}/v1/usage` + Bearer {{apiKey}}。
 * baseUrl 固定为网关根（可被 createHcaiUsageScript 写入当前可用节点），
 * 与 Claude 根路径 / Codex `/v1` 路径解耦；主站不可达时由 resolve 写入备用根。
 */
import { createUsageScript, type UsageScript } from "@/types";
import { TEMPLATE_TYPES } from "@/config/constants";
import { HCAI_BASE_URL, isHcaiHost, toHcaiGatewayRoot } from "./types";

const EXTRACTOR_BODY = `function(response) {
    if (!response || typeof response !== "object") {
      return {
        isValid: false,
        planName: "HCAI",
        invalidMessage: "empty response"
      };
    }
    if (response.isValid === false) {
      return {
        isValid: false,
        planName: response.planName || "HCAI",
        invalidMessage: "invalid key"
      };
    }
    var unit = response.unit || "USD";
    var planName = response.planName || "HCAI";
    var remaining = null;
    if (typeof response.remaining === "number") {
      remaining = response.remaining;
    } else if (typeof response.balance === "number") {
      remaining = response.balance;
    }
    var used = null;
    var total = null;
    var extra = null;
    var sub = response.subscription;
    if (sub && typeof sub === "object") {
      if (typeof sub.daily_limit_usd === "number" && sub.daily_limit_usd > 0) {
        used = typeof sub.daily_usage_usd === "number" ? sub.daily_usage_usd : 0;
        total = sub.daily_limit_usd;
        if (remaining === null) {
          remaining = Math.max(0, total - used);
        }
        extra = "daily";
      } else if (typeof sub.monthly_limit_usd === "number" && sub.monthly_limit_usd > 0) {
        used = typeof sub.monthly_usage_usd === "number" ? sub.monthly_usage_usd : 0;
        total = sub.monthly_limit_usd;
        if (remaining === null) {
          remaining = Math.max(0, total - used);
        }
        extra = "monthly";
      }
    }
    return {
      planName: planName,
      isValid: true,
      remaining: remaining,
      used: used,
      total: total,
      unit: unit,
      extra: extra
    };
  }`;

/** 生成 HCAI 用量脚本；baseUrl 占位由后端替换为网关根 */
export function buildHcaiUsageScriptCode(): string {
  return `({
  request: {
    url: "{{baseUrl}}/v1/usage?days=30&timezone=Asia/Shanghai",
    method: "GET",
    headers: {
      "Authorization": "Bearer {{apiKey}}",
      "Accept": "application/json",
      "User-Agent": "cc-switch/1.0"
    }
  },
  extractor: ${EXTRACTOR_BODY}
})`;
}

/** UsageScriptModal 预设 & buildHcaiProviders 默认注入共用 */
export const HCAI_USAGE_SCRIPT_CODE = buildHcaiUsageScriptCode();

/** 通过 HCAI 中转站写入各应用时默认启用的用量配置 */
export function createHcaiUsageScript(
  overrides?: Partial<UsageScript>,
): UsageScript {
  const root =
    toHcaiGatewayRoot(overrides?.baseUrl || HCAI_BASE_URL) || HCAI_BASE_URL;
  return createUsageScript({
    enabled: true,
    language: "javascript",
    code: HCAI_USAGE_SCRIPT_CODE,
    templateType: TEMPLATE_TYPES.HCAI,
    timeout: 15,
    autoQueryInterval: 5,
    ...overrides,
    // 始终写入网关根，避免 Codex 的 /v1 base 导致 /v1/v1/usage
    baseUrl: root,
  });
}

/** Base URL 是否指向 HCAI 网关（含区域节点） */
export function isHcaiBaseUrl(baseUrl: string | undefined | null): boolean {
  return isHcaiHost(baseUrl);
}
