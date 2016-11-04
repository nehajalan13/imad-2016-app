function about(){
  var element=document.getElementsById('row3');
  var req1=new XMLHttpRequest();
  req1.onreadysrtatechange=function(){
    if(this.readystate==4 && this.status==200){
      element.innerHTML=this.responseText;
    }
  };
  req1.open('GET','/about',true);
  req1.send();
}
