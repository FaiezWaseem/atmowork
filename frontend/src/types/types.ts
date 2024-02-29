export interface UserType {
    username : string,
    _id : String ,
    createdAt : Date,
    updatedAt : Date,
    account_type : String,
    account_membership : String,
    membership_plan_id : String | Object,
    email : String,
}

export interface projectType {
    title: String,
    description: String,
    features: Array<any>,
    members : Array<any>,
    space_used : Number,
    createdAt : Date,
    updatedAt : Date,
    start_date? : Date,
    end_date? : Date,
    _id : string ,
    creatorid : UserType
}
export interface featuresProps {
    status : String | any,
    title : String,
    description : String,
    project_id : String,
    updatedAt : String,  
    createdAt : String,  
    start_date? : Date,
    end_date? : Date,
    _id : string ,
    creatorid : UserType
}