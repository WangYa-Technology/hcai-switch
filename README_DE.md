<div align="center">

# HCAI Switch

### All-in-One-Manager für Claude Code, Claude Desktop, Codex, Gemini CLI, OpenCode, OpenClaw, Hermes & Grok Build

[![Version](https://img.shields.io/github/v/release/HeLongaa/hcai-switch?color=blue&label=version)](https://github.com/HeLongaa/hcai-switch/releases)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)](https://github.com/HeLongaa/hcai-switch/releases)
[![Built with Tauri](https://img.shields.io/badge/built%20with-Tauri%202-orange.svg)](https://tauri.app/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Organisation:** [WangYa-Technology](https://github.com/WangYa-Technology) · **Repository:** [HeLongaa/hcai-switch](https://github.com/HeLongaa/hcai-switch)

[English](README.md) | [中文](README_ZH.md) | [日本語](README_JA.md) | Deutsch | [Changelog](CHANGELOG.md)

</div>

## Überblick

Jede AI-Coding-CLI nutzt eigene Konfigurationsformate. Provider zu wechseln bedeutet oft manuelles Editieren von JSON, TOML oder `.env` — ohne zentrale MCP- und Skills-Verwaltung.

**HCAI Switch** bündelt Provider-Wechsel, MCP/Skills, lokalen Proxy und Tray-Schnellwechsel in einer Desktop-App. Daten liegen lokal in SQLite mit atomaren Schreibvorgängen.

> **Hinweis zum Fork:** HCAI Switch basiert auf [farion1231/cc-switch](https://github.com/farion1231/cc-switch) (MIT, Autor Jason Young). Das Urheberrecht am Original verbleibt beim ursprünglichen Autor; dieser Fork wird ebenfalls unter MIT vertrieben.

## Funktionen

- **Tools:** Claude Code, Claude Desktop, Codex, Gemini CLI, OpenCode, OpenClaw, Hermes, Grok Build
- **Provider:** Presets, Ein-Klick-Aktivierung, Tray-Wechsel, Shared-Config-Snippets
- **Proxy:** lokaler Proxy, Formatkonvertierung, Failover, App-Level-Takeover
- **MCP / Prompts / Skills:** einheitliche Panels, Sync, Deep Link (`ccswitch://`)
- **Weitere:** Nutzungs-Dashboard, Sessions, WebDAV / eigenes Config-Verzeichnis, i18n (zh / zh-TW / en / ja)

## Screenshots

| Hauptfenster | Provider hinzufügen |
| :----------: | :-----------------: |
| ![Main](assets/screenshots/main-en.png) | ![Add](assets/screenshots/add-en.png) |

## Datenspeicher

Das Verzeichnis bleibt aus Kompatibilitätsgründen `~/.cc-switch`:

| Pfad | Inhalt |
| --- | --- |
| `~/.cc-switch/cc-switch.db` | SQLite |
| `~/.cc-switch/settings.json` | gerätebezogene UI-Einstellungen |
| `~/.cc-switch/backups/` | automatische Backups |
| `~/.cc-switch/skills/` | Skills-Masterkopien |

## Download

Bitte von den **[GitHub Releases](https://github.com/HeLongaa/hcai-switch/releases)** laden:

- Windows: `HCAI-Switch-v{version}-Windows.msi` / Portable-ZIP  
- macOS: `HCAI-Switch-v{version}-macOS.dmg` / ZIP  
- Linux: AppImage / deb / rpm  

## Entwicklung

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm test:unit
pnpm build
```

Voraussetzungen: Node.js 18+, pnpm 8+, Rust 1.85+, Tauri CLI 2.8+

Ausführlichere Abschnitte finden sich in der [englischen README](README.md) und im [User Manual](docs/user-manual/en/README.md).

## Lizenz

[MIT](LICENSE)

- Dieser Fork: [HeLongaa/hcai-switch](https://github.com/HeLongaa/hcai-switch)
- Upstream: [farion1231/cc-switch](https://github.com/farion1231/cc-switch) © Jason Young
