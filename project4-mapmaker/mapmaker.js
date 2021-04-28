
const color=[];
color[0]=0;
color[1]=0;
color[2]=0;
const written=[];
var t = 0;
var mousedown;
var lastmarkx = null;
var lastmarky = null;
var shift;
var c = document.getElementById("C1");
c.width  = window.innerWidth;
c.height = window.innerHeight;

class linearray{
    constructor(xcords,ycords){
        this.xcords=xcords;
        this.ycords=yords;
    }
}

function mark(x,y){
    var c = document.getElementById("C1");
    var ctx = c.getContext('2d');
    var ptx = ctx.getImageData(x,y,1,1);
        ptx.data[0]=color[0];
        ptx.data[1]=color[1];
        ptx.data[2]=color[2];
        ptx.data[3]=255;
        ctx.putImageData(ptx,x,y);
}
function line(px,py,x,y){
    var c = document.getElementById("C1");
    var ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(px,py);
    ctx.lineTo(x,y);
    ctx.stroke();
    let markedpoints= new linearray(x,y);
    while(px!=x){
        var pystart =py;
        while(py!=y){
            if(ctx.isPointInPath(px, py)){
                markedpoints.xcords=markedpoints.xcords+px;
            }
            if(py<y){
                py=py+1;
            }else{
                py=py-1;
            }
        }
        py=pystart;
        if(px<x){
            px=px+1;
        }else{
            px=px-1;
        }
    }
    ctx.closePath();
}
function toolact(x,y,tool){
    if (tool=='draw'){
        draw(x,y);
    }
}
 function draw(x,y){
    mark(x,y);
    if (lastmarkx!=null){
        line(lastmarkx,lastmarky,x,y);
    }
    lastmarkx=x;
    lastmarky=y;
 }
document.getElementById("C1").addEventListener('mousedown',function(e){
    mousedown=true;
    var mousex = e.x;
    var mousey = e.y;
    toolact(mousex,mousey,'draw');
})
document.getElementById("C1").addEventListener('mouseup',function(e){
    mousedown=false;
    if(shift!=true){
    lastmarkx=null;
    lastmarky=null;
    }
})
document.getElementById("C1").addEventListener('mousemove',function (e) {
   if(mousedown==true){
    var mousex = e.x;
    var mousey = e.y;
    toolact(mousex,mousey,'draw');
   }
});
