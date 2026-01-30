import mongoose, {Schema} from "mongoose";

const postSchema = new Schema(
{
    name:{
    type:String,
    required:true,
    trim:true,},
   
    description:{
    type:String,
    required:true,
    trim:true,
    },
    age :{
    type:Schema.Types.Mixed,
    required:true,
    default: null, 
    min:1,
    max:120
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

}, {timestamps:true}
);

export const Post = mongoose.model('Post', postSchema);