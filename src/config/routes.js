import Router from '/core/router.js'

const router = new Router();

router.addScope('/', 'default')
router.addRoute('/', 'home')

export default router;