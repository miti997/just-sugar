export default class APP {
    eventListeners = {};
    components = {};

    constructor(routes, config = {wrapperSelector: '#APP'}) {
        this.routes = routes;
        this.config = config;
        this.wrapper = document.querySelector(this.config.wrapperSelector);
    }

    async init() {
        await this.matchRoute();
        window.addEventListener('popstate', () => {this.matchRoute()});
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

    async matchRoute() {
        let matchedRoute = this.routes.matchRoute();
        this.viewParams = matchedRoute.params;
        if (this.layoutName !== matchedRoute.layout) {
            this.layoutName = matchedRoute.layout;
            this.viewName = matchedRoute.view;
            await this.renderLayout();
        } else if (this.viewName !== matchedRoute.view) {
            this.viewName = matchedRoute.view;
            this.layout.viewName = this.viewName;
        } else {
            this.view.render();
        }
    }

    async renderLayout() {
        let module = null
        try {
            module = await import(`/src/layouts/${this.layoutName}.js`);
        } catch {
            this.throwError('layout_not_found', this.layoutName);
            return;
        }
        try {
            this.wrapper.innerHTML = await new module.default().render(this.viewName);
        } catch {
            this.throwError('view_not_found', this.viewName);
        }
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

    throwError(error, message = null, layout = null) {
        if (layout === null) {
            layout = 'errors/error';
        }
        __JUST_SUGAR__.layoutName = layout
        __JUST_SUGAR__.viewName = error;
        __JUST_SUGAR__.viewParams = [message];
        __JUST_SUGAR__.renderLayout()
    }
}