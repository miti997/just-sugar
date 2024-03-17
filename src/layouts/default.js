import Layout from "/core/layout.js";
import Header from "/src/components/default/header.js";
import Footer from "/src/components/default/footer.js";

export default class DefaultLayout extends Layout {
    async render() {
        return /*html*/ `
            ${this.loadComponent(Header)}
            ${await this.loadView('home')}
            ${this.loadComponent(Footer)}
        `;
    }
}