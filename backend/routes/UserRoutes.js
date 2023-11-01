const router = require('express').Router()
const UserController  = require('../controllers/UserController')
const GoalController = require('../controllers/GoalController')
const verifyToken = require('../middleware/authMiddleware')

router.get('/' , verifyToken , UserController.getMe)


// Goals
router.get('/goals' , verifyToken , GoalController.getGoals)
router.post('/goal' , verifyToken , GoalController.createGoal)
router.put('/goal' , verifyToken , GoalController.updateGoal)
router.delete('/goal/:id' , verifyToken , GoalController.deleteGoal)


module.exports = router