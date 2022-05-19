const https =require('https')
const url = 'https://ov97vty5wi.execute-api.us-east-1.amazonaws.com'
https.get(url, (res)=>{
    message = res;
    console.log(message);
});