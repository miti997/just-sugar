import Layout from "/core/layout.js";

export default class DefaultErrorLayout extends Layout {
    async render(error) {
        return /*html*/ `
            <div>
                Ooops...
            </div>
            ${await this.loadView(`errors/${error}`)}
        `;
    }
}