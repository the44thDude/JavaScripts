
function go(){
var gate="https://dg41emic87.execute-api.us-east-2.amazonaws.com/default/WedGuestLog";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", gate, true);

    var info = {
        "name": "caleb",
        "T": "12",
        "21": "2",
        "K": "6",
    }


    xhr.send(info);
}