import Error from '/core/error.js';

export default class ErrorLayoutNotFound extends Error {
    template() {
        return /*html*/`
            <div>Layout not found ${this.message}</div>
        `;
    }
}