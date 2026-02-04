"use client";

import { useEffect } from "react";

interface KeyboardShortcutsConfig {
    onOpen?: () => void;
    onSave?: () => void;
    onExportHtml?: () => void;
    onExportPdf?: () => void;
    onToggleView?: () => void;
    onToggleTheme?: () => void;
}

export function useKeyboardShortcuts(config: KeyboardShortcutsConfig) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl/Cmd + O: Open file
            if ((e.ctrlKey || e.metaKey) && e.key === "o") {
                e.preventDefault();
                config.onOpen?.();
            }

            // Ctrl/Cmd + S: Save file
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                config.onSave?.();
            }

            // Ctrl/Cmd + E: Export HTML
            if ((e.ctrlKey || e.metaKey) && e.key === "e") {
                e.preventDefault();
                config.onExportHtml?.();
            }

            // Ctrl/Cmd + P: Export PDF/Print
            if ((e.ctrlKey || e.metaKey) && e.key === "p") {
                e.preventDefault();
                config.onExportPdf?.();
            }

            // Ctrl/Cmd + /: Toggle view mode
            if ((e.ctrlKey || e.metaKey) && e.key === "/") {
                e.preventDefault();
                config.onToggleView?.();
            }

            // Ctrl/Cmd + D: Toggle dark mode
            if ((e.ctrlKey || e.metaKey) && e.key === "d") {
                e.preventDefault();
                config.onToggleTheme?.();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [config]);
}
