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
                e.preventDefault();
                let elem = e.target;
                this.callFunction(elem.getAttribute('just-click'), elem.parentElement.id);
            }
        })
    }

    callFunction(functionName, id)
    {
        this.components[id][functionName]();
    }
}