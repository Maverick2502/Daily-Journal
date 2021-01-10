//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "What does home really mean to me? To me, home means not one, but many things. Most importantly, I believe that home means a secure, cheerful place where you are respected and loved. But what about the people without homes? Does it mean the same thing to them? Everybody deserves to know the true meaning of home. When I started writing this essay, I didn’t think much about the meaning of home. But now, I have found out that home means more. Much more."
const aboutContent = "Yeah, you expected something smart in here. But, unfortunately, damn Lorem is the only thing I came up to with. Losiento! Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Well, we both know how you can get in touch with me. Let's bear another lines of age-old Lorem Ipsum somtheing. Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let posts = [];

//Set view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.post('/compose', function(req, res) {

  const post =  {
    title: req.body.postTitle,
    content:  req.body.postBudy
  };

  posts.push(post);
  res.redirect('/');
})


app.get('/', function(req, res) {
  res.render("home", { 
    startingContent: homeStartingContent,
    posts: posts
  });
});

app.get('/about', function(req, res) {
  res.render("about", { aboutContent: aboutContent});
});

app.get('/contact', function(req, res) {
  res.render("contact", { contactContent: contactContent});
});

app.get('/compose', function(req, res) {
  res.render('compose')
});

app.get('/posts/:postName', function(req, res) {
 const requestedTitle = _.lowerCase(req.params.postName); //lodash

 posts.forEach(function(post) {
   const storedTitle = _.lowerCase(post.title); //lodash

   if(storedTitle === requestedTitle) {
    res.render("post", {
      title: post.title,
      content: post.content
    });
   }
 });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
    console.log("Example app listening at localhost:3000");
});