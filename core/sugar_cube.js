export default class SugarCube {
    id;
    eventCounter = 0;
    components = [];
    constructor() {
        this.generateId();
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
        if (Array.isArray(iterable)) {
            for (let i = 0; i < iterable.length; i++) {
                resultHTML += callback(iterable[i]);
            }
        } else if (typeof iterable === 'object' && iterable !== null) {
            for (let key in iterable) {
                resultHTML += callback(key, iterable[key]);
            }
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

    on(event, callback) {
        __JUST_SUGAR__.addNewEventListener(event);
        this.eventCounter++;
        return `just-${event}="${callback}" cube-identifier="${this.id}__${this.eventCounter}" cube-type="${this.type}"`;
    }

    bind(property) {
        this.eventCounter++;
        return `value="${this[property]}" just-bind="${property}" cube-identifier="${this.id}__${this.eventCounter}" cube-type="${this.type}"`
    }

    loadComponent(component, parameters = [])
    {
        component = new component(...parameters)
        this.components.push(component.id)
        return component.render();
    }

    makeProxy() {
        return new Proxy(this, {
            set(obj, prop, value) {
                obj[prop] = value;
                obj.rerender()
                return true
            },
        })
    }
}