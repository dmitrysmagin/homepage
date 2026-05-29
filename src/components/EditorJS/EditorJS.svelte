<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import EditorJS from "@editorjs/editorjs";
    import { tools } from"./tools/tools";

    let { class: className = "" }: { class?: string } = $props();

    let editor: any = $state(null);
    let readOnlyState: boolean = $state(false);
    let output: string = $state("");

    const initialData = {
        blocks: [
            {
                type: "header",
                data: {
                    text: "Editor.js",
                    level: 2
                }
            },
            {
                type: "paragraph",
                data: {
                    text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.'
                }
            },
            {
                type: "header",
                data: {
                    text: "Key features",
                    level: 3
                }
            },
            {
                type: "list",
                data: {
                    items: [
                        "It is a block-styled editor",
                        "It returns clean data output in JSON",
                        "Designed to be extendable and pluggable with a simple API",
                    ],
                    style: "unordered"
                }
            },
            {
                type: "delimiter",
                data: {}
            },
            {
                type: "paragraph",
                data: {
                    text: "Editor.js workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc."
                }
            },
        ]
    };

    function handleSave() {
        editor?.save().then((savedData: any) => {
            output = JSON.stringify(savedData, null, 4);
        }).catch((error: any) => {
            console.error("Saving error", error);
        });
    }

    async function handleToggleReadOnly() {
        if (editor) {
            const state = await editor.readOnly.toggle();
            readOnlyState = state;
        }
    }

    onMount(() => {
        const holderEl = document.querySelector(".editorjs-holder") as HTMLDivElement;

        if (holderEl != null) {
            editor = new EditorJS({
                holder: holderEl,
                tools: tools,
                data: initialData,
                onReady: () => {
                    handleSave();
                },
                onChange: (api: any, event: any) => {
                    console.log("something changed", event);
                }
            });
        }
    });

    onDestroy(() => {
        editor?.destroy();
    });
</script>

<div class="editorjs-wrapper {className}">
    <div class="editorjs-toolbar">
        <div class="editorjs-toolbar-left">
            <button class="editorjs-btn editorjs-btn-save" onclick={handleSave}>
                editor.save()
            </button>
        </div>
        <div class="editorjs-toolbar-right">
            <span class="editorjs-readonly-label">
                Readonly: <b>{readOnlyState ? "On" : "Off"}</b>
            </span>
            <button class="editorjs-btn editorjs-btn-toggle" onclick={handleToggleReadOnly}>
                toggle
            </button>
        </div>
    </div>

    <div id="editorjs-holder" class="editorjs-holder"></div>

    <div class="editorjs-output">
        <h3>Output</h3>
        <pre class="editorjs-output-content">{output}</pre>
    </div>
</div>

<style>
    .editorjs-wrapper {
        max-width: 100%;
    }
    .editorjs-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: #f9f9f9;
        border: 1px solid #e8e8eb;
        border-bottom: none;
        border-radius: 8px 8px 0 0;
        gap: 12px;
        flex-wrap: wrap;
    }
    .editorjs-toolbar-left, .editorjs-toolbar-right {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .editorjs-btn {
        padding: 8px 16px;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
    }
    .editorjs-btn-save {
        background: #388ae5;
        color: white;
    }
    .editorjs-btn-save:hover {
        background: #2c7bd4;
    }
    .editorjs-btn-toggle {
        background: #6c757d;
        color: white;
    }
    .editorjs-btn-toggle:hover {
        background: #5a6268;
    }
    .editorjs-readonly-label {
        font-size: 13px;
        color: #555;
    }
    .editorjs-holder {
        border: 1px solid #e8e8eb;
        border-top: none;
        border-radius: 0 0 8px 8px;
        background: white;
    }
    .editorjs-output {
        margin-top: 20px;
    }
    .editorjs-output h3 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #333;
    }
    .editorjs-output-content {
        background: #f5f5f5;
        border: 1px solid #e8e8eb;
        border-radius: 8px;
        padding: 16px;
        overflow-x: auto;
        font-family: "PT Mono", monospace;
        font-size: 13px;
        line-height: 1.5;
        white-space: pre-wrap;
        word-break: break-all;
        max-height: 600px;
        overflow-y: auto;
    }
</style>
