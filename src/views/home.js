import View from '/core/view.js';
import Img from '/src/components/img.js';

export default class Home extends View {
    title() {
        return 'Home'
    }

    style() {
        return /*css*/`
            width: 100%;
            height: 90vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            h1 {
                margin: 0;
                font-size: 2rem;
            }
        `
    }

    template() {
        return /*html*/`
            ${this.loadComponent(Img, 'just_sugar.svg', {alt: 'Just sugar logo', width:500, height:500})}
            <div>
                <h1>
                    Simple and sweet
                </h1>
            </div>
        `;
    }
}