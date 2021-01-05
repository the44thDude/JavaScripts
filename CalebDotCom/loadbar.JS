var menubox = document.createElement('nav');
menubox.setAttribute ('class','menubox');
document.body.appendChild(menubox);

const pages = [
    {
        name: "Personality",
        link: "index.html"
    },{
        name:"Poetry",
        link:"poetrypage.html"
    },{
        name:"Photography",
        link:"photopage.html"
    },{
        name:"Projects",
        link:"codepage.html"
    }
]

for (var i in pages){
    var mainpageB = document.createElement('a');
    mainpageB.setAttribute('href',pages[i].link);
    mainpageB.innerHTML = pages[i].name;
    if(window.location.href.endsWith(pages[i].link)){
        mainpageB.setAttribute('class','activemenu');
    }else{
        mainpageB.setAttribute('class','menu');
    }
    menubox.appendChild(mainpageB);
};


