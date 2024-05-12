import Component from "../../core/component.js";

export default class LinkComponent extends Component {
    link;
    text;
    options;
    wrapperElement = "div";

    constructor(link, text, options = {}) {
        super();
        this.link = link;
        this.text = text;
        this.options = options;
        if (this.options.wrapperElement !== undefined) {
            this.wrapperElement = this.options.wrapperElement;
        }
    }

    style() {
        return /*css*/`
            a, a:visited, a:active {
                color: inherit;
                text-decoration: none;
            }

            a:hover {
                color: var(--light-red)
            }
        `;
    }

    template() {
        return /*html*/`
            <a href="${this.link}" ${this.for(this.options, (attr, val) => `${attr}="${val}"`)}>${this.text}</a>
        `
    }
}