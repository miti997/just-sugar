import Error from '/core/error.js';

export default class ErrorGenericNotFound extends Error {
    style() {
        return /*css*/`
           .container {
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100%;
            }
            button {
                margin-top: 20px;
                background-color: var(--blue);
                color: var(--light-blue);
                border: none;
                padding: 10px 20px;
                cursor: pointer;
            }
        `;
    }
    template() {
        return /*html*/`
             <div class="container">
                <h1>This page could not be found</h1>
                <button ${this.on('click', 'goBack')}>Go Back</button>
            </div>
        `;
    }

    goBack() {
        window.history.back();
    }
}