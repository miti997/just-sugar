import SugarCube from "./sugar_cube.js";

export default class Layout extends SugarCube {
    type = 'layout';

    constructor() {
        super();
        __JUST_SUGAR__.layout = this.makeProxy();
    }

    async loadView(viewName) {
        let module = await import(`/src/views/${viewName}.js`);
        return new module.default().render();
    }

    rerender() {

    }
}