const { User } = require('../Models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserController = {
    async register(req, res){
        // register
        const {
            fullName, 
            userName, 
            email, 
            password, 
            avatar } = req.body;

        try{

            const existingUserByUsername = await User.findOne({userName});
            if(existingUserByUsername){
                return res.status(400).json({message: "Username is already exist!"});
            }

            const existingUserByEmail = await User.findOne({email});
            if(existingUserByEmail){
                return res.status(400).json({message: "Email is already exist!"});
            }

            bcrypt.hash(password, 8, async(err, hash)=>{
               
                const newUser = new User({
                    fullName,
                    userName,
                    email,
                    password: hash,
                    avatar
                });

                await newUser.save();
                res.status(201).json({
                    message: "User created successfully!",
                    newUser
                })
            })
        }catch(err){
            // console.log(err);
            res.status(401).json({
                message: err.message
            });
        }
    },

    async login(req, res){
        // login
        const {userName, password} = req.body;

        try{
            const user = await User.findOne({userName});
            console.log(user);
            if(!user){
               return res.status(401).json({message: "Invalid credentials!"}); 
            }

            const checkPassword = await bcrypt.compare(password, user.password);

            if(!checkPassword){
                return res.status(401).json({message: "Invalid credentials!"});
            }

            const token = jwt.sign({
                userID: user._id
            }, process.env.JWT_KEY)

            res.status(200).json({
                message: "Login successful",
                token
            })

        }catch(err){
            res.status(401).json({
                message: err.message
            })
        }
    },

    async getProfile(req, res){
        // get profile
        try{
            const userID = req.user.userID;
            // console.log(req.user);
            const user = await User.findById(userID);
            // console.log(user);

            if(!user){
                return res.status(404).json({message: "User not found!"});
            }

            res.status(200).json(user);
        }catch(err){
            res.status(500).json({message: "Internal server error"});
        }

    },

    async updateProfile(req, res){
        // update profile
        try{
            const userID = req.user.userID;
            const {fullName, avatar} = req.body;

            const updatedUser = await User.findByIdAndUpdate(userID, {fullName, avatar }, {new: true});

            if(!updatedUser){
                return res.status(404).json({message: 'User not found!'});
            }

            res.status(200).json(updatedUser);

        }catch(err){
            res.status(500).json({message: 'Internal server error'});
        }
    },

    async changePassword(req, res){
        // change password
        try{
            const userID = req.user.userID;
            const {oldPassword, newPassword} = req.body;

            const user = await User.findById(userID);
            

            if(!user){
                return res.status(404).json({message: "User not found!"});
            }

            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

            if(!isPasswordValid){
                return res.status(404).json({
                    message: "User not found"
                });
            }

            bcrypt.hash(newPassword, 8, async (err, hash)=>{
                if(err)
                    throw err;

                user.password = hash;
                await user.save();
    
                res.status(200).json({
                    message: "Password updated successfully!"
                });

            });

           
      
        }catch(err){
            res.status(500).json({message: err.message});
        }
    },
    async logout(req, res){
        // logout
        try{
            res.status(200).json({
                message: "Logout successful"
            });
        }catch(err){
            res.status(500).json({
                message: "Internal server error"
            });
        }
    }
}

module.exports = { UserController };