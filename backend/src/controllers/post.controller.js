import {Post} from '../models/post.model.js';
import mongoose from 'mongoose';
import { User } from '../models/user.model.js';  // Adjust import

const assignAdminToPosts = async () => {
  try {

    // Get the admin user
    const adminUser = await User.findOne({ role: 'admin' });

    if (!adminUser) {
      console.log('No admin user found!');
      return;
    }

    // Update posts with missing user field
    const result = await Post.updateMany(
      { user: { $exists: false } },
      { $set: { user: adminUser._id } }
    );

    console.log(`Matched ${result.matchedCount} posts`);
    console.log(`Updated ${result.modifiedCount} posts`);

  } catch (error) {
    console.error('Error assigning admin user to posts:', error);
  }
};

assignAdminToPosts();
//create a post

const createPost = async (req,res)=>{
    try{
        const {name, description, age} = req.body;
        if(!name || !description || !age){
            return res.status(400).json({message: "All fields are required"});
        }
        const post = await Post.create({
            name, 
            description,
             age
        ,user: req.user.id
        });
        res.status(201).json({message: "Post created successfully", post});
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
}
const getPosts = async (req,res)=>{
    try{
        const posts =  await Post.find().sort({createdAt: -1});
        res.status(200).json({posts});
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
}
const getPostById = async (req,res)=>{

    try{
        const {id} = req.params;
        const post = await Post.findById(id);
        res.status(200).json({post});
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
}
const updatePost = async (req,res)=>{
    //to be implemented
    try{
        const {id} = req.params;
         const {name, description, age} = req.body;
            //validation can be added here
     
            if(!id){
                return res.status(400).json({message: "Post ID is required"});
            }

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid post ID" });
                }

            const foundPost = await Post.findById(id).populate('user');

            if(!foundPost){
                return res.status(404).json({message: "Post not found"});
            }

            if(!name && !description && !age){
                return res.status(400).json({message: "At least one field is required to update"});
            }

            //update fields
            if(name) foundPost.name = name;
            if(description) foundPost.description = description;
            if(age) foundPost.age = age;
            await foundPost.save();

        res.status(200).json({message: "Post updated successfully", post: foundPost});
    }
    catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
}
const deletePost = async (req,res)=>{
    //to be implemented
    try{
        res.status(200).json({message: "Delete post - to be implemented"});
    }
    catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
}
const deletePostById = async (req,res)=>{
    //to be implemented
    try{
        const {id} = req.params;
         if(!id){
                return res.status(400).json({message: "Post ID is required"});
            }
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid post ID" });
                }

            const foundPost = await Post.findById(id);

            if(!foundPost){
                return res.status(404).json({message: "Post not found"});
            }
            if (!foundPost.user) {
      return res.status(400).json({ message: "This post has no owner assigned" });
    }
            const isOwner = foundPost.user.toString() === req.user.id;
            const isAdmin = req.user.role === 'admin';

            if(!isOwner && !isAdmin){
                return res.status(403).json({message: "Unauthorized to delete this post"});
            }
            await Post.findByIdAndDelete(id);

        res.status(200).json({message: "Post deleted successfully"});
    }
    catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
}
export {createPost,
        getPosts,
        getPostById,
        updatePost,
        deletePost,
        deletePostById
};