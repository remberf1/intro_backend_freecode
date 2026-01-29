import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt';
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        minlength:3,
        maxlength:20
    },
    password:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        maxlength:50
    }

},{timestamps:true}
);
//before saving the user, hash the password
userSchema.pre("save",async function(next){
if(!this.isModified("password")){
    return next();
    
}
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password,salt);
});
//compare password
userSchema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
}
export const User = mongoose.model('User',userSchema);