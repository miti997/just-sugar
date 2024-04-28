import Error from '/core/error.js';

export default class ErrorNoMatchedRoute extends Error {
    template() {
        return /*html*/`
            <div>No route was matched for ${this.message}</div>
        `;
    }
}