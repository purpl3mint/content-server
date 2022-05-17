const Router = require('express')
const router = new Router()
const contentController = require('../controllers/contentController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', contentController.create)
router.get('/', contentController.getAll)
router.delete('/:id', contentController.delete)

module.exports = router