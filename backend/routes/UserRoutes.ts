export {}
const router = require('express').Router()
const UserController  = require('../controllers/UserController')
const verifyToken = require('../middleware/authMiddleware')

router.get('/' , verifyToken , UserController.getMe)

module.exports = router