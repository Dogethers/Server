const router = require('express').Router()
const userController = require('../controllers/userController')
const friendController = require('../controllers/friendController')
const authentication = require('../middlewares/auth')

router.post('/register', userController.register)
router.post('/login', userController.login)

router.post('/friendlist',authentication,friendController.addFriend)
router.get('/friendlist',authentication,friendController.friendlist)

module.exports = router