import Layout from "/core/layout.js";

export default class DefaultErrorLayout extends Layout {
    viewId = 'error';

    style() {
        return /*css*/`
            section {
                margin: 20px
            }
            .error-header {
                display: flex;
                background-color: var(--red);
                color: var(--beige);
                padding: 10px;
            }
            .error-detail {
                padding: 10px;
                max-height: 30rem;
                overflow: auto;
            }
            .sub-detail {
                padding: 5px;
            }
            .hidden {
                display: none;
            }
            .error-category {
                color: var(--black);
            }
        `
    }

    async render(error) {
        return /*html*/ `
            ${this.loadStyle('just_sugar')}
            ${await this.loadView(`errors/${error}`)}
        `;
    }
}