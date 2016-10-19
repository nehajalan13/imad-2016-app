
var button =document.getElementById('counter');
var counter=0;
button.onCLick = function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange= function(){
        if(request.readyState==XMLHttpRequest.DONE){
            if(request.status == 200){
                var counter =request.responseText;
                var span = document.getElementById("count");
                span.InnerHTML=counter.toString();
            }
        }
    };
    request.open('GET','http://jaxstronomer.imad.hasura-app.io/counter', true);
    request.send(null);
};