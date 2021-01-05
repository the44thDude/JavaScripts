var Pframe = 'Pframe';
var noMorePhotos = false;
    function findclass(img){
    if(img.alignment == "L"){
      return "imageL"
    }else{
      return "imageP"
    };
  }
  
    function photoload(frame){
  var startphoto = (frame*4-3);
  var endphoto = startphoto+4;
  var Pframe = "Pframe"+frame;
  while (startphoto!=endphoto){
    var currentP ='p'+startphoto
    var ext = info['p'+startphoto].name;
    var pic = "onlinePhotos/"+ext;
    var Pclass = findclass(info['p'+startphoto]);
    var photo = document.createElement('img');
    photo.setAttribute('class',Pclass);
    photo.setAttribute('src',pic);
    photo.setAttribute('alt',"a picture");
    photo.setAttribute('ID',currentP);
    document.getElementById(Pframe).appendChild(photo);
    startphoto++;
    if (startphoto >= info.totalpics){
      noMorePhotos = true;
    }
  };
};

function buildframes(x){
  Pframe='Pframe'+x
      var frame = document.createElement('div');
      frame.setAttribute('class','pframe');
      frame.setAttribute('ID',Pframe);
      document.getElementById("bg").appendChild(frame);
      var button = document.createElement('div');
      button.setAttribute('class','button');
      button.setAttribute('ID','button');
      button.innerHTML='load more';
      document.getElementById("bg").appendChild(button);
      document.getElementById('button').addEventListener("click",function(){
        if (noMorePhotos == true){
          document.getElementById('button').innerHTML='no more photos';

        }else{
          document.getElementById('button').remove();
          x++;
          buildframes(x);
          }
      });
        
        photoload(x);
      return x+1;

}
buildframes(1);
