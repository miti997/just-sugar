import Component from "../../core/component.js";

export default class TestComponent extends Component {
    testingStuff = 'wow';
    constructor(id = null) {
        super(id)
    }
    template() {
        return /*html*/`
            <div style="background-color:green">${this.id}</div>
            <div style="background-color:green" ${this.on('click', 'changeTarget')}>${this.testingStuff}</div>

        `
    }

    changeTarget() {
        if (this.id == 'sc_change') {
            this.updateComponent('target', {testingStuff: 'changed'});
        }
    }
}