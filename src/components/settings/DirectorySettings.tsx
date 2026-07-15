import { FolderSearch, Undo2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import type { AppId } from "@/lib/api";
import type { ResolvedDirectories } from "@/hooks/useSettings";

type DirectoryAppId = Exclude<AppId, "claude-desktop">;

interface DirectorySettingsProps {
  appConfigDir?: string;
  resolvedDirs: ResolvedDirectories;
  onAppConfigChange: (value?: string) => void;
  onBrowseAppConfig: () => Promise<void>;
  onResetAppConfig: () => Promise<void>;
  claudeDir?: string;
  codexDir?: string;
  opencodeDir?: string;
  grokDir?: string;
  onDirectoryChange: (app: DirectoryAppId, value?: string) => void;
  onBrowseDirectory: (app: DirectoryAppId) => Promise<void>;
  onResetDirectory: (app: DirectoryAppId) => Promise<void>;
}

export function DirectorySettings({
  appConfigDir,
  resolvedDirs,
  onAppConfigChange,
  onBrowseAppConfig,
  onResetAppConfig,
  claudeDir,
  codexDir,
  opencodeDir,
  grokDir,
  onDirectoryChange,
  onBrowseDirectory,
  onResetDirectory,
}: DirectorySettingsProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* HCAI Switch 配置目录 - 独立区块 */}
      <section className="space-y-4">
        <header className="space-y-1">
          <h3 className="text-sm font-medium">{t("settings.appConfigDir")}</h3>
          <p className="text-xs text-muted-foreground">
            {t("settings.appConfigDirDescription")}
          </p>
        </header>

        <div className="flex items-center gap-2">
          <Input
            value={appConfigDir ?? resolvedDirs.appConfig ?? ""}
            placeholder={t("settings.browsePlaceholderApp")}
            className="text-xs"
            onChange={(event) => onAppConfigChange(event.target.value)}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onBrowseAppConfig}
            title={t("settings.browseDirectory")}
          >
            <FolderSearch className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onResetAppConfig}
            title={t("settings.resetDefault")}
          >
            <Undo2 className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Claude / Codex / OpenCode / Grok Build 配置目录 */}
      <section className="space-y-4">
        <header className="space-y-1">
          <h3 className="text-sm font-medium">
            {t("settings.configDirectoryOverride")}
          </h3>
          <p className="text-xs text-muted-foreground">
            {t("settings.configDirectoryDescription")}
          </p>
        </header>

        <DirectoryInput
          label={t("settings.claudeConfigDir")}
          value={claudeDir}
          resolvedValue={resolvedDirs.claude}
          placeholder={t("settings.browsePlaceholderClaude")}
          onChange={(val) => onDirectoryChange("claude", val)}
          onBrowse={() => onBrowseDirectory("claude")}
          onReset={() => onResetDirectory("claude")}
        />

        <DirectoryInput
          label={t("settings.codexConfigDir")}
          value={codexDir}
          resolvedValue={resolvedDirs.codex}
          placeholder={t("settings.browsePlaceholderCodex")}
          onChange={(val) => onDirectoryChange("codex", val)}
          onBrowse={() => onBrowseDirectory("codex")}
          onReset={() => onResetDirectory("codex")}
        />

        <DirectoryInput
          label={t("settings.opencodeConfigDir")}
          value={opencodeDir}
          resolvedValue={resolvedDirs.opencode}
          placeholder={t("settings.browsePlaceholderOpencode")}
          onChange={(val) => onDirectoryChange("opencode", val)}
          onBrowse={() => onBrowseDirectory("opencode")}
          onReset={() => onResetDirectory("opencode")}
        />

        <DirectoryInput
          label={t("settings.grokConfigDir", {
            defaultValue: "Grok Build 配置目录",
          })}
          value={grokDir}
          resolvedValue={resolvedDirs.grok}
          placeholder={t("settings.browsePlaceholderGrok", {
            defaultValue: "例如：/Users/<你的用户名>/.grok",
          })}
          onChange={(val) => onDirectoryChange("grok", val)}
          onBrowse={() => onBrowseDirectory("grok")}
          onReset={() => onResetDirectory("grok")}
        />
      </section>
    </div>
  );
}

interface DirectoryInputProps {
  label: string;
  description?: string;
  value?: string;
  resolvedValue: string;
  placeholder?: string;
  onChange: (value?: string) => void;
  onBrowse: () => Promise<void>;
  onReset: () => Promise<void>;
}

function DirectoryInput({
  label,
  description,
  value,
  resolvedValue,
  placeholder,
  onChange,
  onBrowse,
  onReset,
}: DirectoryInputProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <label className="text-xs font-medium text-foreground">{label}</label>
        {description ? (
          <span className="text-[11px] text-muted-foreground">
            {description}
          </span>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        <Input
          value={value ?? resolvedValue ?? ""}
          placeholder={placeholder}
          className="text-xs"
          onChange={(event) => onChange(event.target.value)}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onBrowse}
          title={t("settings.browseDirectory")}
        >
          <FolderSearch className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onReset}
          title={t("settings.resetDefault")}
        >
          <Undo2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
