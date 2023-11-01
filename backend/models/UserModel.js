const mongo = require('mongoose')

const UserSchema = new mongo.Schema({
    username : {
        type : String,
        min : 6,
        required : true
    },
    email: {
        type : String,
        unique : true,
        min : 8,
        required : true
    },
    password : {
        type : String,
        min : 8,
        required : true
    },
    account_membership : {
        type : String,
        enum : ['Freemium','Hobby' , 'Standard' , 'Premium'],
        default : 'Freemium'
    },
    account_type : {
        type : String,
        enum : ['INDIVIDUAL' , 'TEAM' , 'MEMBER'],
        default : 'INDIVIDUAL'
    },
    membership_plan_id : {
        type : mongo.Types.ObjectId,
        ref : 'member_ship'
    }
})
UserSchema.set('timestamps' , true)


const User = mongo.model('user' , UserSchema);
module.exports = User;