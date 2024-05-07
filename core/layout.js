import SugarCube from "./sugar_cube.js";

export default class Layout extends SugarCube {
    type = 'layout';
    viewName = null;

    constructor() {
        super();
        __JUST_SUGAR__.layout = this.makeProxy();
    }

    async loadView(viewName) {
        try {
            let module = await import(`/src/views/${viewName}.js`);
            this.viewName = viewName;
            return /*html*/`<div id="${this.id}_view">${new module.default(...__JUST_SUGAR__.viewParams).render()}</div>`;
        } catch {
            this.throwError('view_not_found', this.viewName);
        }
    }

    async rerender() {
        try {
            let wrapper = document.querySelector(`#${this.id}_view`);
            let module = await import(`/src/views/${this.viewName}.js`);
            wrapper.innerHTML = new module.default(...__JUST_SUGAR__.viewParams).render();
        } catch (error) {
            this.throwError('view_not_found', this.viewName);
        }
    }
}