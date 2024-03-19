export default class APP {
    config = {
        wrapperSelector: '#APP'
    };
    wrapper;
    components = {};
    layout;
    view;

    constructor(config = {}) {
        if (Object.keys(config).length > 0) {
            this.config = config;
        }
    }

    async init() {
        let module = await import('/src/layouts/default.js');

        this.wrapper = document.querySelector(this.config.wrapperSelector);
        this.wrapper.innerHTML = await new module.default().render();

        this.addEventListeners()
    }

    addEventListeners() {
        this.wrapper.addEventListener('click', (e) => {
            if (e.target.matches('[just-click]')) {
                this.basicEventSettings(e)
                let elem = e.target;
                this.callFunction(
                    elem.getAttribute('cube-type'),
                    elem.getAttribute('just-click'),
                    elem.parentElement.id
                );
            }
        })

        this.wrapper.addEventListener('input', (e) => {
            if (e.target.matches('[just-bind]')) {
                this.basicEventSettings(e)
                let elem = e.target;
                let parent =  elem.parentElement;
                let identifier = elem.getAttribute('cube-identifier');

                this.setProperty(
                    elem.getAttribute('cube-type'),
                    elem.getAttribute('just-bind'),
                    parent.id,
                    elem.value
                );

                elem = parent.querySelector(`[cube-identifier="${identifier}"]`);
                elem.selectionStart = elem.selectionEnd = elem.value.length;
                elem.focus()
            }
        })
    }

    callFunction(type, functionName, id) {
        if (type === 'layout') {
            this.callFunctionLayout(functionName);
        } else if (type === 'view') {
            this.callFunctionView(functionName);
        } else {
            this.callFunctionComponent(functionName, id);
        }
    }

    callFunctionLayout(functionName) {
        this.layout[functionName]();
    }

    callFunctionView(functionName) {
        this.view[functionName]();
    }

    callFunctionComponent(functionName, id) {
        this.components[id][functionName]();
    }

    setProperty(type, propertyName, id, value) {
        if (type === 'layout') {
            this.setPropertyLayout(propertyName, value);
        } else if (type === 'view') {
            this.setPropertyView(propertyName, value);
        } else {
            this.setPropertyComponent(propertyName, id, value);
        }
    }

    setPropertyLayout(propertyName, value) {
        this.layout[propertyName] = value;
    }

    setPropertyView(propertyName, value) {
        this.view[propertyName] = value;
    }

    setPropertyComponent(propertyName, id, value) {
        this.components[id][propertyName] = value;
    }

    basicEventSettings(e) {
        e.preventDefault();
        e.stopPropagation();
    }
}