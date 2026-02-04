"use client";

import { useState, useCallback } from "react";

export interface FileHandlerState {
    content: string;
    fileHandle: FileSystemFileHandle | null;
    fileName: string;
    isModified: boolean;
}

export function useFileHandler(initialContent: string) {
    const [state, setState] = useState<FileHandlerState>({
        content: initialContent,
        fileHandle: null,
        fileName: "Untitled.md",
        isModified: false,
    });

    const setContent = useCallback((newContent: string) => {
        setState((prev) => ({
            ...prev,
            content: newContent,
            isModified: true,
        }));
    }, []);

    const openFile = useCallback(async () => {
        try {
            if ('showOpenFilePicker' in window) {
                const [handle] = await window.showOpenFilePicker({
                    types: [
                        {
                            description: 'Markdown Files',
                            accept: {
                                'text/markdown': ['.md', '.markdown'],
                                'text/plain': ['.txt'],
                            },
                        },
                    ],
                    excludeAcceptAllOption: false,
                    multiple: false,
                });

                const file = await handle.getFile();
                const text = await file.text();

                setState({
                    content: text,
                    fileHandle: handle,
                    fileName: file.name,
                    isModified: false
                });
            } else {
                // Fallback for browsers without File System Access API
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.md,.markdown,.txt';
                input.onchange = async (e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (!files || files.length === 0) return;
                    const file = files[0];
                    const text = await file.text();
                    setState({
                        content: text,
                        fileHandle: null,
                        fileName: file.name,
                        isModified: false
                    });
                };
                input.click();
            }
        } catch (err) {
            if ((err as Error).name !== 'AbortError') {
                console.error("Error opening file:", err);
                alert("Failed to open file");
            }
        }
    }, []);

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault();
        const items = Array.from(e.dataTransfer.items);

        // Check for File System Access API support in DataTransferItem
        const item = items[0];
        if (item.kind === 'file') {
            const entry = item.getAsFileSystemHandle?.(); // Experimental

            if (entry && entry instanceof FileSystemFileHandle && entry.name.endsWith('.md')) {
                const file = await entry.getFile();
                const text = await file.text();
                setState({
                    content: text,
                    fileHandle: entry,
                    fileName: file.name,
                    isModified: false
                });
                return;
            }

            // Standard file (fallback or non-FS access)
            const file = item.getAsFile();
            if (file && (file.name.endsWith('.md') || file.name.endsWith('.markdown') || file.name.endsWith('.txt'))) {
                const text = await file.text();
                setState({
                    content: text,
                    fileHandle: null,
                    fileName: file.name,
                    isModified: false
                });
            }
        }
    }, []);

    return {
        content: state.content,
        fileName: state.fileName,
        isModified: state.isModified,
        setContent,
        openFile,
        handleDrop,
    };
}
