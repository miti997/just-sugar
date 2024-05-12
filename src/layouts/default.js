import Layout from "/core/layout.js";
import Header from "/src/components/default/header.js";

export default class DefaultLayout extends Layout {
    async render(viewName) {
        return /*html*/ `
            ${this.loadStyle('just_sugar')}
            ${this.loadComponent(Header)}
            ${await this.loadView(viewName, 'main')}
        `;
    }
}