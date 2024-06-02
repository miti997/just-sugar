import Component from "/core/component.js";

export default class ErrorDetails extends Component {
    clicked = null;
    template() {
        const parsedRoutes = this.parseRoutes(__JUST_SUGAR__.routes.root);
        return /*html*/ `
            <section>
                <a class="error-category" href="#" ${this.on('click', 'showDetails', ['errorDetails'])}>Error:</a>
                <div id="errorDetails" class="hidden error-detail">
                    ${__JUST_SUGAR__.errorDetails}
                </div>
            </section>
            <section>
                <a class="error-category" href="#" ${this.on('click', 'showDetails', ['routes'])}>Routes:</a>
                <div id="routes" class="hidden error-detail">
                    ${this.for(parsedRoutes, (route) => {
                        if (route === '//') {
                            route = '/'
                        }
                        return `<div class="sub-detail">${route}</div>`
                    })}
                </div>
            </section>
        `;
    }

    showDetails(id) {
        let target = document.querySelector(`#${id}`);
        if (target.classList.contains('hidden')) {
            target.classList.remove('hidden');
        } else {
            target.classList.add('hidden');
        }
    }

    parseRoutes(node, currentPath = '') {
        let routes = [];
        if (node.view) {
            routes.push(currentPath);
        }
        for (const key in node.normalNodes) {
            const newPath = `${currentPath}/${key}`;
            routes = routes.concat(this.parseRoutes(node.normalNodes[key], newPath));
        }
        for (const key in node.paramNodes) {
            const newPath = `${currentPath}/:${key}`;
            routes = routes.concat(this.parseRoutes(node.paramNodes[key], newPath));
        }
        return routes;
    }
}