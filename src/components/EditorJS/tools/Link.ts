import type { API, ToolConfig, InlineTool } from '@editorjs/editorjs';

export default class Link implements InlineTool {
    _api: API;
    _config: ToolConfig;
    _readOnly: boolean;
    _CSS: any;
    _tag: string;
    _button: HTMLButtonElement | null;
    _state: any;
    linkInput: HTMLInputElement = undefined as any;
    titleInput: HTMLInputElement = undefined as any;
    inputHelper: HTMLDivElement = undefined as any;
    targetMenu: HTMLSelectElement = undefined as any;
    relMenu: HTMLSelectElement = undefined as any;
    submitButton: HTMLButtonElement = undefined as any;
    updateButton: HTMLButtonElement = undefined as any;
    resetButton: HTMLButtonElement = undefined as any;
    linkMenuContainer: HTMLDivElement = undefined as any;

    static get isInline() {
        return true;
    }

    get title() {
        return 'Hyperlink';
    }

    static get TARGETS() {
        return ['_self', '_blank', '_parent', '_top'];
    }

    static get DEFAULT_TARGET() {
        return '_self';
    }

    static get RELATIONS() {
        return [
            '', 'alternate', 'author', 'bookmark', 'canonical', 'external', 'help', 'license', 'manifest', 'me', 'next',
            'nofollow', 'noopener', 'noreferrer', 'prev', 'search', 'tag'
        ];
    }

    static get DEFAULT_RELATION() {
        return '';
    }

    static get sanitize() {
        return {
            a: {
                class: 'ce-link',
                href: true,
                title: true,
                target: true,
                rel: true,
            }
        };
    }

    _validateURL(url: string) {
        if (this._config.validate || this._config.validate === undefined) {
            const pattern = new RegExp('^(https?:\\/\\/)?' +
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
                '((\\d{1,3}\\.){3}\\d{1,3}))' +
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
                '(\\?[;&a-z\\d%_.~+=-]*)?' +
                '(\\#[-a-z\\d_]*)?$', 'i');
            if (url?.startsWith("mailto:") || url?.startsWith("tel:") ||
                (url?.startsWith("/") && url?.slice(1, 2) != "/"))
                return true;
            return !!pattern.test(url);
        }
        return true;
    }

    constructor({ api, config, readOnly }: { api: API, config: ToolConfig, readOnly: boolean }) {
        this._api = api;
        this._config = config;
        this._readOnly = readOnly;
        this._CSS = {
            inline: api.styles.inlineToolButton,
            inlineActive: api.styles.inlineToolButtonActive,
            wrapper: 'ce-link',
            actionContainer: 'ce-link-action-container',
            urlInputHelper: 'ce-link-input-helper',
            urlOptions: 'ce-link-options',
            buttons: 'ce-link-buttons',
            submitButton: 'ce-link-submit-button',
            resetButton: 'ce-link-reset-button',
        };
        this._tag = 'A';
        this._button = null;
        this._state = {
            isActive: false,
            range: null,
            anchor: null,
            title: null,
            href: null,
            target: null,
            rel: null
        };
        this.createActions();
    }

    get availableTargets() {
        return this._config.targets ? Link.TARGETS.filter(
            (target) => this._config.targets.includes(target),
        ) : Link.TARGETS;
    }

    get userDefaultTarget() {
        if (this._config.defaultTarget) {
            const userSpecified = this.availableTargets.find(
                (target) => target === this._config.defaultTarget,
            );
            if (userSpecified) {
                return userSpecified;
            }
            console.warn('(ง\'̀-\'́)ง Link Tool: the default target specified is invalid');
        }
        return Link.DEFAULT_TARGET;
    }

    get availableRelations() {
        return this._config.relations ? Link.RELATIONS.filter(
            (relation) => this._config.relations.includes(relation),
        ) : Link.RELATIONS;
    }

    get userDefaultRelation() {
        if (this._config.defaultRelation) {
            const userSpecified = this.availableRelations.find(
                (relation) => relation === this._config.defaultRelation,
            );
            if (userSpecified) {
                return userSpecified;
            }
            console.warn('(ง\'̀-\'́)ง Link Tool: the default relation specified is invalid');
        }
        return Link.DEFAULT_RELATION;
    }

    get shortcut() {
        return this._config.shortcut || 'CMD+L';
    }

