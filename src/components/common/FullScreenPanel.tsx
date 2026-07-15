import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  isWindows,
  isLinux,
  DRAG_REGION_ATTR,
  DRAG_REGION_STYLE,
} from "@/lib/platform";
import { isTextEditableTarget } from "@/utils/domUtils";
import { cn } from "@/lib/utils";

interface FullScreenPanelProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /**
   * 覆盖内容区滚动容器的内边距/间距类。默认 `px-6 py-6 space-y-6`。
   * 通过 `cn`(twMerge) 合并，传入如 `pt-3` 只覆盖顶部内边距，其余保持默认。
   */
  contentClassName?: string;
  /**
   * 左侧留白（px），用于露出应用侧边栏。默认 0 为全宽遮罩。
   * 面板与左边线仍从窗口顶贯通（与主页侧栏边线一致）。
   */
  leftOffset?: number;
  /**
   * 顶部内容避让高度（px）。侧栏模式下应传入 App 的 dragBarHeight：
   * - macOS Overlay 标题栏：28
   * - Linux 自绘窗控：32
   * - Windows 原生标题栏：0
   * 只垫高内容，不抬高面板本身，避免竖线不到顶。
   */
  topOffset?: number;
}

/** Fallback when App 未传入 topOffset（全宽遮罩 / 旧调用方） */
const DEFAULT_DRAG_BAR_HEIGHT = isWindows() || isLinux() ? 0 : 28;
const HEADER_HEIGHT = 64; // px - match App.tsx

/**
 * Reusable full-screen panel component
 * Handles portal rendering, header with back button, and footer
 * Uses solid theme colors without transparency
 */
export const FullScreenPanel: React.FC<FullScreenPanelProps> = ({
  isOpen,
  title,
  onClose,
  children,
  footer,
  contentClassName,
  leftOffset = 0,
  topOffset,
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC 键关闭面板
  const onCloseRef = React.useRef(onClose);

  React.useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // 子组件（例如 Radix 的 Select/Dialog/Dropdown）如果已经消费了 ESC，就不要再关闭整个面板
        if (event.defaultPrevented) {
          return;
        }

        if (isTextEditableTarget(event.target)) {
          return; // 让输入框自己处理 ESC（比如清空、失焦等）
        }

        event.stopPropagation(); // 阻止事件继续冒泡到 window，避免触发 App.tsx 的全局监听
        onCloseRef.current();
      }
    };

    // 使用冒泡阶段监听，让子组件（如 Radix UI）优先处理 ESC
    window.addEventListener("keydown", handleKeyDown, false);
    return () => {
      window.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [isOpen]);

  const insetLeft = Math.max(0, leftOffset);
  // Prefer App-provided dragBarHeight (Win=0 / mac=28 / Linux app-controls=32).
  // Fallback is platform default so Windows never gets a spurious 28px gap,
  // and macOS full-width overlays still clear the traffic lights.
  const contentTopPad = Math.max(0, topOffset ?? DEFAULT_DRAG_BAR_HEIGHT);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed inset-y-0 right-0 z-[60] flex flex-col",
            insetLeft > 0 && "border-l border-border/60",
          )}
          style={{
            left: insetLeft,
            backgroundColor: "hsl(var(--background))",
          }}
        >
          {/* 只垫高内容区，面板与左边线仍从窗口顶贯通 */}
          {contentTopPad > 0 && (
            <div
              className="shrink-0"
              {...DRAG_REGION_ATTR}
              style={
                {
                  ...DRAG_REGION_STYLE,
                  height: contentTopPad,
                } as React.CSSProperties
              }
              aria-hidden
            />
          )}

          {/* Header - match App.tsx */}
          <div
            className="flex-shrink-0 flex items-center"
            {...DRAG_REGION_ATTR}
            style={
              {
                ...DRAG_REGION_STYLE,
                backgroundColor: "hsl(var(--background))",
                height: HEADER_HEIGHT,
              } as React.CSSProperties
            }
          >
            <div
              className="px-6 w-full flex items-center gap-4"
              {...DRAG_REGION_ATTR}
              style={{ ...DRAG_REGION_STYLE } as React.CSSProperties}
            >
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={onClose}
                className="rounded-lg select-none"
                style={
                  {
                    ...(isLinux() ? {} : { WebkitAppRegion: "no-drag" }),
                  } as React.CSSProperties
                }
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold text-foreground select-none">
                {title}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto scroll-overlay min-h-0">
            <div className={cn("px-6 py-6 space-y-6 w-full", contentClassName)}>
              {children}
            </div>
          </div>

          {/* Footer */}
          {footer && (
            <div
              className="flex-shrink-0 py-4 border-t border-border-default"
              style={{ backgroundColor: "hsl(var(--background))" }}
            >
              <div className="px-6 flex items-center justify-end gap-3">
                {footer}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
