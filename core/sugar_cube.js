export default class SugarCube {
    eventCounter = 0;
    components = [];
    wrapperElement = 'div'
    constructor(id = null) {
        if (id === null || id === '') {
            this.generateId();
        } else {
            this.id = `sc_${id}`;
        }
    }

    render() {
        let style = this.style();
        if (style !== '') {
            style = `<style>#${this.id} {${style}}</style>`
        }

        return /*html*/`<${this.wrapperElement} id=${this.id}>${style}${this.template()}</${this.wrapperElement}>`;
    }

    style() {
        return '';
    }

    if (condition, html, elseHtml = null) {
        if (condition) {
            return html;
        } else if (elseHtml !== null) {
            return elseHtml;
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

    on(event, callback, parameters = []) {
        __JUST_SUGAR__.addNewEventListener(event);
        this.eventCounter++;
        return `just-${event}="${callback}" just-params="${parameters}" parent-cube="${this.id}" cube-event="${this.eventCounter}" cube-type="${this.type}"`;
    }

    bind(property) {
        this.eventCounter++;
        return `value="${this[property]}" just-bind="${property}"  parent-cube="${this.id}" cube-event="${this.eventCounter}" cube-type="${this.type}"`
    }

    loadComponent(component, ...parameters)
    {
        try {
            component = new component(...parameters);
        } catch (e) {
            this.throwError('component_not_loaded', e, component.name);
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