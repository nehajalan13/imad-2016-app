var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/common.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'common.css'));
});
app.get('/home.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'home.css'));
});
app.get('/ui/style_about.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style_about.css'));
});
app.get('/ui/style_add_articles.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style__add_articles.css'));
});
app.get('/ui/style_article.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style_article.css'));
});
app.get('/ui/style_article_list.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style_article_list.css'));
});
app.get('/ui/style_login.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style_login.css'));
});
app.get('/ui/style_profile.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style_profile.css'));
});
app.get('/img.gif', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'img.gif'));
});

app.get('/about',function(req,res){
  var about=`<p>
          about
        </p>`;
  res.send(about);
});

app.get('/articles',function(req,res){
  var articles=`<div class="container">
        <div class="article">
          <div class="imageholder">
            <img src ="ui/img.gif" alt>
          </div>
          <div class="heading">
            <h2>Lorem Ipsum</h2>
					<br>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vivamus varius egestas lectus et mollis. Donec tempor dapibus mauris, nec commodo felis volutpat et.
              Vestibulum a neque imperdiet, sodales quam ut, eleifend lorem. Cras dictum finibus condimentum.
              Etiam egestas lobortis erat in pharetra. Cras eget ornare lorem, et sollicitudin tortor.
              Vivamus gravida nunc vel erat maximus, ut sodales lacus pretium. Suspendisse potenti.
            </p>
            <p>
              In sit amet nunc turpis. Vivamus elementum, dui ac eleifend ultricies, erat diam dignissim magna,
              in feugiat nulla diam ut ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean tristique porttitor dolor, sed blandit metus blandit non. Donec eu tellus lacus.
            </p>
          </div>
          <p class="continue">
            <a href="$$$$$$$">Continue Reading...</a>
          </p>
        </div>
        <br>
        <div id="caption">
          //Image Caption
        </div>
      </div>`;
  res.send(articles);
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
