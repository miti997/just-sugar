import SugarCube from './sugar_cube.js';
export default class View extends SugarCube {
    type = 'view';
    wrapperElement = 'main';
    nestedCSS = true;

    constructor() {
        super('view');
        delete __JUST_SUGAR__.view;
        __JUST_SUGAR__.view = this.makeProxy();
        document.title = __JUST_SUGAR__.view.title()
    }

    title() {
        return 'VIEW';
    }

    rerender() {
        this.eventCounter = 0;
        delete __JUST_SUGAR__.view;
        this.components = [];
        let wrapper = document.querySelector(`#${this.id}`);
        let style = this.style();
        if (style !== '') {
            if  (this.nestedCSS) {
                style = `<style>#${this.id} {${style}}</style>`;
            } else {
                style = `<style>${style}</style>`;
            }
        }
        wrapper.innerHTML = style + this.template();
        __JUST_SUGAR__.view = this.makeProxy();
    }
}