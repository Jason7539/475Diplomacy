const express = require('express')
const app = express();
const http = require('http');
const os = require('os');
const ip = require('ip');
const events = require('events');

var em = new events.EventEmitter();


const port = 3001
const hostIP = ip.address()


let users = [];             // array to hold userNames of clients
let intervalObj;            // Timeout object that polls for user information
let setting;
let adjucation;

// app.get("/", (req, res) => {
//   res.send("got a get");
// })

/**
 * handle post request from clients trying to Join
 * This stores the username and ip of clients trying to join a game
 */
app.post("/", (req, res) => {
  let body = []
  console.log("you posted something");
  req.on("data", (chunk) =>{ // process the username and ip
    body.push(chunk);

  }).on("end", () => {
    let jsonObj = JSON.parse(Buffer.concat(body).toString());  // push it to the array

    let jsonClient = {"username": jsonObj.userName,
                      "IP": jsonObj.clientIP};


    users.push(jsonClient);     // add the username to the list of usernames
    console.log("the users so far are ");
    console.log(users);
    res.end();
  });
  req.on("error", (err)=>{
    console.log("got an error");
  });
});






app.post("/sendSetting", (req, res) => {
  let body = []
  
  req.on("data", (chunk) =>{ 
    body.push(chunk);

  }).on("end", () => {
    let jsonObj = JSON.parse(Buffer.concat(body).toString()); 

    setting = {
      "gameName": jsonObj.gameName,
      "description": jsonObj.description,
      "playerType": jsonObj.playerType,
      "adjucation": jsonObj.adjucation
    };

    let host = {
      "username": jsonObj.username,
      "IP": hostIP
    };

    setAdjucation(jsonObj.adjucation)

    users.push(host);     // add host username to the list of usernames
    console.log("the users so far are ");
    console.log(users);

    console.log("Game setting are: ");
    console.log(setting);

    console.log("\nAdjucation is: ");
    console.log(adjucation);

    res.end();
  });
  req.on("error", (err)=>{
    console.log("got an error");
  });
});



function setAdjucation(adj){
  switch(adj){
    case "15 minutes": adjucation = 15;
      break;
    case "30 minutes": adjucation = 30;
      break;
    case "60 minutes": adjucation = 60;
      break;
    case "120 minutes": adjucation = 120;
      break;
    case "Daily": adjucation = 1440; 
      break;
    default: console.log("Adjucation period not valid");
      break;
  }
}




/**
 * Send images when a response is sent
 */
// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/map.html');
// });
//
// app.use(express.static('./images'))

/**
 * Start the server
 */

/**
 * This function begins the server that listens to post request
 * from clients sending their usernames and ip addresses
 */
function startServer () {
  app.listen(port, hostIP, () =>{
    console.log("connected");
  });
}


/**
 * Function that regularly checks and updates the current list of players
 * and returns the list as a string
 */
function checkClients () {


}

/**
 * Function that starts client polling in an interval every 10 seconds
 */
function startClientPolling () {
  intervalObj = setInterval(print, 10000);      // poll every 10 seconds
}

/**
 * Function that cancels the client poll
 * called when the host cancels the game or starts the game
 */
function stopClientPolling () {
  clearInterval(intervalObj);
}


/*
 * Return the local ip as a string
 * Used in host.html to display ip to join
 */
function display_ip(){
  document.getElementById("ip").write("hello world")
  alert("hello world")
}

/**
 * Function that returns the localip
 * called in host.html and lobby.html to display ip  that
 * clients should join
 */
function getHostIp(){
  return String(hostIP);
}

startServer();

module.exports.getHostIp = getHostIp;
module.exports.serverEvent = em;

// var hosting = http.createServer((request, response) => {
//   const { headers, method, url } = request;
//   let body = [];
//   response.write('<html>');
//   response.write('<body>');
//   response.write('<h1>Hey David</h1>');
//   response.write('</body>');
//   response.write('</html>');
//
//   // responding to a Post request
//   if (method == "POST"){
//     console.log("got a post");
//     request.on("data", (chunk) => {
//       body.push(chunk);
//     }).on('end', () => {
//       jsonObj = JSON.parse(Buffer.concat(body).toString());
//       //console.log(JSON.parse(jsonObj));
//
//       users.push(jsonObj.userName);   // adding client username is list
//       console.log("just added" + jsonObj.userName);
//     });
//   }
//   response.end();
// }).listen(port, hostIP ,()=>{
//   console.log("server started");
// }); // Activates this server, listening on port
// hosting.on("error", (err) => {
//   console.log(err);
// });


//Handle client trying to join
// hosting.close();
// hosting.on("close", () => {
//   console.log("you closed it");
// });
