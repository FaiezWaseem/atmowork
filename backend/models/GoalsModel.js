
const mongo = require('mongoose')

const GoalsSchema = new mongo.Schema({
    userid : {
        type : mongo.Types.ObjectId,
        ref : 'user',
        required : true
    },
    title: {
     type : String,
     min : 15,
     required : true
    },
    description : {
        type :  String,
    },
    status: {
        type: String,
        enum: ['inprogress', 'Completed'],
        default: 'inprogress'
    },
    progress : {
        type : Number,
        default : 0
    },
    targets : {
        type : Number,
        default : 0
    },
    project_id : {
        type : mongo.Types.ObjectId,
        ref : 'project'
    }
})
GoalsSchema.set('timestamps', true)


const Goals = mongo.model('goals', GoalsSchema);
module.exports = Goals