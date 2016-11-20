function article_list(){
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
  $("div[article_id="+article_id+"]").hide();
    $('.loading').show();
  var req2=new XMLHttpRequest();
  req2.onreadystatechange=function(){
    if(this.readyState===4 && this.status==200){
      $(this.responseText).insertBefore("div[article_id="+(article_id)+"]");
      $("div[article_id="+article_id+"]").hide();
      $('.loading').hide();
    }
  };
  req2.open('GET','/article/'+article_id,true);
  req2.send();
}

function less(aid){
  $("a[article_id="+aid+"]").parent().parent().hide(),
  $("div[article_id="+aid+"]").show()
}



function about(){
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
        } else {
            alert('Username not available');
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

/*$('#registerbtn').click(function(){
  var username = document.getElementById('newusrn').value;
  var password = document.getElementById('newpass').value;
  $.ajax({
    url:'/create-user',
    data:JSON.stringify({username:username,password:password}),
    contentType:'application/json',
    type:'POST',
    success:function(data,response){
        alert(JSON.stringify(data));
      },
     error:function(err){
        alert('Failed to create user.'+JSON.stringify(err));
      }
  }
)
});*/




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


                alert("Logged in Successfully");
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
  //    element.innerHTML=this.responseText;
          $('.loading').hide();
          login_init();

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
  //  if(this.readyState===4 && this.status==200){
    //  y=Number(this.responseText);
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


/*------*/
