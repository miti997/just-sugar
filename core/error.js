import SugarCube from './sugar_cube.js';
export default class Error extends SugarCube {
    type = 'error';
    message = null;
    wrapperElement = 'main';

    constructor(message) {
        super('error');
        this.message = message;
        __JUST_SUGAR__.view = this.makeProxy();
        document.title = 'ERROR';
    }
}