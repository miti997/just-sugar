import Error from '/core/error.js';
import ErrorDetails from '/src/components/default/error_details.js';

export default class ErrorViewNotFound extends Error {
    template() {
        return /*html*/`
            <div class="error-header">Could not load view "${this.message}"</div>
            ${this.loadComponent(ErrorDetails)}
        `;
    }
}