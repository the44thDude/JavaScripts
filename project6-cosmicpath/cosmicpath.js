const UnitNames = ["one","two", "three", "four","five","six", "seven","eight","nine"]
const TeenNames = ["ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"]
const DeciNames = ["twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"]
const CommaNames = ["thousand","million","billion","trillion","quadrillion","quintillion","sextillion","septillion","octillion","nonillion"]


function namenum(x){
    x=x.toString();
    var y= x.length-1
    var name =''
    while (y>=0){
        var digit = x[y]
        if (digit!="0"){
            if ((x.length-(y+1))%3==0 && (x.length-(y+1))!=0){

                var c = ((x.length-(y+1))/3)-1
                name = CommaNames[c]+" " + name
                name = UnitNames[Number(digit)-1]+" " + name
            }else if ((x.length-y)%3==0){
                if(x.length-y==3){
                    if(x.length!=3){
                    name = "and " + name
                    }
                }
                name = "hundred "+ name;
                name = UnitNames[Number(digit)-1]+" " + name
            }else if ((1+x.length-y)%3==0){
                if (digit=="1"){
                    name= TeenNames[Number(x[y+1])]+" "+name;
                }else{
                    name= DeciNames[Number(digit)-2]+" "+name;
                }
            }else{
                if(y!=0){
                    if(x[y-1]!="1"){
                        name=UnitNames[Number(digit)-1]+name
                    }
                }else{
                    name=UnitNames[Number(digit)-1]+name 
                }
            }
        }
        y=y-1;
    }
return name
}

function Cosmicpath(x){
    var output = namenum(x);
    var line = output;
    var NameNoSpace = namenum(x).replace(/ /g,'');
    y=NameNoSpace.length
    while(output!= "four"){
        output = namenum(y);
       line = line +" is "+output+", "+output
       NameNoSpace = output.replace(/ /g,'');
       y=NameNoSpace.length     
    }
    line=line+" is four which makes it Cosmic"
    return line
}

console.log(Cosmicpath(100000000))
