import Component from "../../core/component.js";

export default class SpaLinkComponent extends Component {
    link;
    text;
    options;

    constructor(link, text, options= {}) {
        super();
        if (!link || !text) {
            this.throwError('component_not_loaded', "Make sure to specify a link and a text", 'SpaLink');
        }
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
            <a href="${this.link}" ${this.on('click', 'changeUrl')}>${this.text}</a>
        `
    }

    async changeUrl() {
        history.pushState({}, "", this.link);
        await __JUST_SUGAR__.matchRoute()
    }
}