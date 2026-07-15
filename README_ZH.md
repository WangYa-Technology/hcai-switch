<div align="center">

# HCAI Switch

### Claude Code、Claude Desktop、Codex、Gemini CLI、OpenCode、OpenClaw、Hermes 与 Grok Build 的一站式管理工具

[![Version](https://img.shields.io/github/v/release/HeLongaa/hcai-switch?color=blue&label=version)](https://github.com/HeLongaa/hcai-switch/releases)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)](https://github.com/HeLongaa/hcai-switch/releases)
[![Built with Tauri](https://img.shields.io/badge/built%20with-Tauri%202-orange.svg)](https://tauri.app/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**组织：** [WangYa-Technology](https://github.com/WangYa-Technology) · **仓库：** [HeLongaa/hcai-switch](https://github.com/HeLongaa/hcai-switch)

[English](README.md) | 中文 | [日本語](README_JA.md) | [Deutsch](README_DE.md) | [更新日志](CHANGELOG.md)

</div>

## 为什么选择 HCAI Switch？

不同 AI 编程工具的配置格式各不相同。切换 API 供应商往往要手改 JSON、TOML 或 `.env`，MCP 与 Skills 也很难跨工具统一管理。

**HCAI Switch** 用一个桌面应用统一完成供应商切换、MCP/Skills 管理、本地代理接管与系统托盘快捷切换。数据保存在本地 SQLite，配合原子写入，降低配置损坏风险。

- **一应用，多工具** — Claude Code、Claude Desktop、Codex、Gemini CLI、OpenCode、OpenClaw、Hermes、Grok Build
- **预设与一键切换** — 内置供应商预设；主界面或托盘即可切换
- **统一 MCP 与 Skills** — 集中管理并同步到支持的应用
- **本地代理与故障转移** — 格式转换、接管路由、健康检查与故障转移
- **云同步友好** — 可将配置目录指向 Dropbox / OneDrive / iCloud / NAS，或使用 WebDAV
- **跨平台** — Windows、macOS、Linux（Tauri 2）

> **二开说明：** HCAI Switch 基于 [farion1231/cc-switch](https://github.com/farion1231/cc-switch)（MIT，作者 Jason Young）二次开发。原项目版权归原作者所有；本修改版同样以 MIT 协议分发。

## 界面预览

| 主界面 | 添加供应商 |
| :----: | :--------: |
| ![主界面](assets/screenshots/main-zh.png) | ![添加供应商](assets/screenshots/add-zh.png) |

## 功能特性

### 供应商管理

- 多工具独立预设与 live 配置投影
- 一键启用、托盘快捷切换、拖拽排序、导入/导出
- 通用配置片段，便于在供应商之间保留插件等公共字段

### 代理与故障转移

- 本地代理：热切换、格式转换、熔断与健康监控
- 应用级接管（Claude / Codex / Gemini，可细化到单个供应商）

### MCP、Prompts 与 Skills

- 统一 MCP 面板，双向同步与 Deep Link 导入
- Prompts 编辑器，跨应用同步（`CLAUDE.md` / `AGENTS.md` / `GEMINI.md`）
- Skills 支持从 GitHub 或 ZIP 安装；符号链接或文件复制

### 用量、会话与工作区

- 用量看板（花费、请求、Token、自定义模型单价）
- 会话浏览 / 搜索 / 恢复（在支持的来源上）
- OpenClaw 工作区编辑（代理文件与 Markdown 预览）

### 系统

- 自定义配置目录与 WebDAV 同步
- 深链：`ccswitch://`（导入供应商、MCP、Prompts、Skills）
- 深色 / 浅色 / 跟随系统、开机自启、自动更新
- 多语言：简体中文 / 繁體中文 / English / 日本語

## 常见问题

<details>
<summary><strong>支持哪些 AI 工具？</strong></summary>

**Claude Code**、**Claude Desktop**、**Codex**、**Gemini CLI**、**OpenCode**、**OpenClaw**、**Hermes**、**Grok Build**。各工具有独立的供应商处理（预设和/或 live 配置路径）。

</details>

<details>
<summary><strong>切换后需要重启终端吗？</strong></summary>

多数工具需要重启终端或 CLI 以重新加载配置。**Claude Code** 在许多场景下可热切换供应商数据，无需完整重启。

</details>

<details>
<summary><strong>切换后插件/公共配置不见了？</strong></summary>

使用**通用配置片段**：编辑供应商 → 通用配置面板 → 从当前供应商提取。新建供应商时保持勾选「写入通用配置」（默认开启）。首次启动导入也会把原有配置保存为 `default` 供应商。

</details>

<details>
<summary><strong>为什么不能删除当前启用的供应商？</strong></summary>

应用至少保留一套生效的 live 配置，避免卸载 HCAI Switch 后 CLI 不可用。不常用的工具可在设置中隐藏。若要回到官方登录，请添加官方预设并完成对应工具的登录流程。

</details>

<details>
<summary><strong>数据存在哪里？</strong></summary>

路径与上游布局兼容：

| 路径 | 内容 |
| --- | --- |
| `~/.cc-switch/cc-switch.db` | SQLite（供应商、MCP、Prompts、Skills 等） |
| `~/.cc-switch/settings.json` | 本机 UI 偏好 |
| `~/.cc-switch/backups/` | 自动备份（轮转） |
| `~/.cc-switch/skills/` | Skills 主副本 |
| `~/.cc-switch/skill-backups/` | 卸载前的 Skills 备份 |

</details>

<details>
<summary><strong>Linux（Wayland + NVIDIA）：点击无效 / 缩放黑屏</strong></summary>

AppImage 默认 `GDK_BACKEND=x11`（XWayland）。部分 Wayland + NVIDIA 环境会出现网页区域无法点击。可强制原生 Wayland：

```bash
CC_SWITCH_GDK_BACKEND=wayland ./HCAI-Switch-*.AppImage
```

若在平铺 Wayland 合成器下点击异常，可改为 `CC_SWITCH_GDK_BACKEND=x11`。

</details>

## 文档

- **[用户手册](docs/user-manual/zh/README.md)** — 功能说明
- **[更新日志](CHANGELOG.md)**
- **[贡献指南](CONTRIBUTING.md)** · **[支持渠道](SUPPORT.md)** · **[安全策略](SECURITY.md)**

## 快速开始

1. **添加供应商** — 添加供应商 → 选择预设或自定义配置  
2. **切换** — 主界面启用，或在系统托盘中点击供应商  
3. **生效** — 按需重启终端 / CLI（Claude Code 多数情况无需重启）  
4. **官方登录** — 添加官方预设，再完成该工具的登录 / OAuth  

**MCP / Prompts / Skills / 会话** 可从侧栏对应入口进入。首次启动可将已有 CLI 配置导入为默认供应商。

## 下载安装

### 系统要求

| 系统 | 最低版本 |
| --- | --- |
| Windows | Windows 10+ |
| macOS | macOS 12 (Monterey)+ |
| Linux | Ubuntu 22.04+ / Debian 11+ / Fedora 34+ 等 |

### 安装包

请从 **[GitHub Releases](https://github.com/HeLongaa/hcai-switch/releases)** 下载：

| 平台 | 产物 |
| --- | --- |
| Windows | `HCAI-Switch-v{version}-Windows.msi`、`…-Portable.zip`（x64 / arm64） |
| macOS | `HCAI-Switch-v{version}-macOS.dmg`（推荐）、`.zip` |
| Linux | `HCAI-Switch-v{version}-Linux-{arch}.AppImage` / `.deb` / `.rpm` |

> 第三方打包（Homebrew / AUR / Flatpak 等）可能仍使用上游 `cc-switch` 名称。HCAI Switch 请优先使用本仓库 Release 产物。

<details>
<summary><strong>架构概览</strong></summary>

```
前端 (React + TypeScript)  ──Tauri IPC──►  后端 (Rust + Tauri)
  组件 / Hooks / Query                       Commands / Services / DAO / SQLite
```

- **SSOT**：`~/.cc-switch/cc-switch.db`
- **双层存储**：可同步数据在 SQLite，本机 UI 设置在 JSON
- **双向同步**：切换时写入 live 文件；编辑当前供应商时回填
- **原子写入**：临时文件 + rename
- **分层**：Commands → Services → DAO → Database

</details>

<details>
<summary><strong>开发指南</strong></summary>

**环境：** Node.js 18+、pnpm 8+、Rust 1.85+、Tauri CLI 2.8+

```bash
pnpm install
pnpm dev              # 热更新
pnpm typecheck
pnpm test:unit
pnpm build            # 生产构建

cd src-tauri
cargo fmt
cargo clippy
cargo test
```

**技术栈：** React 18 · TypeScript · Vite · Tailwind · TanStack Query · react-i18next · shadcn/ui · Tauri 2 · Rust · SQLite

```
src/           前端
src-tauri/     Rust 后端
tests/         前端单测
assets/        截图与静态资源
docs/          手册与发版说明
```

</details>

## 贡献

欢迎在 [HeLongaa/hcai-switch](https://github.com/HeLongaa/hcai-switch) 提交 Issue 与 PR。

提交 PR 前请确保：

- `pnpm typecheck`
- `pnpm format:check`
- `pnpm test:unit`

较大功能请先开 Issue 讨论。详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 许可证

[MIT](LICENSE)

- 本修改版：**HCAI Switch** — [HeLongaa/hcai-switch](https://github.com/HeLongaa/hcai-switch)
- 上游原项目：**CC Switch** — [farion1231/cc-switch](https://github.com/farion1231/cc-switch) © Jason Young
