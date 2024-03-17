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
        this.wrapper.innerHTML = await new module.default(this).render();
        this.wrapper.__JUST_SUGAR__ = {}
    }
}