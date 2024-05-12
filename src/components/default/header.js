import Component from "/core/component.js";
import SpaLink from '/src/components/spa_link.js';
import Link from '/src/components/link.js';
import Img from '/src/components/img.js';


export default class Header extends Component {
    wrapperElement = 'header';

    style() {
        return /*css*/`
            nav {
                background-color: var(--blue);
                display: flex;
                justify-content: flex-end;
                align-items: center;
                color: var(--light-blue)
            }
            ul {
                padding: 0;
                margin: 0;
                display: flex;
            }
            li {
                list-style: none;
                margin: 10px;
            }
            img {
                margin-right: 20px;
            }
            .logo {
                margin-left:10px;
                margin-right:auto;
            }
        `
    }

    template() {
        return /*html*/ `
            <nav>
                <div class="logo">
                    ${this.loadComponent(Img, 'just_sugar_logo.svg', {alt: 'Just sugar logo', width:40, height:40})}
                </div>
                <ul>
                    ${this.loadComponent(Link, 'https://github.com/miti997/just-sugar', 'Read the docs', {wrapperElement: 'li', target: '_blank'})}
                    ${this.loadComponent(Link, 'https://github.com/miti997/just-sugar', 'Check the project', {wrapperElement: 'li', target: '_blank'})}
                </ul>
            </nav>
        `;
    }
}