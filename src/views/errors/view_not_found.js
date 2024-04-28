import Error from '/core/error.js';

export default class ErrorViewNotFound extends Error {
    template() {
        return /*html*/`
            <div>View not found ${this.message}</div>
        `;
    }
}