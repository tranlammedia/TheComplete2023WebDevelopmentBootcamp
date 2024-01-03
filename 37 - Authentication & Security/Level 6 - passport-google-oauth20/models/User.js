import mongoose from "mongoose";
import dotenv from "dotenv";
import passportLocalMongoose from 'passport-local-mongoose';
import findOrCreate from "mongoose-findorcreate";

dotenv.config();

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String,
});

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)

const User = new mongoose.model("user", userSchema);


export { User };
