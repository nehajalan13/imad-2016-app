function about(){
  var element=document.getElementById('row3');
  var req1=new XMLHttpRequest();
  req1.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
      element.innerHTML=this.responseText;
    }
  };
  req1.open('GET','/about',true);
  req1.send();
}
