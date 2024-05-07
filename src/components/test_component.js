import Component from "../../core/component.js";

export default class TestComponent extends Component {
    testingStuff = 'wow';
    name = '';
    constructor(id = null) {
        super(id)
    }
    template() {
        return /*html*/`
            <div style="background-color:green">${this.id}</div>
            <div>
                <div style="background-color:green" ${this.on('click', 'changeTarget')}>${this.testingStuff}
                </div>
            </div>
            <input ${this.bind('name')}>
            <div>Your name: ${this.name}</div>

        `
    }

    changeTarget() {
        if (this.id == 'sc_change') {
            this.updateComponent('target', {testingStuff: 'changed'});
        }
    }
}