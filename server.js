/*-----import packages-----*/
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var app = express();
app.use(morgan('combined'));


/*-----database connection-----*/
var config={
	user:'jaxstronomer',
	database:'jaxstronomer',
	host:'http://db.imad.hasura-app.io/',
	port:'5432',
	password: process.env.DB_PASSWORD
};
var pool = new Pool(config);


/*-----serving articles from article list (on click)-----*/
app.get('/article',function(req,res){
	pool.query('SELECT * FROM article',function(err,result){
    if(err){
      res.status(500).send(err.toString());
    }
    else{
      var article=result.rows[0];
      res.send(articleTemplate(article));
    }
	});
});

function articleTemplate(data){
  var heading=data.heading;
  var date=data.date;
  var content=data.content;
  var article=`<div class="article2">
  			<div id="heading">
        	<h1>${heading}<h1>
  			</div>
  			<div id="date">
  				<p>${date}</p>
  			</div>
  			<hr/>
  			<div id="content">
          ${content}
        </div>
  			<hr/>
  			<div id="insert-comment">
  				<form>
  					<input id="comment-here" type="text" name="comment" placeholder="Comment..."><br>
  					<button id="submit" type="submit">Submit</button>
  				</form>
  			</div>
  			<div id="comments">
				<p>comments</p>
			</div>
			<br/>
			<p class="continue">
					<a href="javascript:void(0)" onclick="less(${data.article_id})" article_id="${data.article_id}">Show Less...</a>
				</p>
  		</div>`;
    return article;
};


/*-----serving articles List-----*/

app.get('/article_list',function(req,res){
	pool.query('SELECT article_id, heading, substring(content,0,500) AS content FROM article ORDER BY article_id',function(err,result){
		if(err){
      			res.status(500).send(err.toString());
    		}
   		else{
			var article_list=[];
			for(var i=0;i<result.rows.length;i++){
				article_list.push(articleListTemplate(result.rows[i]));
		}
		res.send(article_list.toString());
	}
	});
});

function articleListTemplate(data){
	var article_id=data.article_id;
	var heading=data.heading;
  var content=data.content;
	var article_li=`<div class="container1" article_id=${article_id}>
          <div class="article1">
            <div class="imageholder">
              <img src ="ui/img.gif" alt>
            </div>
            <div class="heading">
              <h2>${heading}</h2>
						<p>${content}.....</p>
						</div>
            <p class="continue">
              <a href="javascript:void(0)" onclick="article(${article_id})">Continue Reading...</a>
            </p>
          </div>
          <br>
        </div>`;
				return article_li;
};



app.get('/profile',function(req,res){
  var profile=`<div class="container3">
    <div class="imageholder2">
      <img src="ui/jax.jpg" >
    </div>
    <div class="personalinfo">
      <h1>Name:Jagdish Verma</h1>
      <p>
      Age:222
      etc etc
    </p>
    </div>
    <div class="social">
      FInd me on:
      Facebook
      Twitter
      Google+
      LinkedIn
      GitHub
    </div>
  </div>
`;
  res.send(profile);
});
app.get('/about',function(req,res){
  var about=`<p>
          about
        </p>`;
  res.send(about);
});


/*-----url mappings-----*/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article/:article_id',function(req,res){
	pool.query('SELECT * FROM article where article_id=$1',[req.params.article_id],function(err,result){
		if(err){
			res.status(500).send(err.toString());
		}
		else{
			var article=result.rows[0];
			res.send(articleTemplate(article));
		}
	});

});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style_profile.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style_profile.css'));
});

app.get('/u/m/q/r/a/panda.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'panda.html'));
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
app.get('/ui/img.gif', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'img.gif'));
});

app.get('/ui/paper.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'paper.png'));
});

app.get('/ui/jax.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'jax.jpg'));
});

app.get('/ui/menu.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'menu.png'));
});


/*-----listening on port-----*/
var port = 8080; // Using 8080 for local development because apache might already be running on 80
app.listen(8080, function () {
  console.log(`Server up and running on port ${port}!`);
});
