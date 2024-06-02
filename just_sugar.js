import APP from '/core/app.js'
import SugarCube from '/core/sugar_cube.js'
import View from '/core/view.js'
import Component from '/core/component.js'
import Layout from '/core/layout.js'
import Router from '/core/router.js'
import routes from '/src/config/routes.js'
window.__JUST_SUGAR__ = new APP(routes, {wrapperSelector: '#APP', devMode: true})
await __JUST_SUGAR__.init()
