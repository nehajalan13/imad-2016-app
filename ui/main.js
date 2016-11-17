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

