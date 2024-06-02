import Error from '/core/error.js';
import ErrorDetails from '/src/components/default/error_details.js';

export default class ErrorComponentNotFound extends Error {
    template() {
        return /*html*/`
            <div class="error-header">Couldn not load component "${this.message}"</div>
            ${this.loadComponent(ErrorDetails)}
        `;
    }
}