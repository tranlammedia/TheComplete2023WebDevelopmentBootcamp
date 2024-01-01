//jshint esversion:6

import express from "express";
import mongoose from "mongoose";
import _ from "lodash";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL =
    process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/todolistDB";

const homeStartingContent =
    "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
    "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
    "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [
    {
        title: "Test Post",
        content: "Test Post",
    },
];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
try {
    mongoose.connect(DATABASE_URL);
} catch (error) {
    console.error(error);
}

const postSchema = {
    title: String,
    content: String,
};

const Post = mongoose.model("Post", postSchema);

app.get("/", async (req, res) => {
    posts = await Post.find({})
    res.render("home", { homeStartingContent, posts });
});

app.get("/about", (req, res) => {
    res.render("about", { aboutContent });
});

app.get("/contact", (req, res) => {
    res.render("contact", { contactContent });
});

app.route("/compose")
    .get((req, res) => {
        res.render("compose");
    })
    .post((req, res) => {
        const post = {
            title: req.body.postTitle,
            content: req.body.postBody,
        };
        try {
            Post.create(post);
        } catch (err) {
            console.log(`error create document`);
        }
        posts.push(post);
        res.redirect("/");
    });

app.get("/posts/:postid", async (req, res) => {
    const postid = req.params.postid;
    try {
        const post = await Post.findOne({_id: postid});
        res.render("post", {post: post});
    } catch (error) {
        console.log(`Error findOne document`)        
    }
    // posts.forEach((post) => {
    //     if (post.title.toLocaleLowerCase() === _.lowerCase(requestPost)) {
    //         res.render("post", {
    //             post,
    //         });
    //     } else {
    //         res.send("not found");
    //     }
    // });
});

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
});