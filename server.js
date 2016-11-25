/*-----import packages-----*/
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var app = express();
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');


app.use(morgan('combined'));
app.use(bodyParser.json());

app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24},
    resave: true,
	saveUninitialized: true
}))
/*-----database connection-----*/


//imad database

var config={
	user:'jaxstronomer',
	database:'jaxstronomer',
	host:'db.imad.hasura-app.io',
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
//      console.log('$'+req.session +'$'+ req.session.auth +'$'+ req.session.auth.userId);
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
  				<p><i class="fa fa-clock-o" aria-hidden="true"></i>
          ${date.toDateString()}</p>
  			</div>
  			<hr/>
  			<div id="content">
          ${content}
        </div><hr>


        <div><h2><i class="fa fa-comments" aria-hidden="true"></i>    Comments</h2>
        			<div id="comment_area${data.article_id}">
        </div>`;
        var comment_box=`  <div id="insert_comment">
            <textarea rows="10" name="comment" id="comment_text${data.article_id}" placeholder="Add Comment"></textarea><br>
            <button id="submit_comment" type="submit"  article_id="${data.article_id}" onclick="post_comment()">Submit</button>
         </div>`;
      //  if(req.session && req.session.auth && req.session.auth.userId){
          article+=comment_box;
		      article+=`<br/>
			      <p class="continue">
					<a href="javascript:void(0)" onclick="less(${data.article_id})" article_id="${data.article_id}"><i class="fa fa-angle-double-left" aria-hidden="true"></i>
          Show Less...</a>
				</p>
  		</div>`;


    return article;
}


/*------postcomments-----*/
app.post('/submit-comment/:articleName', function (req, res) {
    if (req.session && req.session.auth && req.session.auth.userId) {
        pool.query('SELECT article_id FROM article WHERE article_id = $1', [req.params.articleName], function (err, result) {
            if (err) {
                res.status(500).send(err.toString());
            } else {
                if (result.rows.length === 0) {
                    res.status(400).send('Article not found');

                } else {
                    var articleId = result.rows[0].article_id;
                    pool.query(
                        "INSERT INTO comments (comment, article_id, user_id) VALUES ($1, $2, $3)",
                        [req.body.comment, articleId, req.session.auth.userId],
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err.toString());
                            } else {
                                res.status(200).send('Comment inserted!')
                            }
                        });
                }
            }
       });
    } else {
        res.status(403).send('Please login to comment');
    }
});


/*------load comment----*/

app.get('/get-comments/:articleName', function (req, res) {
   pool.query('SELECT comments.*, "user".username FROM article, comments, "user" WHERE article.article_id = $1 AND article.article_id = comments.article_id AND comments.user_id = "user".user_id', [req.params.articleName], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});


/*-----serving articles List-----*/

app.get('/article_list',function(req,res){
	pool.query('SELECT article_id, heading, substring(content,0,600) AS content FROM article ORDER BY article_id',function(err,result){
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
            <div class="heading">
              <h1>${heading}</h1>
			  <p>${content}.....</p>
			</div>
            <p class="continue">
              <a href="#/article/${article_id}" onclick="article(${article_id})">Continue Reading...<i class="fa fa-angle-double-right" aria-hidden="true"></i>
</a>
            </p>
          </div>
        </div>`;
		return article_li;
}


/*-----serving profile------*/
app.get('/profile',function(req,res){
  var profile=`<div class="container7">
    <div id="p_row1">
      <div id="imageholder2">
        <img src = '/ui/jax.jpg'>
      </div>
      <div id="bio">
      <h1>Bio</h1>
      <hr>
      <h3><i class="fa fa-user-circle-o" aria-hidden="true"></i>    Jagdish Kumar Verma</h3>
      <h3><i class="fa fa-graduation-cap" aria-hidden="true"></i>    Haldia Institute of Technology<h3>
      <h3><i class="fa fa-code" aria-hidden="true"></i>    Developer,Coder, UI/UX Designer</h3>
      <h3><i class="fa fa-list" aria-hidden="true"></i><a href="https://drive.google.com/file/d/0B4St1j_16gfcRzljaGh2T0E4Xzg/view?usp=sharing" target="_blank" style="text-decoration:none">    Resume</a></h3>
      </div>
      <div id="skillset">
        <h1>Skillset</h1>
        <hr>
        <br><h2>Languages :</h2>
        <h3><i class="icon-c"></i>      C (Intermediate)</h3>
        <h3><i class="icon-cplusplus"></i>      C++ (Intermediate)</h3>
        <h3><i class="icon-java-bold"></i>      Java (Intermediate)</h3>
        <h3><i class="fa fa-html5" aria-hidden="true"></i>      HTML5 (Intermediate)</h3>
        <h3><i class="fa fa-css3" aria-hidden="true"></i>     CSS3 (Intermediate)</h3>
        <h3><i class="icon-javascript-alt"></i>      Javascript (Intermediate)</h3>
        <h3><i class="icon-nodejs"></i>       Nodejs(Beginner)</h3>
        <br><h2>Operating Systems:</h2>
        <h3><i class="icon-centos"></i>       CentOS (Beginner)</h3>
        <h3><i class="fa fa-windows" aria-hidden="true"></i>        Windows</h3>
        <br><h2>Databases:</h2>
        <h3><i class="icon-postgres"></i>        PostgreSQL(Beginner)</h3>
        <br><h2>Others:</h2>
        <h3><i class="icon-splatter"></i>       Blender (Beginner)</h3>
        <h3><i class="fa fa-id-badge" aria-hidden="true"></i>        Visual Basic</h3>
      </div>
      <div id="contacts">
        <h1>Contacts</h1>
        <hr>
        <h3><i class="fa fa-envelope" aria-hidden="true"></i>    jags.k.verma@gmail.com</h3>
        <h3><i class="fa fa-phone" aria-hidden="true"></i>  <i class="fa fa-whatsapp" aria-hidden="true"></i>    7501673237</h3>
        <h3><i class="fa fa-github-square" aria-hidden="true"></i><a href="https://github.com/jaxstronomer" target="_blank" style="text-decoration:none">    Github</a></h3>
        <h3><i class="fa fa-linkedin-square" aria-hidden="true"></i><a href="https://in.linkedin.com/in/jagdish-verma-a898a1ba" target="_blank" style="text-decoration:none">    LinkedIn</a></h3>
      </div>
      <div id="socials">
        <h1>Socials</h1>
        <hr>
        <h3><i class="fa fa-facebook-official" aria-hidden="true"></i><a href="https://www.facebook.com/jaxstronomer" target="_blank" style="text-decoration:none">    Facebook</a></h3>
        <h3><i class="fa fa-twitter" aria-hidden="true"></i><a href="https://twitter.com/jaxstronomer" target="_blank" style="text-decoration:none">    Twitter</a></h3>
        <h3><i class="fa fa-google-plus" aria-hidden="true"></i><a href="https://plus.google.com/109238731056330362713" target="_blank" style="text-decoration:none">    Google+</a></h3>
        <h3><i class="fa fa-quora" aria-hidden="true"></i><a href="https://www.quora.com/profile/Jagdish-Verma-5" target="_blank" style="text-decoration:none">    Quora</a></h3>
        </div>
      </div>
    </div>
  </div>
`;
  res.send(profile);
});


