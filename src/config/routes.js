import Router from '/core/router.js'

const router = new Router();

router.addScope('/', 'default')
router.addRoute('/', 'home')
router.addRoute('/test', 'test')
router.addRoute('/{id}', 'id', {'id': '\\d+'})

router.addScope('/owner', 'owner')
router.addRoute('/', 'owner home')
router.addRoute('/test', 'test owner')
router.addRoute('/{id}', 'id', {'id': '\\d+'})

export default router;