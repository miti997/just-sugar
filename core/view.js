import SugarCube from './sugar_cube.js';
export default class View extends SugarCube {
    type = 'view';
    wrapperElement = 'main';

    constructor() {
        super('view');
        delete __JUST_SUGAR__.view;
        __JUST_SUGAR__.view = this.makeProxy();
    }

    rerender() {
        this.eventCounter = 0;
        delete __JUST_SUGAR__.view;
        this.components = [];
        let wrapper = document.querySelector(`#${this.id}`);
        wrapper.innerHTML = this.addCss() + this.template();
        __JUST_SUGAR__.view = this.makeProxy();
    }
}