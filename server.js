var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/common.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'common.css'));
});
app.get('/home.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'home.css'));
});
app.get('/style_about.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style_about.css'));
});
app.get('/style_add_articles.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style__add_articles.css'));
});
app.get('/style_article.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style_article.css'));
});
app.get('/style_article_list.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style_article_list.css'));
});
app.get('/style_login.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style_login.css'));
});
app.get('i/style_profile.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style_profile.css'));
});

app.get('/about',function(req,res){
  var about=`<p>
          about
        </p>`
  res.send(about);
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
