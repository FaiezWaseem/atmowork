const GoalsModel = require('../models/GoalsModel')


class GoalController {
    async getGoals(req, res) {
        try {
            const goals = await GoalsModel.find({ userid : req.user }).sort('created_at');
            res.json({
                status: true,
                goals
            })
        } catch (error) {
            res.json({
                status: false,
                message: error.message
            })
        }
    }
    async createGoal(req, res) {
        try {
            console.log(req.body)
            const goal = await GoalsModel.create({
                title: req.body.title,
                description: req.body.description,
                userid: req.user,
            })
            res.json({
                status: true,
                goal
            })

        } catch (error) {
            res.json({
                status: false,
                message: error.message
            })
        }
    }
    async updateGoal(req, res) {
        try {
            console.log(req.user)
        } catch (error) {

        }
    }
    async deleteGoal(req, res) {
        try {
            const result  = await GoalsModel.deleteOne({ _id : req.params.id , userid : req.user} );
            console.log(result)
            res.json({
                status : result.deletedCount ? true : false,
                message : result.deletedCount ? 'Goal Deleted' : 'Failed To Delete'
            })
        } catch (error) {
            res.json({
                status : false,
                message : error.message
            })
        }
    }
}

module.exports = new GoalController()