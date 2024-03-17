export default class APP {
    config = {
        wrapperSelector: '#APP'
    };
    wrapper;

    components = {};

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

    callFunction(functionName, id) {
        this.components[id][functionName]();
    }

    setProperty(propertyName, id, value) {
        this.components[id][propertyName] = value
    }

    basicEventSettings(e) {
        e.preventDefault();
        e.stopPropagation();
    }
}