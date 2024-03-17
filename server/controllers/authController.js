import express  from 'express';
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import validator from 'validator'

const registerUser= async (req, res)=>{
    const {email, password}=req.body;
    try{

        //validate
        if(!email || !password){
           return res.json({message:'All fields must be filled'})
        }
        if(!validator.isEmail(email)){
            return res.json({message:"email is not valid"})
        }
        if(!validator.isStrongPassword(password)){
            return res.json({message:'password not strong enough'})
        }

        //check if user already exist
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"user already exist"});
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        //create a new user
        const newUser = new User({email, password:hashedPassword});
        await newUser.save();

        const token = jwt.sign({userId: newUser._id},process.env.JWT_SECRET, {expiresIn:'1h'})
        res.status(201).json({ newUser, token,message:"user registered successfully"});

    }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal Server Error"});
    }
}

const loginUser = async (req,res)=>{
    try{
        const {email, password}= req.body;

        //find user by email
        const user =await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"credentials invalid"})
        }

        //compare passwords
        const passwordMatch= await bcrypt.compare(password, user.password)
        
        if(!passwordMatch){
            return res.status(401).json({mesaage: "password does not match"});
        }
        //generate JWT token
        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET, {expiresIn:'1h'});

        res.status(200).json({token,messsage: "user logged in"})
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export {loginUser, registerUser};