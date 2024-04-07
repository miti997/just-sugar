import Component from "../../core/component.js";

export default class LinkComponent extends Component {
    link = null;
    text = null;

    constructor(link, text) {
        super();
        this.link = link;
        this.text = text;
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