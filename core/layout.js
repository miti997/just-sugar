import Component from "./component.js";

export default class Layout extends Component {
    async loadView(viewName) {
        let module = await import(`/src/views/${viewName}.js`);
        return new module.default().render();
    }
}