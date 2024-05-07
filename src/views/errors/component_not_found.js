import Error from '/core/error.js';

export default class ErrorComponentNotFound extends Error {
    template() {
        return /*html*/`
            <div>Component not found ${this.message}</div>
        `;
    }
}