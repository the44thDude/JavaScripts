function login(){
    var name=document.getElementById("text").value;
    console.log(name);
    const Http = new XMLHttpRequest();
    Http.open("PUT", "https://ov97vty5wi.execute-api.us-east-1.amazonaws.com/default/logincreds");
    Http.setRequestHeader("Content-Type", "application/json");
    var data= "{'"+name+"'}";
    Http.send(data);

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
    }
    const Hthitp = new XMLHttpRequest();
var url="https://ov97vty5wi.execute-api.us-east-1.amazonaws.com/default/logincreds?q="+data;
Hthitp.open("GET", url);
Hthitp.send();

Hthitp.onreadystatechange = (e) => {
  console.log(Http.responseText)
}
}