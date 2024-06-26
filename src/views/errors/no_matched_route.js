import Error from '/core/error.js';
import ErrorDetails from '/src/components/default/error_details.js';

export default class ErrorNoMatchedRoute extends Error {
    template() {
        return /*html*/`
            <div class="error-header">No route was matched for "${this.message}"</div>
            ${this.loadComponent(ErrorDetails)}
        `;
    }
}