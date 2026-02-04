"use client";

import React, { memo, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import mermaid from "mermaid";

interface MarkdownPreviewProps {
    content: string;
}

// Initialize Mermaid
if (typeof window !== "undefined") {
    mermaid.initialize({
        startOnLoad: true,
        theme: "default",
        securityLevel: "loose",
        fontFamily: "inherit",
    });
}

const MarkdownPreview = memo(function MarkdownPreview({ content }: MarkdownPreviewProps) {
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (previewRef.current) {
            const mermaidElements = previewRef.current.querySelectorAll(".language-mermaid");
            mermaidElements.forEach((element, index) => {
                const code = element.textContent || "";
                const id = `mermaid-${Date.now()}-${index}`;
                const container = document.createElement("div");
                container.className = "mermaid-diagram";

                mermaid.render(id, code).then(({ svg }) => {
                    container.innerHTML = svg;
                    element.parentElement?.replaceWith(container);
                }).catch((error) => {
                    console.error("Mermaid rendering error:", error);
                    container.innerHTML = `<pre class="text-red-500">Mermaid diagram error: ${error.message}</pre>`;
                    element.parentElement?.replaceWith(container);
                });
            });
        }
    }, [content]);

    return (
        <div ref={previewRef} className="prose prose-sm dark:prose-invert max-w-none w-full break-words">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeHighlight, rehypeKatex]}
                components={{
                    code({ inline, className, children, ...props }: {
                        inline?: boolean;
                        className?: string;
                        children?: React.ReactNode;
                    }) {
                        const match = /language-(\w+)/.exec(className || "");
                        const language = match ? match[1] : "";

                        // Handle Mermaid separately
                        if (language === "mermaid") {
                            return (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        }

                        return !inline && match ? (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
});

export default MarkdownPreview;
