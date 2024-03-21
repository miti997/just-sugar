import Router from '/core/router.js'

const routes = new Router();

routes.addRoute('/').layout('default').view('home')

export default routes;