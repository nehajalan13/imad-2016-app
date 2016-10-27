var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg'),Pool;

var config={
  user: ;
  passsword: ;
  database: ;
  host: ;
  port: '5432';
}
var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});


var pool=new Pool(config){
app.get('/home',function(req,res){
    pool.query('select title,maindata from test',function(err,result){
      if(err){
        res.status(500).send(err.toString());
      }
      else {
        if(result.rows.length===0){
          res.status(404).send('Not Found.')
        } else{
        var maindata=result.rows;
        res.send(createTemplate(maindata));
      }
    }
    });
  });
}

function createTemplate(data){
var title=data.title;
var maindata=data.maindata;
/*---------html-------*/
var htmlTemplate=`
	<head>
		<link rel="stylesheet" href="ui/style_login.css" media="screen">
		<link rel="stylesheet" href="ui/common.css" media="screen">
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Blog | ${title}</title>
	</head>
	<body id="top">
    <div class="row1">
      <div id="banner">
        <div id="blog_name">
          <header>BlogLite</header>
        </div>
      </div>
    </div>
    <div class="row2">
      <div id="navmenu">
        <ul>
          <li><a class="active" href="front.html">Home</a></li>
					<li><a class="active" href="profile.html">My Profile</a></li>
					<li><a class="active" href="articles.html">My Articles</a></li>
					<li id="about"><a class="active" href="about.html">About</a></li>
					<li id="logout"><a class="active" href="index.html">Logout</a></li>
        </ul>
      </div>
    </div>
		${maindata}
    <div class="row4">
      <div id="footer">
        <footer>Footer goes here</footer>
      </div>
    </div>
  </body>
`;
return htmlTemplate;
}