/*-----serving about------*/
app.get('/about',function(req,res){
  var about=`<div class="container8">
    <div id="a_row1">
      <h1>About Me</h1>
      <hr>
      <p>Hi,<br> My name is Jagdish Kumar Verma</p>
      <p>I am  third year engineering unergraduate in Computer Science and Engineering from Haldia Institute of Technology.</p>
      <p>I enjoy learning new things and learning web-app development with NPTEL & IMAD was a lot of fun.</p>
      <p>Some things that interest me in general : reading, coding, clouds, star-gazing, numismatics, rock-hounding, photography, writing and travelling (not particularly in that order).<br>
      (P.S :If I we happen to share any common interests, feel free to ping me on any social media)
      </div>
      <div id="a_row2">
        <h1>About this Website</h1>
        <hr>
        <p>This website was developed as a final assignment for the MOOC "Introduction to Modern Application Development" conducted by NPTEL.</p>
        <p>It is completely AJAX-based. Everything is served in real-time and no page-refresh is required.</p>
      </div>
      <div id="a_row3">
        <h1>Features</h1>
        <hr>
        <p>Read from various articles.</p>
        <p>Articles served dynamically</p>
        <p>Login and comment on any article</p>
        <p>Responsive UI</p>
        <p>Completely AJAX-based</p>
      </div>
      <div id="a_row4">
        <h1>Technology Stack</h1>
        <hr>
        <p>HTML5</p>
        <p>CSS3</p>
        <p>jQuery</p>
        <p>Nodejs</p>
        <p>PostgreSQL</p>
      </div>
  </div>`;
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

app.get('/u/m/q/r/a/panda.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'panda.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/menu.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'menu.png'));
});

app.get('/ui/jax.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'jax.jpg'));
});

app.get('/ui/loading.gif', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'loading.gif'));
});

app.get('/ui/bg.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'bg.jpg'));
});






/*hash function*/
function hash (input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}
app.get('/hash/:input', function(req, res) {
   var hashedString = hash(req.params.input, 'this-is-some-random-string');
   res.send(hashedString);
});

/*Create User*/

app.post('/create-user', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   if(!username.trim() || !password.trim()){
     res.status(500).send('Enter Username and password');
   }else{
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user"(username, password) VALUES($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      }
       else {
          res.send('User successfully created: ' + username);
        }
   });
 }

});

/*------login----*/
app.post('/login',function(req, res){
	var username = req.body.username;
	var password = req.body.password;
  console.log('\n'+username+' '+password);
	pool.query('Select * FROM "user" WHERE username =$1', [username], function (err, result) {
		 if(err) {
				 res.status(500).send(err.toString());
		 } else {
    //   console.log(result.rows.length+"Rowdata: "+JSON.stringify(result.rows[0]));
			 if(result.rows.length==0){
				 res.status(403).send("username/password is incorrect");
			 } else{
				 var dbString = result.rows[0].password;
				 var salt = dbString.split('$')[2];
				 var hashedPassword = hash(password,salt);
				 if(hashedPassword === dbString){
					 req.session.auth = {userId: result.rows[0].user_id};
					 res.send('Logged in as,  '+username);
				 }
				 else
				     res.status(403).send('username/password is incorrect');

	          }
	}});});

app.get('/check-login',function(req,res){
	if(req.session && req.session.auth && req.session.auth.userId){
		res.send(req.session.auth.userId.toString());
	}
	else{
		res.status(403).send('not logged in');
	}
});

app.get('/logout', function(req,res){
	delete req.session.auth;
	res.send("logged out");
})

function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    res.send('Not logged in');
  } else {
    next();
  }
}


/*-----listening on port-----*/

var port = 8080; // Using 8080 for local development because apache might already be running on 80
app.listen(8080, function () {
  console.log(`Server up and running on port ${port}!`);
});