    render() {
        const linkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.69998 12.6L7.67896 12.62C6.53993 13.7048 6.52012 15.5155 7.63516 16.625V16.625C8.72293 17.7073 10.4799 17.7102 11.5712 16.6314L13.0263 15.193C14.0703 14.1609 14.2141 12.525 13.3662 11.3266L13.22 11.12"></path><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16.22 11.12L16.3564 10.9805C17.2895 10.0265 17.3478 8.5207 16.4914 7.49733V7.49733C15.5691 6.39509 13.9269 6.25143 12.8271 7.17675L11.3901 8.38588C10.0935 9.47674 9.95706 11.4241 11.0888 12.6852L11.12 12.72"></path></svg>';
        const styles = getLinkStyles();
        document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
        this._button = document.createElement('button');
        this._button.type = 'button';
        this._button.classList.add(this._CSS.inline);
        this._button.innerHTML = linkIcon;
        return this._button;
    }

    _removeExistingLink(linkNode: HTMLAnchorElement) {
        this._api.selection.expandToTag(linkNode);
        const sel = window.getSelection() as any;
        const range = sel.getRangeAt(0);
        const linkContent = range.extractContents();
        linkNode.parentNode?.removeChild(linkNode);
        range.insertNode(linkContent);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    _addLink(range: any) {
        const linkNode = document.createElement(this._tag) as HTMLAnchorElement;
        linkNode.classList.add(this._CSS.wrapper);
        linkNode.appendChild(range.extractContents());
        linkNode.href = this._state.href;
        linkNode.title = this._state.title;
        linkNode.target = this._state.target;
        linkNode.rel = this._state.rel;
        range.insertNode(linkNode);
        this._api.selection.expandToTag(linkNode);
    }

    surround(range: Range) {
        this._state.isActive = !this._state.isActive;
        this._button?.classList.toggle(this._CSS.inlineActive, this._state.isActive);
        this._state.range = range;
        if (this._state.isActive) {
            this._api.selection.save();
        } else {
            this._api.selection.restore();
            const isValidUrl = this._validateURL(this.linkInput.value);
            if (this._state.anchor && isValidUrl) {
                this._state.anchor.href = this.linkInput.value;
                this._state.anchor.title = this.titleInput.value;
                this._state.anchor.target = this.targetMenu.value;
                this._state.anchor.rel = this.relMenu.value;
            }
        }
    }

    checkState(selection: Selection) {
        const anchor = this._api.selection.findParentTag(this._tag) as HTMLAnchorElement;
        this._state.anchor = anchor;
        let { href = "", title, target, rel } = anchor || {};
        if (href?.startsWith(document.location.origin)) {
            href = href.replace(document.location.origin, "");
        }
        this.linkInput.value = href;
        this.titleInput.value = title || "";
        this.targetMenu.value = target || this.userDefaultTarget;
        this.relMenu.value = rel || this.userDefaultRelation;
        if (this._state.isActive) {
            this.showActions(anchor);
        } else {
            this.hideActions();
        }
        return !!this._state.isActive;
    }

    _addSelectOption(selectNode: HTMLSelectElement | undefined, text: string, value: string) {
        const option = document.createElement('option');
        option.text = text;
        option.value = value;
        selectNode?.add(option);
    }

    renderActions() {
        return this.linkMenuContainer;
    }

    createActions() {
        const createEntry = (labelText: string, el: HTMLElement): HTMLDivElement => {
            const label = document.createElement('label');
            label.textContent = labelText;
            const container = document.createElement('div');
            container.classList.add(this._CSS.buttons);
            container.appendChild(label);
            container.appendChild(el);
            return container;
        }

        this.linkInput = document.createElement('input');
        this.linkInput.setAttribute("type", "text");
        this.linkInput.placeholder = this._config.placeholder || 'Enter URL';

        this.inputHelper = document.createElement('div');
        this.inputHelper.classList.add(this._CSS.urlInputHelper);
        this.inputHelper.innerText = 'Invalid URL';
        this.inputHelper.hidden = true;

        this.titleInput = document.createElement('input');
        this.titleInput.setAttribute("type", "text");
        this.titleInput.placeholder = "Enter title";
        const titleContainer = createEntry("title", this.titleInput);

        this.targetMenu = document.createElement('select');
        this.availableTargets.map((target) => {
            this._addSelectOption(this.targetMenu, target, target);
        });
        const targetContainer = createEntry("target", this.targetMenu);

        this.relMenu = document.createElement('select');
        this.availableRelations.map((rel) => {
            this._addSelectOption(this.relMenu, rel === '' ? '-- Empty --' : rel, rel);
        });
        const relContainer = createEntry("rel", this.relMenu);

        this.submitButton = document.createElement('button');
        this.submitButton.classList.add(this._CSS.submitButton);
        this.submitButton.type = 'button';
        this.submitButton.innerHTML = "Add";
        this.submitButton.onclick = () => {
            const isValidUrl = this._validateURL(this.linkInput.value);
            if (isValidUrl) {
                this.inputHelper.hidden = true;
                this._state.href = this.linkInput.value;
                this._state.title = this.titleInput.value;
                this._state.target = this.targetMenu.value;
                this._state.rel = this.relMenu.value;
                this._addLink(this._state.range);
            } else {
                this.inputHelper.hidden = false;
            }
        };

        this.updateButton = document.createElement('button');
        this.updateButton.classList.add(this._CSS.submitButton);
        this.updateButton.type = 'button';
        this.updateButton.innerHTML = "Update";
        this.updateButton.onclick = () => {
            const isValidUrl = this._validateURL(this.linkInput.value);
            if (this._state.anchor && isValidUrl) {
                this.inputHelper.hidden = true;
                this._state.href = this.linkInput.value;
                this._state.title = this.titleInput.value;
                this._state.target = this.targetMenu.value;
                this._state.rel = this.relMenu.value;
                this._button?.click();
            } else {
                this.inputHelper.hidden = false;
            }
        };

        this.resetButton = document.createElement('button');
        this.resetButton.classList.add(this._CSS.resetButton);
        this.resetButton.type = 'button';
        this.resetButton.innerHTML = "Remove";
        this.resetButton.hidden = true;
        this.resetButton.onclick = () => {
            if (this._state.anchor) {
                this._removeExistingLink(this._state.anchor);
            }
        };

        const actionButtons = document.createElement('div');
        actionButtons.classList.add(this._CSS.buttons);
        actionButtons.appendChild(this.submitButton);
        actionButtons.appendChild(this.updateButton);
        actionButtons.appendChild(this.resetButton);

        const linkOptions = document.createElement('div');
        linkOptions.classList.add(this._CSS.urlOptions);
        linkOptions.appendChild(titleContainer);
        linkOptions.appendChild(targetContainer);
        linkOptions.appendChild(relContainer);

        this.linkMenuContainer = document.createElement('div');
        this.linkMenuContainer.classList.add(this._CSS.actionContainer);
        this.linkMenuContainer.hidden = true;
        this.linkMenuContainer.appendChild(this.linkInput);
        this.linkMenuContainer.appendChild(this.inputHelper);
        this.linkMenuContainer.appendChild(linkOptions);
        this.linkMenuContainer.appendChild(actionButtons);
        return this.linkMenuContainer;
    }

    showActions(anchor: HTMLAnchorElement) {
        this.submitButton.hidden = !!anchor;
        this.updateButton.hidden = !anchor;
        this.resetButton.hidden = !anchor;
        this.linkMenuContainer.hidden = false;
    }

    hideActions() {
        this.linkMenuContainer.hidden = true;
    }

    clear() {
        this.hideActions();
    }
}

function getLinkStyles() {
    return `
.ce-link-action-container { width:100%; padding:5px 10px 15px 10px; animation:slideFromBottom 0.5s ease forwards; }
.ce-link-action-container>*+* { margin-top:12px; }
.ce-link-buttons { display:flex; flex-direction:row; gap:4px; align-items:baseline; }
.ce-link-buttons > label { width:60px; color:#333; }
.ce-link-action-container input,.ce-link-options select,.ce-link-submit-button,.ce-link-reset-button { border:1px solid #f2f2f2; -webkit-box-shadow:inset 0 1px 2px 0 rgba(35,44,72,.06); box-shadow:inset 0 1px 2px 0 rgba(35,44,72,.06); border-radius:2px; padding:5px 8px; outline:none; -webkit-box-sizing:border-box; box-sizing:border-box; background:#f9f9f9; }
.ce-link-input-helper { color:#e53838; font-size:12px; padding:2px; margin-top:3px; }
.ce-link-action-container input { width:100%; }
.ce-link-options select,.ce-link-submit-button,.ce-link-reset-button { width:100%; border-radius:4px; cursor:pointer; }
.ce-link-submit-button,.ce-link-reset-button { border-radius:9999px; font-weight:600; width:80px; color:white; border:none; box-shadow:rgba(0,0,0,0.2) 0px 3px 1px -2px,rgba(0,0,0,0.14) 0px 2px 2px 0px,rgba(0,0,0,0.12) 0px 1px 5px 0px; }
.ce-link-submit-button { background-color:#388ae5; }
.ce-link-reset-button { background-color:#e53838; }
.ce-link-options { display:flex; flex-direction:column; gap:8px; }
@keyframes slideFromBottom { 0%{transform:translateY(5px);opacity:0} 100%{transform:translateY(0px);opacity:1} }
.ce-link { color:#0d7bf4; }
`;
}
