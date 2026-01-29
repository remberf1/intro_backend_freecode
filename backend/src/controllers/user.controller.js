import {User} from '../models/user.model.js';

const registerUser = async (req,res)=>{
    try{
        const {username , password, email} = req.body;

        //basic validation
        if(!username || !password || !email){
            return res.status(400).json({message: "All fields are required"})
        }

        const existingUser = await  User.findOne({email: email.toLowerCase()});
        if(existingUser){
            return res.status(409).json({message: "User already exists"})
        }

        const user = await User.create({
            username,
            password,
            email: email.toLowerCase(),
            loggedIn: false
        });
        res.status(201).json({message: "User registered successfully", id: user._id, username: user.username, email: user.email});
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
}

const loginUser = async (req,res)=>{
    
    try{
        const { password, email} = req.body;
        const user = await User.findOne({email: email.toLowerCase()});
        if(!user){
            return res.status(401).json({message: "Invalid credentials"})
        }
      

        //compare password
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid credentials"})
        }
        res.status(200).json({message: "User logged in successfully",user:{
            id: user._id,
            username: user.username,
            email: user.email
        }});
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
}
const logoutUser = async (req,res)=>{
    try{
        const {email} = req.body;
        const user = await User.findOne({email: email.toLowerCase()});
        if(!user){
            return res.status(401).json({message: "User not found"})
        }
        res.status(200).json({message: "User logged out successfully"});
    }
    catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
}
export {
    registerUser,
    loginUser,
    logoutUser
}