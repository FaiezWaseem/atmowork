const router = require('express').Router()
const ChatController = require('../controllers/ChatController')
const verifyToken = require('../middleware/authMiddleware')

router.get('/messages/:chatid', verifyToken, ChatController.getMessages)
router.post('/message/:chatid', verifyToken, ChatController.addMessage)

router.delete('/message/:messageid', verifyToken, ChatController.removeMessage)



module.exports = router