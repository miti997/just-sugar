import SugarCube from './sugar_cube.js';
export default class Error extends SugarCube {
    type = 'error';
    message = null;

    constructor(message) {
        super();
        this.message = message;
        __JUST_SUGAR__.view = this.makeProxy();
    }
}