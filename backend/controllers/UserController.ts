const UserModel = require('../models/UserModel')

class UserController {

    async getMe(req , res){
         const user = await UserModel.findOne({ _id : req.user }).populate('membership_plan_id')
         res.json(user)
    }
}

module.exports = new UserController()