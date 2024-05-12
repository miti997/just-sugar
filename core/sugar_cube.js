export default class SugarCube {
    eventCounter = 0;
    components = [];
    wrapperElement = 'div'
    constructor(id = null) {
        if (id === null) {
            this.generateId();
        } else {
            this.id = `sc_${id}`;
        }
    }

    render() {
        return /*html*/`<${this.wrapperElement} id=${this.id}>${this.addCss()}${this.template()}</${this.wrapperElement}>`;
    }

    addCss() {
        if (typeof this.style === "function") {
            return /*html*/ `<style>#${this.id} {${this.style()}}</style>`;
        }

        return '';
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
        return `just-${event}="${callback}" parent-cube="${this.id}" cube-event="${this.eventCounter}" cube-type="${this.type}"`;
    }

    bind(property) {
        this.eventCounter++;
        return `value="${this[property]}" just-bind="${property}"  parent-cube="${this.id}" cube-event="${this.eventCounter}" cube-type="${this.type}"`
    }

    loadComponent(component, ...parameters)
    {
        try {
            component = new component(...parameters);
        } catch (error) {
            this.throwError('component_not_found', component.name);
        }
        this.components.push(component.id);
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

    throwError(error, message = null, layout = null)
    {
        __JUST_SUGAR__.throwError(error, message, layout);
    }

    updateComponent(id, properties) {
        let target = __JUST_SUGAR__.components[`sc_${id}`];
        for (let property in properties) {
            target[property] = properties[property];
        }
    }

    loadStyle(styleName) {
        return /*html*/`<link rel="stylesheet" href="/resources/css/${styleName}.css">`;
    }
}