import Layout from "/core/layout.js";
import Header from "/src/components/default/header.js";
import Footer from "/src/components/default/footer.js";

export default class DefaultLayout extends Layout {
    async render(viewName) {
        return /*html*/ `
            ${this.style('just_sugar')}
            ${this.loadComponent(Header)}
            ${await this.loadView(viewName)}
            ${this.loadComponent(Footer)}
        `;
    }
}