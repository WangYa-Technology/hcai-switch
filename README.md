<div align="center">

# HCAI Switch

### All-in-One Manager for Claude Code, Claude Desktop, Codex, Gemini CLI, OpenCode, OpenClaw, Hermes & Grok Build

[![Version](https://img.shields.io/github/v/release/HeLongaa/hcai-switch?color=blue&label=version)](https://github.com/HeLongaa/hcai-switch/releases)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)](https://github.com/HeLongaa/hcai-switch/releases)
[![Built with Tauri](https://img.shields.io/badge/built%20with-Tauri%202-orange.svg)](https://tauri.app/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Org:** [WangYa-Technology](https://github.com/WangYa-Technology) · **Repo:** [HeLongaa/hcai-switch](https://github.com/HeLongaa/hcai-switch)

English | [中文](README_ZH.md) | [日本語](README_JA.md) | [Deutsch](README_DE.md) | [Changelog](CHANGELOG.md)

</div>

## Why HCAI Switch?

AI coding tools each use different config formats. Switching API providers usually means hand-editing JSON, TOML, or `.env` files — and there is no single place to manage MCP servers and Skills across tools.

**HCAI Switch** is a desktop app that unifies provider switching, MCP/Skills, local proxy takeover, and system-tray quick switch for the tools you already use. Data lives in a local SQLite database with atomic writes so configs are harder to corrupt.

- **One app, many tools** — Claude Code, Claude Desktop, Codex, Gemini CLI, OpenCode, OpenClaw, Hermes, and Grok Build
- **Presets & one-click switch** — Built-in provider presets; switch from the main UI or the system tray
- **Unified MCP & Skills** — Manage servers and skills with sync to supported apps
- **Local proxy & failover** — Format conversion, takeover routing, health checks, and failover
- **Cloud-friendly storage** — Point the config dir at Dropbox / OneDrive / iCloud / NAS, or use WebDAV sync
- **Cross-platform** — Windows, macOS, and Linux (Tauri 2)

> **Fork notice:** HCAI Switch is a secondary development of [farion1231/cc-switch](https://github.com/farion1231/cc-switch) (MIT, author Jason Young). Upstream copyright remains with the original author; this fork is also distributed under MIT.

## Screenshots

| Main Interface | Add Provider |
| :------------: | :----------: |
| ![Main Interface](assets/screenshots/main-en.png) | ![Add Provider](assets/screenshots/add-en.png) |

## Features

### Provider management

- Multiple tools with dedicated presets and live config projection
- One-click enable, tray quick switch, drag-and-drop sort, import/export
- Shared config snippets so plugin/common fields can travel between providers

### Proxy & failover

- Local proxy with hot-switching, format conversion, circuit breaker, and health monitoring
- App-level takeover (Claude / Codex / Gemini, down to individual providers)

### MCP, Prompts & Skills

- Unified MCP panel with bidirectional sync and Deep Link import
- Prompts editor with cross-app sync (`CLAUDE.md` / `AGENTS.md` / `GEMINI.md`)
- Skills install from GitHub or ZIP; symlink or file-copy modes

### Usage, sessions & workspace

- Usage dashboard (spend, requests, tokens, custom model pricing)
- Session browser/search/restore where supported
- OpenClaw workspace editor (agent files with Markdown preview)

### System

- Custom config directory and WebDAV sync
- Deep Link scheme: `ccswitch://` (import providers, MCP, prompts, skills)
- Dark / Light / System theme, auto-launch, auto-updater
- i18n: 简体中文 / 繁體中文 / English / 日本語

## FAQ

<details>
<summary><strong>Which AI tools are supported?</strong></summary>

**Claude Code**, **Claude Desktop**, **Codex**, **Gemini CLI**, **OpenCode**, **OpenClaw**, **Hermes**, and **Grok Build**. Each has dedicated provider handling (presets and/or live config paths).

</details>

<details>
<summary><strong>Do I need to restart the terminal after switching?</strong></summary>

For most tools, yes — restart the terminal or CLI so it reloads config. **Claude Code** can hot-switch provider data in many cases without a full restart.

</details>

<details>
<summary><strong>Plugin / common config disappeared after a switch?</strong></summary>

Use **Shared Config Snippet**: Edit Provider → Shared Config Panel → Extract from Current Provider. When creating a provider, keep **Write Shared Config** enabled (default) so common fields are written again. First-run import also keeps your original setup as a `default` provider.

</details>

<details>
<summary><strong>Why can't I delete the active provider?</strong></summary>

The app keeps at least one active live config so uninstalling HCAI Switch does not leave CLIs broken. Hide unused tools in Settings if you do not need them. To return to official login, add an official preset and complete that tool's login flow.

</details>

<details>
<summary><strong>Where is data stored?</strong></summary>

Paths stay compatible with the upstream layout:

| Path | Contents |
| --- | --- |
| `~/.cc-switch/cc-switch.db` | SQLite — providers, MCP, prompts, skills, … |
| `~/.cc-switch/settings.json` | Device-level UI preferences |
| `~/.cc-switch/backups/` | Auto backups (rotated) |
| `~/.cc-switch/skills/` | Skill master copies |
| `~/.cc-switch/skill-backups/` | Skill backups before uninstall |

</details>

<details>
<summary><strong>Linux (Wayland + NVIDIA): clicks fail / black screen on resize</strong></summary>

AppImage defaults to `GDK_BACKEND=x11` (XWayland). On some Wayland + NVIDIA setups the webview becomes unclickable. Opt into native Wayland:

```bash
CC_SWITCH_GDK_BACKEND=wayland ./HCAI-Switch-*.AppImage
```

On tiling compositors where clicks fail under Wayland, try `CC_SWITCH_GDK_BACKEND=x11` instead.

</details>

## Documentation

- **[User Manual](docs/user-manual/en/README.md)** — feature guides
- **[Changelog](CHANGELOG.md)** — version history
- **[Contributing](CONTRIBUTING.md)** · **[Support](SUPPORT.md)** · **[Security](SECURITY.md)**

## Quick start

1. **Add a provider** — Add Provider → pick a preset or custom config  
2. **Switch** — Enable in the main UI, or click the provider in the system tray  
3. **Apply** — Restart the terminal / CLI when required (Claude Code often does not need a restart)  
4. **Official login** — Add an official preset, then complete that tool’s login/OAuth flow  

**MCP / Prompts / Skills / Sessions** are available from the corresponding sidebar entries. On first launch you can import existing CLI configs as the default provider.

## Download & install

### Requirements

| OS | Minimum |
| --- | --- |
| Windows | Windows 10+ |
| macOS | macOS 12 (Monterey)+ |
| Linux | Ubuntu 22.04+ / Debian 11+ / Fedora 34+ (and similar) |

### Packages

Download from **[GitHub Releases](https://github.com/HeLongaa/hcai-switch/releases)**:

| Platform | Artifacts |
| --- | --- |
| Windows | `HCAI-Switch-v{version}-Windows.msi`, `…-Portable.zip` (x64 / arm64) |
| macOS | `HCAI-Switch-v{version}-macOS.dmg` (recommended), `.zip` |
| Linux | `HCAI-Switch-v{version}-Linux-{arch}.AppImage` / `.deb` / `.rpm` |

> Third-party packaging (Homebrew / AUR / Flatpak) may still refer to the upstream `cc-switch` name. Prefer the release assets from this repository for HCAI Switch builds.

<details>
<summary><strong>Architecture</strong></summary>

```
Frontend (React + TypeScript)  ──Tauri IPC──►  Backend (Rust + Tauri)
  Components / Hooks / Query                      Commands / Services / DAO / SQLite
```

- **SSOT**: `~/.cc-switch/cc-switch.db`
- **Dual storage**: SQLite for syncable data; JSON for device UI settings
- **Dual-way sync**: project to live files on switch; backfill when editing the active provider
- **Atomic writes**: temp file + rename
- **Layers**: Commands → Services → DAO → Database

</details>

<details>
<summary><strong>Development</strong></summary>

**Requirements:** Node.js 18+, pnpm 8+, Rust 1.85+, Tauri CLI 2.8+

```bash
pnpm install
pnpm dev              # hot reload
pnpm typecheck
pnpm test:unit
pnpm build            # production app

cd src-tauri
cargo fmt
cargo clippy
cargo test
```

**Stack:** React 18 · TypeScript · Vite · Tailwind · TanStack Query · react-i18next · shadcn/ui · Tauri 2 · Rust · SQLite

```
src/           Frontend
src-tauri/     Rust backend
tests/         Frontend unit tests
assets/        Screenshots & static assets
docs/          Manuals & release notes
```

</details>

## Contributing

Issues and PRs are welcome on [HeLongaa/hcai-switch](https://github.com/HeLongaa/hcai-switch).

Before opening a PR:

- `pnpm typecheck`
- `pnpm format:check`
- `pnpm test:unit`

Please discuss larger features in an issue first. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)

- This fork: **HCAI Switch** — [HeLongaa/hcai-switch](https://github.com/HeLongaa/hcai-switch)
- Upstream: **CC Switch** — [farion1231/cc-switch](https://github.com/farion1231/cc-switch) © Jason Young
