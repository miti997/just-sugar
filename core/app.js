export default class APP {
    config = {wrapperSelector: '#APP'};
    eventListeners = {};
    wrapper;
    components = {};
    layout;
    view;
    layoutName;
    viewName;
    viewParams;
    routes;

    constructor(routes, config = null) {
        this.routes = routes;
        if (config === null) {
            return;
        }
        if (Object.keys(config).length > 0) {
            this.config = config;
        }
    }

    async init() {
        await this.matchRoute();
        this.addEventListeners();
    }

    async matchRoute() {
        let matchedRoute = this.routes.matchRoute();

        this.viewParams = matchedRoute.params;
        try {
            if (this.layoutName !== matchedRoute.layout) {
                this.layoutName = matchedRoute.layout;
                this.viewName = matchedRoute.view;
                await this.renderLayout();
            } else if (this.layoutName === matchedRoute.layout && this.viewName !== matchedRoute.view) {
                this.viewName = matchedRoute.view;
                this.layout.viewName = this.viewName;
            } else if (this.layoutName === matchedRoute.layout && this.viewName === matchedRoute.view) {
                this.view.render();
            }
        } catch {
            this.layoutName = 'error';
            this.viewName = 'not_found';
            await this.renderLayout();
        }
    }

    async renderLayout() {
        let module = await import(`/src/layouts/${this.layoutName}.js`);
        this.wrapper = document.querySelector(this.config.wrapperSelector);
        this.wrapper.innerHTML = await new module.default().render(this.viewName);
    }

    addNewEventListener(event) {
        if (this.eventListeners[event] === undefined) {
            const modifiedEvent = `just-${event}`;
            this.wrapper.addEventListener(event, (e) => {
                if (e.target.matches(`[${modifiedEvent}]`)) {
                    this.basicEventSettings(e);
                    let elem = e.target;
                    this.callFunction(
                        elem.getAttribute('cube-type'),
                        elem.getAttribute(modifiedEvent),
                        elem.parentElement.id
                    );
                }
            });
            this.eventListeners[event] = true;
        }
    }

    addEventListeners() {
        window.addEventListener('popstate', () => {
            this.matchRoute()
        })
        this.wrapper.addEventListener('input', (e) => {
            if (e.target.matches('[just-bind]')) {
                this.basicEventSettings(e)
                let elem = e.target;
                let parent =  elem.parentElement;
                let identifier = elem.getAttribute('cube-identifier');
                this.setProperty(
                    elem.getAttribute('cube-type'),
                    elem.getAttribute('just-bind'),
                    parent.id,
                    elem.value
                );
                elem = parent.querySelector(`[cube-identifier="${identifier}"]`);
                elem.selectionStart = elem.selectionEnd = elem.value.length;
                elem.focus()
            }
        });
    }

    callFunction(type, functionName, id) {
        if (type === 'layout') {
            this.layout[functionName]();
        } else if (type === 'view') {
            this.view[functionName]();
        } else {
            this.components[id][functionName]();
        }
    }

    setProperty(type, propertyName, id, value) {
        if (type === 'layout') {
            this.layout[propertyName] = value;
        } else if (type === 'view') {
            this.view[propertyName] = value;
        } else {
            this.components[id][propertyName] = value;
        }
    }

    basicEventSettings(e) {
        e.preventDefault();
        e.stopPropagation();
    }
}