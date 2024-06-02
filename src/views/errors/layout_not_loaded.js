import Error from '/core/error.js';
import ErrorDetails from '/src/components/default/error_details.js';

export default class ErrorLayoutNotFound extends Error {
    template() {
        return /*html*/`
            <div class="error-header">Could not load layout "${this.message}"</div>
            ${this.loadComponent(ErrorDetails)}
        `;
    }
}