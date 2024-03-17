export default class Component {
    id;
    components = {};

    constructor(parent) {
        this.generateId()
        parent.components[this.id] = new Proxy(this, {
            set(obj, prop, value) {
                obj[prop] = value;

                obj.rerender()
                return true
            }
        });
    }

    render() {
        return /*html*/`
            <div id=${this.id}>${this.template()}</div>
        `;
    }

    if (condition, html) {
        if (condition) {
            return html;
        }

        return '';
    }

    for(iterable, callback) {
        let resultHTML = '';
        for (let i = 0; i < iterable.length; i++) {
            resultHTML += callback(iterable[i]);
        }

        return resultHTML;
    }

    generateId() {
        this.id = `sc_${window.crypto.randomUUID()}`;
        this.checkId()
    }

    checkId() {
        if (document.querySelector(`#sc_${this.id}`) !== null) {
            this.generateId()
        }
    }

    rerender() {
        let wrapper = document.querySelector(`#${this.id}`);
        console.log(wrapper);
        wrapper.innerHTML = this.template()
    }

    jsClick(callBack) {
        return `js-click="${callBack}"`;
    }
}