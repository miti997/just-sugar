import SugarCube from "./sugar_cube.js";
export default class Component extends SugarCube {
    type = 'component';

    constructor() {
        super();
        __JUST_SUGAR__.components[this.id] = this.makeProxy();
    }

    rerender() {
        this.eventCounter = 0;
        this.components.forEach(element => {
            delete __JUST_SUGAR__.components[element];
        });

        this.components = [];
        let wrapper = document.querySelector(`#${this.id}`);
        wrapper.innerHTML = this.template();
    }
}