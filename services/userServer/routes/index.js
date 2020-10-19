const router = require('express').Router()
const userController = require('../controllers/userController')
const friendController = require('../controllers/friendController')
const authentication = require('../middlewares/auth')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.patch('/logout/:id', userController.logout)


router.post('/friendlist',authentication,friendController.addFriend)
router.get('/friendlist',authentication,friendController.friendlist)
router.get('/friendRequest',authentication, friendController.friendRequest)
router.patch('/friendlist', authentication, friendController.accept)
router.delete('/friendlist', authentication, friendController.reject)


module.exports = router