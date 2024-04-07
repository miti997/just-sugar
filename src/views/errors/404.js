import View from '/core/view.js';

export default class Error404 extends View {
    template() {
        return /*html*/`
            <div>404 Page not found</div>
        `;
    }
}