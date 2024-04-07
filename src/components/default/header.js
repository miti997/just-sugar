import Component from "/core/component.js";
import Link from '/src/components/link.js';

export default class Header extends Component {
    template() {
        return /*html*/ `
            <div>
                <ul>
                    <li>${this.loadComponent(Link, ['/', 'Home'])}</li>
                    <li>${this.loadComponent(Link, ['/test', 'Test'])}</li>
                    <li>${this.loadComponent(Link, ['/1', 'ID'])}</li>
                    <li>${this.loadComponent(Link, ['/owner', 'Owner'])}</li>
                    <li>${this.loadComponent(Link, ['/owner/test', 'Owner test'])}</li>
                    <li>${this.loadComponent(Link, ['/owner/1', 'Owner ID'])}</li>
                </ul>
            </div>
        `;
    }
}