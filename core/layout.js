import SugarCube from "./sugar_cube.js";

export default class Layout extends SugarCube {
    type = 'layout';
    viewName = null;
    viewId = 'view';

    constructor() {
        super();
        __JUST_SUGAR__.layout = this.makeProxy();
    }

    async loadView(viewName) {
        try {
            let module = await import(`/src/views/${viewName}.js`);
            this.viewName = viewName;
            return new module.default(...__JUST_SUGAR__.viewParams).render();
        } catch(e) {
            this.throwError('view_not_loaded', e, viewName);
        }
    }

    async rerender() {
        try {
            let wrapper = document.querySelector(`#sc_${this.viewId}`);
            let module = await import(`/src/views/${this.viewName}.js`);
            wrapper.innerHTML = new module.default(...__JUST_SUGAR__.viewParams).render();
        } catch (e) {
            this.throwError('view_not_loaded', e, this.viewName);
        }
    }
}