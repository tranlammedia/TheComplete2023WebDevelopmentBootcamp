//jshint esversion:6
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import md5 from 'md5';

import { User } from './models/User.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/';

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));

mongoose.connect(DATABASE_URL);

app.get('/', async (req, res) => {
    res.render('home');
})

app.route('/login')
    .get(async (req, res) => {
        res.render('login');
    })
    .post(async (req, res) => {
        const { username, password } = req.body;
        const userDB = await User.findOne({email: username});
        if (!userDB) {
            console.log("Don't existed email "+ username)
            res.redirect('/login')
        } else if (md5(password) !== userDB.password) {
            console.log("Wrong password. Try Again")
            res.redirect('/login')
        } else {
            res.render('secrets')
        }
    });

app.route('/register')
    .get(async (req, res) => {
        res.render('register');
    })
    .post(async (req, res) => {
        const {username, password} = req.body;
        const newUser = new User({
            email: username,
            password: md5(password)
        });
        await newUser.save();
        res.render('secrets')
    });

app.get('/secrets', async (req, res) => {
    res.render('secrets');
})

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});