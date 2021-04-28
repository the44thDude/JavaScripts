var output = "";
var x = null;
var op= '';

function calc(y){
    if (op=="+"){
        x=x+y;
    }else if(op=="-"){
        x=x-y;
    }else if (op=="*"){
        x=x*y;
    }else if(op=="/"){
        x=x/y
    }else if (x==null){
        x=y;
    }else{
        x=x.toString();
        x=x+y.toString();
        x=Number(x);
    }
    op='';
}

function buttonpress(B){
    if (B=="*"){
        op='*';
    }else if (B=="+"){
        op='+'
    }else if (B=="-"){
        op='-'
    }else if (B=="/"){
        op= "/"
    }
    else if (B=="1"){
        calc(1);
    }else if (B=="2"){
        calc(2);
    }else if (B=="3"){
        calc(3);
    }else if (B=="4"){
        calc(4);
    }else if (B=="5"){
        calc(5);
    }else if (B=="6"){
        calc(6);
    }else if (B=="7"){
        calc(7);
    }else if (B=="8"){
        calc(8);
    }else if (B=="9"){
        calc(9);
    }else if (B=="0"){
        calc(0);
    }else if (B=="="){
        op= '=';
    }
    document.getElementById('output').innerHTML=x.toString() +op;
    if (B=="="){
        x=null;
        document.getElementById('output').innerHTML='';
    }
}




