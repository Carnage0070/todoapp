import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { OAuth2Client } from "google-auth-library";

//create token
const createToken = (id) => {
    const secret = process.env.JWT_SECRET || "supersecret123"
    return jwt.sign({id}, secret, {
        expiresIn: 3 * 24 * 60 * 60
    })
}

//create token
const createToken = (id) => {
    const secret = process.env.JWT_SECRET || "supersecret123"
    return jwt.sign({id}, secret, {
        expiresIn: 3 * 24 * 60 * 60
    })
}

//login user
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message: "Please enter all fields"})
        }
        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"})
        }
        const token = createToken(user._id)
        res.status(200).json({user,token})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//register user
const registerUser = async (req,res) => {
    const {name, email, password} = req.body;
    try{
        //check if user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.status(400).json({message: "User already exists"})
        }
        if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(password)) {
            return res.status(400).json({message: "Please enter all fields"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message: "Please enter a valid email"})
        }
        if(!validator.isStrongPassword(password)){
            return res.status(400).json({message: "Please enter a strong password"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({name, email, password: hashedPassword})
        const user = await newUser.save()
        const token = createToken(user._id)
        res.status(200).json({user,token})

    } catch(error){
        res.status(500).json({message: error.message})
    }
}

//get user info
const getUser = async (req,res) => {
    const id = req.user.id
    try{
        const user = await userModel.find({_id:id})
        res.status(200).json({user: user[0]})
    } catch(error){
        res.status(502).json({message: error.message})
    }
}

//google auth
const googleAuth = async (req, res) => {
    const { token } = req.body;
    try {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture } = payload;

        // Check if user exists
        let user = await userModel.findOne({ $or: [{ googleId }, { email }] });

        if (!user) {
            // Create new user
            user = new userModel({
                name,
                email,
                googleId,
                avatar: picture,
                password: await bcrypt.hash(Math.random().toString(36), 10), // Random password for Google users
            });
            await user.save();
        } else if (!user.googleId) {
            // Link Google account to existing user
            user.googleId = googleId;
            user.avatar = picture;
            await user.save();
        }

        const jwtToken = createToken(user._id);
        res.status(200).json({ user, token: jwtToken });
    } catch (error) {
        console.error('Google auth error:', error);
        res.status(500).json({ message: 'Google authentication failed' });
    }
};

export {loginUser, registerUser, getUser, googleAuth}
