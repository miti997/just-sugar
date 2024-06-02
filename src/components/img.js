import Component from "../../core/component.js";

export default class ImgComponent extends Component {
    imgName;
    options;

    constructor(imgName, options = {}) {
        super();
        if (!imgName) {
            this.throwError('component_not_loaded', "Make sure to specify an image path", 'Img');
        }
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