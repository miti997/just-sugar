import APP from '/core/app.js'
import SugarCube from '/core/sugar_cube.js'
import View from '/core/view.js'
import Component from '/core/component.js'
import Layout from '/core/layout.js'
import Router from '/core/router.js'
import routes from '/src/config/routes.js'

// console.log(routes)

window.__JUST_SUGAR__ = new APP(routes)
await __JUST_SUGAR__.init()

console.log(__JUST_SUGAR__);
