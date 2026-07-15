<div align="center">

# HCAI Switch

### Claude Code / Claude Desktop / Codex / Gemini CLI / OpenCode / OpenClaw / Hermes / Grok Build 向けオールインワン管理アプリ

[![Version](https://img.shields.io/github/v/release/HeLongaa/hcai-switch?color=blue&label=version)](https://github.com/HeLongaa/hcai-switch/releases)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)](https://github.com/HeLongaa/hcai-switch/releases)
[![Built with Tauri](https://img.shields.io/badge/built%20with-Tauri%202-orange.svg)](https://tauri.app/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**組織:** [WangYa-Technology](https://github.com/WangYa-Technology) · **リポジトリ:** [HeLongaa/hcai-switch](https://github.com/HeLongaa/hcai-switch)

[English](README.md) | [中文](README_ZH.md) | 日本語 | [Deutsch](README_DE.md) | [Changelog](CHANGELOG.md)

</div>

## 概要

各 AI コーディングツールは設定形式が異なります。API プロバイダーの切り替えは JSON / TOML / `.env` の手編集になりがちで、MCP や Skills もツール横断で管理しづらいです。

**HCAI Switch** は、対応ツールのプロバイダー切替・MCP/Skills・ローカルプロキシ・トレイからの即時切替を一つのデスクトップアプリにまとめます。データはローカル SQLite に保存され、原子的書き込みで設定破損を抑えます。

> **派生について:** 本プロジェクトは [farion1231/cc-switch](https://github.com/farion1231/cc-switch)（MIT、作者 Jason Young）を基にした二次開発です。原作の著作権は原作者に帰属し、本改変版も MIT で配布します。

## 主な機能

- **対応ツール:** Claude Code、Claude Desktop、Codex、Gemini CLI、OpenCode、OpenClaw、Hermes、Grok Build
- **プロバイダー:** プリセット、ワンクリック有効化、トレイ切替、共有設定スニペット
- **プロキシ:** ローカルプロキシ、フォーマット変換、フェイルオーバー、アプリ単位のテイクオーバー
- **MCP / Prompts / Skills:** 統合パネル、双方向同期、Deep Link（`ccswitch://`）
- **その他:** 利用量ダッシュボード、セッション管理、WebDAV / カスタム設定ディレクトリ、i18n（zh / zh-TW / en / ja）

## 画面

| メイン | プロバイダー追加 |
| :----: | :--------------: |
| ![Main](assets/screenshots/main-ja.png) | ![Add](assets/screenshots/add-ja.png) |

## データ保存場所

上流互換のためディレクトリ名は `~/.cc-switch` のままです。

| パス | 内容 |
| --- | --- |
| `~/.cc-switch/cc-switch.db` | SQLite |
| `~/.cc-switch/settings.json` | 端末 UI 設定 |
| `~/.cc-switch/backups/` | 自動バックアップ |
| `~/.cc-switch/skills/` | Skills 本体 |

## ダウンロード

**[GitHub Releases](https://github.com/HeLongaa/hcai-switch/releases)** から取得してください。

- Windows: `HCAI-Switch-v{version}-Windows.msi` / Portable zip  
- macOS: `HCAI-Switch-v{version}-macOS.dmg` / zip  
- Linux: AppImage / deb / rpm  

## 開発

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm test:unit
pnpm build
```

要件: Node.js 18+、pnpm 8+、Rust 1.85+、Tauri CLI 2.8+

詳細は [English README](README.md) の Development 節、および [ユーザーマニュアル](docs/user-manual/ja/README.md) を参照してください。

## ライセンス

[MIT](LICENSE)

- 本フォーク: [HeLongaa/hcai-switch](https://github.com/HeLongaa/hcai-switch)
- 上流: [farion1231/cc-switch](https://github.com/farion1231/cc-switch) © Jason Young
