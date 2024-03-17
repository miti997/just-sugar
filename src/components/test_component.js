import Component from "../../core/component.js";

export default class TestComponent extends Component {
    template() {
        return /*html*/`
            <div style="background-color:green">${this.id}</div>
        `
    }
}