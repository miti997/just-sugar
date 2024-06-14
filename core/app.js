export default class APP {
    eventListeners = {};
    components = {};
    error = false;
    errorDetails = null;

    constructor(routes = null, config) {
        this.routes = routes;
        this.config = config;
        this.wrapper = document.querySelector(this.config.wrapperSelector);
        window.__JUST_SUGAR__ = this;
        window.__JUST_SUGAR__.init();
    }

    async init() {
        if (this.routes !== null) {
            await this.matchRoute();
            window.addEventListener('popstate', () => {this.matchRoute()});
        } else {
            this.layoutName = this.config.layout;
            this.viewName = this.config.view;
            this.viewParams = this.config.viewParams ?? [];
            await this.renderLayout();
        }
        this.wrapper.addEventListener('input', (e) => {
            if (e.target.matches('[just-bind]')) {
                this.basicEventSettings(e)
                let elem = e.target;
                let parent = document.querySelector(`#${elem.getAttribute('parent-cube')}`);
                this.setProperty(
                    elem.getAttribute('cube-type'),
                    elem.getAttribute('just-bind'),
                    parent.id,
                    elem.value
                );
                elem = parent.querySelector(`[cube-event="${elem.getAttribute('cube-event')}"]`);
                elem.selectionStart = elem.selectionEnd = elem.value.length;
                elem.focus()
            }
        });
    }

    async matchRoute() {
        this.error = false;
        this.errorDetails = null;

        let matchedRoute = this.routes.matchRoute();
        if (matchedRoute === null) {
            return;
        }
        this.viewParams = matchedRoute.params;
        this.errorDetails = matchedRoute.errorDetails;
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
        } catch(e) {
            this.throwError('layout_not_loaded', e, this.layoutName);
            return;
        }
        let layout = null;
        try {
            layout = new module.default();
        } catch(e) {
            this.throwError('layout_not_loaded', e, this.layoutName);
        }
        try {
            this.wrapper.innerHTML = `<style>${layout.style()}</style>${await layout.render(this.viewName)}`;
        } catch(e) {
            this.throwError('view_not_loaded', e, this.viewName);
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
                        elem.getAttribute("parent-cube"),
                        elem.getAttribute('just-params')
                    );
                }
            });
            this.eventListeners[event] = true;
        }
    }

    callFunction(type, functionName, id, params) {
        params = params.split(',')
        if (type === 'layout') {
            this.layout[functionName](...params);
        } else if (type === 'view' || type === 'error') {
            this.view[functionName](...params);
        } else {
            this.components[id][functionName](...params);
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

    throwError(error, errorDetails = null, message = null, layout = null) {
        if (this.error === true) {
            return;
        }
        this.error = true;
        if (layout === null) {
            layout = 'errors/error';
        }
        this.layoutName = layout
        this.viewName = error;
        this.viewParams = [message];
        this.errorDetails = errorDetails;
        if (this.config.devMode === false) {
            this.layoutName = layout
            this.viewName = 'generic_not_found';
            this.viewParams = ['This page doesn\'t exist'];
            this.renderLayout();
            throw errorDetails
        }
        this.renderLayout();
    }
}