import mongoose from "mongoose";
import dotenv from "dotenv";
import passportLocalMongoose from 'passport-local-mongoose';
import passport from 'passport';

dotenv.config();

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

userSchema.plugin(passportLocalMongoose)

const User = new mongoose.model("user", userSchema);


export { User };
