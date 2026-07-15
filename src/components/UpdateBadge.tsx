import { useUpdate } from "@/contexts/UpdateContext";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpdateBadgeProps {
  className?: string;
  onClick?: () => void;
  /** Show label next to icon (sidebar expanded layout) */
  showLabel?: boolean;
  label?: string;
}

export function UpdateBadge({
  className = "",
  onClick,
  showLabel = false,
  label,
}: UpdateBadgeProps) {
  const { hasUpdate, updateInfo } = useUpdate();
  const { t } = useTranslation();
  const isActive = hasUpdate && updateInfo;
  const title = isActive
    ? t("settings.updateAvailable", {
        version: updateInfo?.availableVersion ?? "",
      })
    : t("settings.checkForUpdates");
  const displayLabel = label ?? title;

  if (!isActive) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      title={title}
      aria-label={title}
      onClick={onClick}
      className={cn(
        "relative text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10",
        showLabel
          ? "h-11 w-full justify-start gap-2.5 px-3 rounded-lg"
          : "h-8 w-8 rounded-full p-0 justify-center",
        className,
      )}
    >
      <ArrowUpCircle className="h-4 w-4 shrink-0" />
      {showLabel && (
        <span className="text-sm font-medium truncate">{displayLabel}</span>
      )}
    </Button>
  );
}
