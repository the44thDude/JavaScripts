const page = document.querySelector('.page');
      var b = 1
      function namefind(x){
        if(x==1){
          return 'A Greeting to The Pilgrim';
        }else if(x==2){
          return 'A World of Sin';
        }else if(x==3){
          return 'Always on Target';
        }else if(x==4){
          return "Do as We are Told";
        }else if(x==5){
          return "Each Second Counts";
        }else if(x==6){
          return "End";
        }else if (x==7){
          return "Fighting Sin";
        }else if (x==8){
          return "Freedom is Strange";
        }else if (x==9){
          return "Hardship";
        }else if(x==10){
          return "His.";
        }else if(x==11){
          return "Lies.";
        }else if(x==12){
          return "Look to The Unicorn";
        }else if(x==13){
          return "Never Fails";
        }else if(x==14){
          return "On a Quiet Path";
        }else if(x==15){
          return "Rain";
        }else if(x==16){
          return "Resistance";
        }else if(x==17){
          return "Resolutions"
        }else if (x==18){
          return "September Nights";
        }else if(x==19){
          return "Sounds in the Dark";
        }else if(x==20){
          return "The False Snake";
        }else if(x==21){
          return "The Hole Inside";
        }else if(x==22){
          return "The Speed of Life";
        }else if(x==23){
          return "The View from Here";
        }else if(x==24){
          return "The Weight of Waiting"
        }else if(x==25){
          return "Without God"
        }
      }

      while (b<25) {
        let x = b;
        var poem = 'poems/p'+x+'.htm'
        var id = "button"+b
        var pid = "poem"+b
        Pname = namefind(b)
        var button = document.createElement('div');
        button.setAttribute('class','poembutton');
        button.setAttribute('ID',id);
        button.setAttribute('onClick','poetry('+x.toString()+');');
        document.getElementById("txt").appendChild(button);
        var words = document.createElement('p');
        words.setAttribute('class','B');
        if (Pname.length<18){
          words.setAttribute('class','Bb');
        };
        words.innerHTML =Pname
        document.getElementById(id).appendChild(words)
        var Poem = document.createElement("iframe");
          Poem.setAttribute('ID',pid);
          Poem.setAttribute('class','poemclose');
          Poem.setAttribute('src',poem);
          Poem.setAttribute('scrolling','no');
          document.getElementById(id).appendChild(Poem);
        b++;
      };

      function poetry(x){
          let id = "buttton"+x
          var pid = "poem"+x;
          var poem = document.getElementById(pid);
          if(poem.className=='poemopen'){
            poem.setAttribute('class','poemclose');
            poem.style.height='0px';
          }else{
            poem.setAttribute('class','poemopen');
            poem.style.height=poem.contentWindow.document.documentElement.scrollHeight + 'px';
          }


      };