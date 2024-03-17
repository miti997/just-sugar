import Component from "./component.js";

export default class Layout extends Component {
    constructor(parent) {
        super(parent)
    }

    async loadView(viewName) {
        let module = await import(`/src/views/${viewName}.js`);
        return new module.default(this).render();
    }
}