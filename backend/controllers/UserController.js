const UserModel = require('../models/UserModel')


class UserController {

    async getMe(req, res) {
        try {
            const user = await UserModel.findOne({ _id: req.user }, { password: 0 }).populate('membership_plan_id')
            res.json({
                status: true,
                user
            })

        } catch (error) {
            res.json({
                status: false,
                message: error.message
            })
        }
    }

}

module.exports = new UserController()