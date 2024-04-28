import View from '/core/view.js';

export default class ErrorNotFound extends View {
    template() {
        return /*html*/`
            <div>Page not found</div>
        `;
    }
}