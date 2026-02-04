"use client";

import React from "react";
import { Moon, Sun, Upload, FileText, Columns, Eye, Download, FileUp } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ToolbarProps {
    onOpenFile: () => void;
    onExportHtml: () => void;
    onExportPdf: () => void;
    viewMode: "split" | "editor" | "preview";
    setViewMode: (mode: "split" | "editor" | "preview") => void;
}

export function Toolbar({
    onOpenFile,
    onExportHtml,
    onExportPdf,
    viewMode,
    setViewMode,
}: ToolbarProps) {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex items-center justify-between border-b px-4 py-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <h1 className="text-sm font-semibold mr-4 hidden md:block">MD Viewer</h1>
                <button
                    onClick={onOpenFile}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                    title="Open File"
                >
                    <FileUp className="w-3.5 h-3.5" />
                    <span>Open File</span>
                </button>

                <div className="h-4 w-px bg-border mx-1" />

                <div className="flex bg-muted rounded-md p-1">
                    <ViewToggle
                        active={viewMode === "editor"}
                        onClick={() => setViewMode("editor")}
                        icon={FileText}
                        label="Editor"
                    />
                    <ViewToggle
                        active={viewMode === "split"}
                        onClick={() => setViewMode("split")}
                        icon={Columns}
                        label="Split"
                    />
                    <ViewToggle
                        active={viewMode === "preview"}
                        onClick={() => setViewMode("preview")}
                        icon={Eye}
                        label="Preview"
                    />
                </div>
            </div>

            <div className="flex items-center gap-1.5">
                <button
                    onClick={onExportHtml}
                    className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group"
                    title="Export as HTML"
                >
                    <Download className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                    <span className="sr-only sm:not-sr-only sm:inline-block">HTML</span>
                </button>
                <button
                    onClick={onExportPdf}
                    className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group"
                    title="Export as PDF"
                >
                    <FileText className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                    <span className="sr-only sm:not-sr-only sm:inline-block">PDF</span>
                </button>

                <div className="h-4 w-px bg-border mx-1" />

                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="relative p-2 hover:bg-accent rounded-md transition-colors text-muted-foreground hover:text-foreground"
                    title="Toggle Theme"
                >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle Theme</span>
                </button>
            </div>
        </div>
    );
}

function ViewToggle({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: any; label: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-3 py-1 text-xs font-medium rounded-sm transition-all flex items-center gap-1.5",
                active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
        >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{label}</span>
        </button>
    );
}
