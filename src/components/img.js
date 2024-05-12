import Component from "../../core/component.js";

export default class ImgComponent extends Component {
    imgName;
    options;

    constructor(imgName, options = {}) {
        super();
        this.imgName = imgName;
        this.options = options;
        if (this.options.wrapperElement !== undefined) {
            this.wrapperElement = this.options.wrapperElement;
        }
    }

    template() {
        return /*html*/`
            <img src="/resources/img/${this.imgName}" ${this.for(this.options, (attr, val) => `${attr}="${val}"`)}>
        `;
    }
}