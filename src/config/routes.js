import Router from '/core/router.js'

const router = new Router();

router.addScope('/', 'default')
router.addRoute('/', 'home')
router.addRoute('/test', 'test')

router.addScope('/owner', 'owner')
router.addRoute('/', 'owner home')
router.addRoute('/test', 'test owner')
router.addRoute('/{id}', 'id')

// console.log({"": 'test'})

// console.log(Object.keys({z: 'z', a:'a'}))
export default router;