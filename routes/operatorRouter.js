const Router = require('express')
const router = new Router()
const operatorController = require('../controllers/operatorController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/registration', operatorController.registration)
router.post('/login', operatorController.login)
router.put('/setpassword', operatorController.setPassword)
router.get('/', operatorController.getAll)
router.delete('/:id', operatorController.deleteUser)


module.exports = router