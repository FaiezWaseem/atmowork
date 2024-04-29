
const mongo = require('mongoose')

const GoalTaskSchema = new mongo.Schema({
    userid : {
        type : mongo.Types.ObjectId,
        ref : 'user',
        required : [true , 'Userid is Required!!. Goal Creator Id Required.']
    },
    title: {
     type : String,
     min : [6 , 'Minimum Goal Title Length is 6 required!!'],
     required : [true , 'Goal Title is Required']
    },
    description : {
        type :  String,
    },
    status: {
        type: String,
        enum: { 
            values : ['inprogress', 'Completed'],
            message: '{VALUE} is not supported'
        },
        default: 'inprogress'
    },
})
GoalTaskSchema.set('timestamps', true)


const GoalTask = mongo.model('goaltask', GoalTaskSchema);
module.exports = GoalTask