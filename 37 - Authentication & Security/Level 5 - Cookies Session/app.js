//jshint esversion:6
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";

import { User } from "./models/User.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SECRET,
        resave: false, // false ony save when change
        saveUninitialized: false, // false, not create new when don't just actiom
    })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(DATABASE_URL);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", async (req, res) => {
    res.render("home");
});

app.route("/login")
    .get(async (req, res) => {
        console.log(req.session);
        if (req.isAuthenticated()) {
            res.redirect("/secrets");
        } else {
            res.render("login");
        }
    })
    .post(async (req, res) => {
        const { username, password } = req.body;
    });

app.route("/register")
    .get(async (req, res) => {
        res.render("register");
    })
    .post(async (req, res) => {
        User.register(
            { username: req.body.username },
            req.body.password,
            function (err, user) {
                if (err) {
                    console.log(err);
                    res.redirect("/register");
                } else {
                    console.log(user);
                    passport.authenticate("local")(req, res, function () {
                        res.redirect("/secrets");
                    });
                }
            }
        );
    });

app.get("/secrets", async (req, res) => {
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
});

app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});
