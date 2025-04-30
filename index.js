import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3004;

let blogPosts = [
    { title: "Post 1", content: "This is the content of post 1"},
    { title: "Post 2", content: "This is the content of post2" },
    { title: "Post 3", content: "This is the content of post2" },

];


app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("style"));
app.get("/", (req, res) => {
    res.render("index", {blogPosts});
});

app.get("/create", (req, res) => {
    console.log("Create post route hit");
    res.render ("create-post");
});

app.get("/edit/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= blogPosts.length) {
        res.status(404).send("Invalid post index");
        return;
    }
    const post = blogPosts[index];
    res.render("edit-post", { post, index });
});
app.delete("/delete/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= blogPosts.length) {
        res.status(404).send("Invalid post index");
        return;
    }
    blogPosts.splice(index, 1);
    res.redirect("/");
});




app.post("/create", (req, res) => {
    const {title, content } = req.body;
    blogPosts.push({title, content });
    res.redirect("/");
});
app.post("/update/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= blogPosts.length) {
        res.status(404).send("Invalid post index");
        return;
    }
    const {title, content } = req.body;
    blogPosts[index] = {title, content };
    res.redirect("/");
});
app.listen(port, () => {
    console.log(`Server running on the port ${port}`)
});
