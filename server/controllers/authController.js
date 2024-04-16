import express  from 'express';
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import validator from 'validator'
import dotenv from 'dotenv'
import { uploadFile } from '../s3.js';

dotenv.config()

const registerUser = async (req, res) => {
    const { email, password, name } = req.body;
    console.log(req.body)
    try {
        // Validation
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'All fields must be filled' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        // if (!validator.isStrongPassword(password)) {
        //     return res.status(400).json({ message: 'Password not strong enough' });
        // }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        const userExists = await User.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        if(userExists) {
            return res.status(400).json({ message: 'UserName already exists' });
        }
        console.log(req.file)
        if(req.file){
            await uploadFile(req.file, name, email)
            console.log(req.file.originalname)
        }

        // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            const userIcon = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${name}/userIcons/${req.file.originalname}`
            // Create a new user with profile picture URL
            const newUser = new User({ email, password: hashedPassword, name, userIcon: userIcon});

            await newUser.save();

            // Generate JWT token
            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Respond with user details and token
            res.status(201).json({
                email: newUser.email,
                name: newUser.name ,
                token,
                message: 'User registered successfully',
                avatar: userIcon
            });
        

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const loginUser = async (req,res)=>{
    try{
        const {email, password}= req.body;
        //find user by email
        console.log(req.body)
        const user =await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"credentials invalid"})
        }

        //compare passwords
        const passwordMatch= await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            return res.status(401).json({message: "password does not match"});
        }
        //generate JWT token
        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET, {expiresIn:'1h'});

        res.status(200).json({token:token,email:user.email, name:user.name, avatar: user.userIcon,messsage: "user logged in"})
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export {loginUser, registerUser};