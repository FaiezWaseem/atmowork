const mongo = require('mongoose')

const MemberShipSchema = new mongo.Schema({
    start_date : {
        type : Date,
        required : true
    },
    end_date : {
        type : Date,
        required : true
    },
    extend_date : {
        type : Date,
    },
    plan : {
        type : String,
        enum : ['Hobby' , 'Standard' , 'Premium'],
        default : 'Hobby'
    },
    isPaid : {
        type : Boolean,
        default : false
    },
    amount : {
        type : Number,
        required : true,
    },
    receipt_url : {
        type : String,
        required: true
    }
})
MemberShipSchema.set('timestamps' , true)


const MemberShip = mongo.model('member_ship' , MemberShipSchema);
module.exports = MemberShip;