export default class Router {
    routes = {};
    currentRoute = null;

    addRoute(route, settings = null) {
        this.currentRoute = route;

        if (settings !== null) {
            this.routes[route] = settings;
            return;
        }

        this.routes[route] = {};
        return this;
    }

    layout(layout) {
        this.routes[this.currentRoute].layout = layout;
        return this;
    }

    view(view) {
        this.routes[this.currentRoute].view = view;
        return this;
    }
}