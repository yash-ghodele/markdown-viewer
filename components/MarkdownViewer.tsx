"use client";

import React, { useState } from "react";
import { Toolbar } from "./Toolbar";
import { cn } from "@/lib/utils";
import { useFileHandler } from "@/hooks/useFileHandler";
import MarkdownPreview from "./MarkdownPreview";
import { remark } from "remark";
import html from "remark-html";

export default function MarkdownViewer() {
    const { content, fileName, isModified, setContent, openFile, handleDrop } = useFileHandler("# Welcome to Local Markdown Viewer\n\nStart typing or drag a file here.");
    const [viewMode, setViewMode] = useState<"split" | "editor" | "preview">("split");

    const handleExportHtml = async () => {
        try {
            const processedContent = await remark()
                .use(html)
                .process(content);
            const contentHtml = processedContent.toString();

            const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 2rem; color: #24292e; }
        pre { background: #f6f8fa; padding: 16px; border-radius: 6px; overflow: auto; }
        code { font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace; font-size: 85%; background: rgba(27,31,35,0.05); padding: 0.2em 0.4em; border-radius: 3px; }
        pre > code { background: transparent; padding: 0; }
        table { border-collapse: collapse; width: 100%; }
        table th, table td { border: 1px solid #dfe2e5; padding: 6px 13px; }
        table tr:nth-child(2n) { background-color: #f6f8fa; }
        blockquote { border-left: 0.25em solid #dfe2e5; color: #6a737d; padding: 0 1em; margin: 0; }
        img { max-width: 100%; box-sizing: content-box; background-color: #fff; }
    </style>
</head>
<body>
    ${contentHtml}
</body>
</html>`;

            const blob = new Blob([fullHtml], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName.replace(/\.(md|markdown|txt)$/i, "") + ".html";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (e) {
            console.error("Export failed", e);
            alert("Failed to export HTML");
        }
    };

    const handleExportPdf = () => {
        window.print();
    };

    const [isDragging, setIsDragging] = useState(false);
    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const onDragLeave = () => setIsDragging(false);
    const onDrop = (e: React.DragEvent) => {
        setIsDragging(false);
        handleDrop(e);
    };

    return (
        <div
            className="flex flex-col h-screen overflow-hidden print:h-auto print:overflow-visible"
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <div className="flex items-center justify-between px-4 py-1 bg-background border-b text-xs text-muted-foreground print:hidden">
                <span>{fileName}{isModified ? "*" : ""}</span>
                <span className="hidden sm:inline">Local Storage & File System Access</span>
            </div>

            <div className="print:hidden">
                <Toolbar
                    onOpenFile={openFile}
                    onExportHtml={handleExportHtml}
                    onExportPdf={handleExportPdf}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />
            </div>

            <main className="flex-1 flex overflow-hidden relative print:overflow-visible print:block">
                {/* Drag Overlay */}
                {isDragging && (
                    <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center m-4 rounded-xl border-2 border-primary border-dashed animate-pulse print:hidden">
                        <div className="text-xl font-medium text-primary">Drop Markdown file here</div>
                    </div>
                )}

                {/* Editor Pane */}
                <div className={cn(
                    "flex-1 flex flex-col min-w-0 border-r transition-all duration-300 print:hidden bg-background",
                    viewMode === "preview" ? "hidden" : "flex"
                )}>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="flex-1 w-full h-full p-6 resize-none bg-transparent font-mono text-sm leading-relaxed focus:outline-none focus:ring-0 placeholder:text-muted-foreground/50"
                        placeholder="Type markdown here..."
                        spellCheck={false}
                    />
                </div>

                {/* Preview Pane */}
                <div className={cn(
                    "flex-1 flex flex-col min-w-0 bg-secondary/30 transition-all duration-300 overflow-hidden print:bg-white print:overflow-visible print:block",
                    viewMode === "editor" ? "hidden" : "flex"
                )}>
                    <div className="h-full w-full overflow-auto p-8 print:p-0 print:overflow-visible">
                        <MarkdownPreview content={content} />
                    </div>
                </div>
            </main>

            {/* Print Styles */}
            <style jsx global>{`
        @media print {
            body {
                background: white;
                color: black;
            }
            .print\\:hidden {
                display: none !important;
            }
            .print\\:block {
                display: block !important;
            }
            .print\\:overflow-visible {
                overflow: visible !important;
            }
            .print\\:h-auto {
                height: auto !important;
            }
            /* Hide scrollbars during print */
            ::-webkit-scrollbar {
                display: none;
            }
        }
      `}</style>
        </div>
    );
}
