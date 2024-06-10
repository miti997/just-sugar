export default class Router {
    layout = null;
    scope = null;
    response = {layout: null,view: null,params: []}

    constructor() {
        this.root = this.newNormalNode();
    }

    addScope(scope, layout) {
        this.layout = layout;
        this.scope = scope;
    }

    addRoute(route, view = null, options = {}) {
        route = this.scope + route
        let node = this.root;
        let parts = route.split('/').filter(part => part !== '');
        if (route === '/' || route === '//') {
            parts = ['/'];
        }

        for (let part in parts) {
            const partKey = part;
            part = parts[part];
            if (part.startsWith('{') && part.endsWith('}')) {
                part = part.replace(/{|}/g, "");
                if (!node.paramNodes[part]) {
                    node.paramNodes[part] = this.newParamNode();
                }
                node = node.paramNodes[part];
                if (!options[part]) {
                    node.regex = '.*';
                } else {
                    node.regex = `^${options[part]}$`;
                }
            } else {
                if (!node.normalNodes[part]) {
                    node.normalNodes[part] = this.newNormalNode();
                }
                node = node.normalNodes[part];
            }
            node.view = view;
            node.layout = this.layout;
            node.final = parseInt(partKey) + 1 === parts.length
        }
    }

    newNormalNode() {
        return {
            normalNodes: {},
            paramNodes: {},
            layout: null,
            view: null,
            final: false,
        }
    }

    newParamNode() {
        return {
            normalNodes: {},
            regex: null,
            paramNodes: {},
            layout: null,
            view: null,
            final: false,
        }
    }

    matchRoute() {
        let parts = window.location.pathname.split('/').filter(part => part !== '');
        let node = this.root;
        if (window.location.pathname === '/') {
            parts = ['/'];
        }

        let partsCount = parts.length;
        let foundCount = 0;

        for (let part in parts) {
            part = parts[part];
            if (!node.normalNodes[part]) {
                let keys =  Object.keys(node.paramNodes);
                for (let key in keys) {
                    key = keys[key];
                    let regex = new RegExp(node.paramNodes[key].regex)
                    if (!regex.test(part)) {
                        continue;
                    }
                    foundCount++;
                    node = node.paramNodes[key];
                    this.response.params.push(part);
                }
            } else {
                node = node.normalNodes[part];
                foundCount++;
            }
        }
        if (partsCount > foundCount || !node.final) {
            __JUST_SUGAR__.throwError('no_matched_route', `No route could be matched. Make sure the route for ${window.location.pathname} exists`, window.location.pathname);
            return null;
        } else {
            this.response.layout = node.layout;
            this.response.view = node.view;
        }
        return this.response;
    }
}