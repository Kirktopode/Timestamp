var express = require('express');
var app = express();

var time ={
  unix: null,
  natural: null
};

function formatDateString(dateString){
  var strRay = dateString.slice(dateString.indexOf(" ") + 1).split(" ");
  var str = "";
  for(var i = 0; i < strRay.length; i++){
    switch(i){
      case 0:
          if(strRay[i] == "Jan"){
            strRay[i] = "January";
          }else if(strRay[i] == "Feb"){
            strRay[i] = "February";
          }else if(strRay[i] == "Mar"){
            strRay[i] = "March";
          }else if(strRay[i] == "Apr"){
            strRay[i] = "April";
          }else if(strRay[i] == "May"){
            //do a dance
          }else if(strRay[i] == "Jun"){
            strRay[i] = "June";
          }else if(strRay[i] == "Jul"){
            strRay[i] = "July";
          }else if(strRay[i] == "Aug"){
            strRay[i] = "August";
          }else if(strRay[i] == "Sep"){
            strRay[i] = "September";
          }else if(strRay[i] == "Oct"){
            strRay[i] = "October";
          }else if(strRay[i] == "Nov"){
            strRay[i] = "November";
          }else if(strRay[i] == "Dec"){
            strRay[i] = "December";
          }
        str += strRay[i] + " ";
        break;
      case 1:
        str += strRay[i] + ", ";
        break;
      case 2:
        str+= strRay[i];
        break;
            }
  }
  return str;
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("*", function(request, response){
  response.writeHead(200, "application/json; charset=utf-8");

  var t = request.url.slice(1).replace(/%20/g," ");
  if( !isNaN(Number(t)) ){
    t = Number(t) * 1000;
  }
  var tdate = new Date(t);
  if(tdate.toDateString().toLowerCase() != "invalid date"){
    time.unix = tdate.getTime() / 1000;
    time.natural = formatDateString(tdate.toDateString());
  }

  response.end(JSON.stringify(time));
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
