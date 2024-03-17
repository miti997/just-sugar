import Layout from "/core/layout.js";
import Header from "/src/components/default/header.js";
import Footer from "/src/components/default/footer.js";

export default class DefaultLayout extends Layout {
    async render() {
        return /*html*/ `
            ${new Header(this).render()}
            ${await this.loadView('home')}
            ${new Footer(this).render()}
        `;
    }
}