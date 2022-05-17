const Router = require('express')
const router = new Router()

const operatorRouter = require('./operatorRouter')
const contentRouter = require('./contentRouter')

router.use('/operator', operatorRouter)
router.use('/content', contentRouter)

module.exports = router