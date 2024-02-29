const router = require('express').Router()
const UserController  = require('../controllers/UserController')
const GoalController = require('../controllers/GoalController')
const ProjectController = require('../controllers/ProjectController')
const InviteController = require('../controllers/InviteController')

const verifyToken = require('../middleware/authMiddleware')

router.get('/' , verifyToken , UserController.getMe)


// Goals
router.get('/goals' , verifyToken , GoalController.getGoals)
router.post('/goal' , verifyToken , GoalController.createGoal)
router.put('/goal' , verifyToken , GoalController.updateGoal)
router.delete('/goal/:id' , verifyToken , GoalController.deleteGoal)


//Project
router.get('/projects', verifyToken , ProjectController.getProjects)
router.get('/project/:id' , verifyToken , ProjectController.getProject)
router.post('/project' , verifyToken , ProjectController.createProject)
router.put('/project' , verifyToken , ProjectController.updateProject)
router.delete('/project/:id' , verifyToken , ProjectController.deleteProject)
// Invite To Project
router.get('/project/invite/:code',  InviteController.getInvitationEmail)
router.post('/project/:id/invite', verifyToken, InviteController.inviteUserToProject)
router.post('/project/invite/:code', verifyToken, InviteController.completeInvitaion)

//features (Project Tasks)
router.get('/features/:projectid', verifyToken , ProjectController.getFeatures)
router.post('/feature', verifyToken , ProjectController.createFeature)
router.put('/feature/:id', verifyToken , ProjectController.updateFeature)
router.delete('/feature/:id', verifyToken , ProjectController.deleteFeature)



module.exports = router