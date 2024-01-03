//jshint esversion:6
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { User } from "./models/User.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/";
const SECRET = process.env.SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: SECRET,
        resave: false, // false ony save when change
        saveUninitialized: false, // false, not create new when don't just actiom
    })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(DATABASE_URL);

passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username, name: user.name });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

// setup google auth
const googleStrategy = new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/secrets",
        // https://github.com/jaredhanson/passport-google-oauth2/pull/51
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile.id);
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
);

passport.use(googleStrategy);

app.get("/", async (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/secrets");
    } else {
        res.render("home");
    }
});

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile"] }),
    async (req, res) => {
        console.log("google authenticated");
    }
);

app.get(
    "/auth/google/secrets",
    passport.authenticate("google", { 
        successReturnToOrRedirect: '/secrets',
        failureRedirect: "/login" }
    ),
    function (req, res) {
        // Successful authentication, redirect secrets.
        res.redirect("/secrets");
    }
);

app.route("/login")
    .get(async (req, res) => {
        // console.log(req.session);
        if (req.isAuthenticated()) {
            res.redirect("/secrets");
        } else {
            res.render("login");
        }
    })
    .post(async (req, res) => {
        const { username, password } = req.body;
        const user = new User({
            username: username,
            password: password,
        });
        req.login(user, function (err) {
            if (err) {
                console.log(err);
            } else {
                
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/secrets");
                });
            }
        });
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
                    // console.log(user);
                    passport.authenticate("local")(req, res, function () {
                        res.redirect("/secrets");
                    });
                }
            }
        );
    });

app.get("/secrets", async (req, res) => {
    if (req.isAuthenticated()) {
        const usersWithSecrets = await User.find({"secret": {$ne: null}});
        
        res.render("secrets", {usersWithSecrets});
    } else {
        res.redirect("/login");
    }
});

app.route("/submit")
    .get(async (req, res) => {
        if (req.isAuthenticated()) {
            res.render("submit");
        } else {
            res.redirect("/login");
        }
    })
    .post(async (req, res) => {
        const submitedSerect = req.body.secret
        const foundUser = await User.findById(req.user.id);
        console.log(req.user);
        if (foundUser) {
            foundUser.secret = submitedSerect;
            await foundUser.save();
            res.redirect("/secrets");
        }

    });
app.get("/logout", async (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});
