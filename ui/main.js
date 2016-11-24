function article_list(){
  window.scrollTo(0, 0);
  var element=document.getElementById('row3');
  $('.loading').show();
  var req3=new XMLHttpRequest();
  req3.onreadystatechange=function(){
    if(this.readyState===4 && this.status==200){
      element.innerHTML=this.responseText;
        $('.loading').hide();
    }
  };
  req3.open('GET','/article_list',true);
  req3.send();
}

function article(article_id){
//  $("div[article_id="+article_id+"]").hide();
    $('.loading').show();
  var req2=new XMLHttpRequest();
  req2.onreadystatechange=function(){
    if(this.readyState===4 && this.status==200){
      $(this.responseText).insertBefore("div[article_id="+(article_id)+"]");
      $("div[article_id="+article_id+"]").hide();

      loadComments();
      $('.loading').hide();
    }
  };
  req2.open('GET','/article/'+article_id,true);
  req2.send();
}

function less(aid){
  $("a[article_id="+aid+"]").parents('div.article2').remove();
  $("div[article_id="+aid+"]").show();



}



function about(){
    window.scrollTo(0, 0);
  var element=document.getElementById('row3');
    $('.loading').show();
  var req1=new XMLHttpRequest();
    req1.onreadystatechange=function(){
    if(this.readyState===4 && this.status==200){
      element.innerHTML=this.responseText;
          $('.loading').hide();
    }
  };
  req1.open('GET','/about',true);
  req1.send();
}



function profile(){
    window.scrollTo(0, 0);
  var element=document.getElementById('row3');
      $('.loading').show();
  var req3=new XMLHttpRequest();
  req3.onreadystatechange=function(){
    if(this.readyState===4 && this.status==200){
      element.innerHTML=this.responseText;
          $('.loading').hide();
    }
  };
  req3.open('GET','/profile',true);
  req3.send();
}
/*----responsive topnav-----*/
$('ul.topnav li').click(function(){
  $('li.icon').css('text-align','right');
});
window.onclick=function(e){
    var x = document.getElementById("myTopnav");
    if(e.target==document.getElementById('menu.png')){

    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
    }
    else{
        x.className="topnav";
    }
}

function loginbtn(){

  document.getElementById('login_form').style.display="block";
  document.getElementById('register_form').style.display="none";
}

function register_button(){
  document.getElementById('login_form').style.display="none";
  document.getElementById('register_form').style.display="block";
}

function close_function(){
  document.getElementById('modal_login').style.display="none";
}
function login(){
  document.getElementById('modal_login').style.display="block";

}

/*--------------postcoments------*/
function post_comment(){
    var currentArticleTitle = window.location.hash.slice(10);
    $('.loading').show();
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                document.getElementById('comment_text'+currentArticleTitle).value = '';
                        $('.loading').hide();
                      console.log(this.responseText);
                loadComments();
            } else {
              $('.loading').hide();
                alert(this.responseText);
            }
      }
    };

    var comment = document.getElementById('comment_text'+currentArticleTitle).value;
    request.open('POST', '/submit-comment/' + currentArticleTitle, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({comment: comment}));

//};

};



/*--------loadcomments-----*/


function escapeHTML (text)
{
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}

function loadComments () {
  var currentArticleTitle = window.location.hash.slice(10);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var comments = document.getElementById('comment_area'+currentArticleTitle);
            if (request.status === 200) {
                var content = '';
                var commentsData = JSON.parse(this.responseText);
                for (var i=0; i< commentsData.length; i++) {
                    content += `<div class="comment">
                    <p>${escapeHTML(commentsData[i].comment)}</p>
                        <div class="commenter">
                            <p style="font-style: italic;font-weight:bold;">-${commentsData[i].username}<p>
                        </div>
                    </div><hr style="border:0.5px solid rgba(0,0,0,0.3); width:50%; margin-left:0">`;
                }
                comments.innerHTML = content;
            } else {
                comments.innerHTML('Oops! Could not load comments!');
            }
        }
    };

    request.open('GET', '/get-comments/' + currentArticleTitle, true);
    request.send(null);
}



/*-----create new user----*/

var register = document.getElementById('registerbtn');
register.onclick=function(){
    $('.loading').show();
  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if (request.readyState === XMLHttpRequest.DONE) {
       $('.loading').hide();
        if (request.status == 200) {
          close_function();
          alert(this.responseText);
        } else if(request.status == 403) {
            alert(this.responseText);
        }
        else{
          alert("username not available");
        }
    }
  }
  var username = document.getElementById('newusrn').value;
  var password = document.getElementById('newpass').value;
  console.log(username);
  console.log(password);
  request.open('POST', '/create-user', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username:username, password:password}));
};




/*-------login----*/
var submit = document.getElementById('submit_btn');
submit.onclick = function () {
      $('.loading').show();
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                  $('.loading').hide();
                close_function();
                login_init();
                $('body').append(`<div id="loggedin_as" style="z-index:200;top:0;position:fixed;right:20px;font-size:12px;">
                    <h3 style="margin:5px 0 0 0;padding:0;color:#fff;  font-family: 'Josefin Sans', sans-serif;">${this.responseText}</h3>
                    </div>`);


              console.log(this.responseText);

            } else if (request.status === 403) {
              $('.loading').hide();

                alert("username/password is incorrect");
              } else if (request.status === 500) {
                $('.loading').hide();
                alert('Something went wrong on the server');
            } else {
                alert('Something went wrong on the server');
            }
        }
        // Not done yet
      };

var username = document.getElementById('usrn').value;
var password = document.getElementById('pass').value;
console.log(username);
console.log(password);
request.open('POST', '/login', true);
request.setRequestHeader('Content-Type', 'application/json');
request.send(JSON.stringify({username:username, password:password}));
};



/*----logout-----*/

function logout(){
    $('.loading').show();
  var req1=new XMLHttpRequest();
    req1.onreadystatechange=function(){
    if(this.readyState===4 && this.status==200){
          $('.loading').hide();
          login_init();
          $('#loggedin_as').remove();
          alert("Logged out successfully");
        }
  };
  req1.open('GET','/logout',true);
  req1.send();
}

/*------*/

function login_init(){
  var x = new XMLHttpRequest();
  var y =0;
  x.onreadystatechange=function(){
      if(this.readyState===4 && this.status==403){
        $('li#about').before('<li id="login"><a href="javascript:void(0)" onclick="login()"><i class="fa fa-sign-in" aria-hidden="true">  Login</i></a></li>');
        $('li#logout').remove();
      }else if(this.readyState===4){
        $('li#about').before('<li id="logout"><a href="javascript:void(0)" onclick="logout()"><i class="fa fa-sign-out" aria-hidden="true">  Logout</i></a></li>');
        $('li#login').remove();
      }
    }
    x.open('GET','/check-login',true);
    x.send();
//  }
}



login_init();
//post_comment();
/*----*/
