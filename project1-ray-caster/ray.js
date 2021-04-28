var depth=0;
var width=0;
var mousex =2;
var mousey =2;
var wall = '';

function map(line,co){
    var dis=line*(32/90);
    if (line<=90){
        wall="w"
        if(co=="x"){
            return dis;
        }else{
            return 0;
        }
    }else if(line<=180){
        wall="s"
        if(co=="x"){
            return 32;
        }else{
            return(dis-32);
        }
    }else if(line<=270){
        wall="e"
        if(co=="x"){
            return (96-dis);
        }else{
            return 32;
        }
    }else{
        if(co=="x"){
            wall="n"
            return 0;
        }else{
            return(128-dis)
        }
    }
}
function findheightold(x,mousex){
    value= Math.abs(x-32+mousex-32);
    if (value<=depth){
        value=depth;
    }else if(value>=64){
        value=64;
    }
    return value
}
function findheight(x,mousex){
    var line=(mousex+(x-32))
    while (line>360){
        line=line-360;
    };
    valuex=Math.abs(depth)-map(line,"y");
    valuey=Math.abs(width)-map(line,"x");
    value=Math.pow(valuey,2)+Math.pow(valuex,2);
    value=Math.sqrt(value);
    value=81-value-Math.cos(Math.PI*(Math.abs(x-32)/180));
    console.log(value);
   
    return value;
}
function genpix(x,mousex,mousey){
    var column = 'C'+x;
    var pixlcase =document.createElement('div');
    pixlcase.setAttribute('class', 'pixlcase');
    pixlcase.setAttribute('id',column);
    document.getElementById('fov').appendChild(pixlcase);    
    var pixl = document.createElement('div');    
    var pname = 'p' + x;
    var pheight = findheightold(x,mousex/3);
    var center = 64 - pheight/2-mousey/3;
    if (center<=64){
        pheight=pheight-(64-center);
        center=64;
    }else if(center+pheight>=128){
        pheight=(64-(center-64));
    }if(pheight<=0){
        pheight=0;
    }else if(pheight>=64){
        pheight=64;
    }
        if (wall=='w') {
         pixl.setAttribute('class','pixlW'); 
        }else if(wall=='e'){
            pixl.setAttribute('class','pixlE'); 
        }else if(wall=='s'){
            pixl.setAttribute('class','pixlS'); 
        }else if(wall=='n'){
            pixl.setAttribute('class','pixlN'); 
        }else{
            pixl.setAttribute('class','pixl'); 
        }
    pixl.setAttribute('id',pname);
    pixl.setAttribute('style' , "height:" + pheight.toString() + "rem; top:" + center.toString() + "rem;"  );
    document.getElementById(column).appendChild(pixl);
    document.getElementById('fov').focus();
};
function crosshair(){
    var upline=document.createElement('div');
    upline.setAttribute('class','upline');
    var crossline=document.createElement('div');
    crossline.setAttribute('class','crossline');
    document.getElementById('fov').appendChild(crossline);   
    document.getElementById('fov').appendChild(upline);   
};
function makeframe(mousex,mousey){
    document.getElementById('fov').innerHTML='';
    var y = 1;
    while(y!=65){
        genpix(y,mousex,mousey);
        y=y+1;
    };
    crosshair();

};

document.body.addEventListener('mousemove',function (e) {
    mousex = e.x;
    mousey = e.y- 379;     
    makeframe(mousex,mousey);
});
document.getElementById("fov").addEventListener("keydown",function(e){
    if(e.code=="KeyW"){
        depth=depth+1;
    }else if(e.code=="KeyS"){
        depth=depth-1;
    }else if(e.code=="KeyA"){
        width=width-1;
    }else if(e.code=="KeyD"){
        width=width+1;
    }
    makeframe(mousex,mousey);
});

