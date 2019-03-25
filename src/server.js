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

/**
 * Send images when a response is sent
 */
// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/map.html');
// });
//
// app.use(express.static('./images'))


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
  var names = []

  console.log("*************")
  for (var item in users){
    names.push(users[item].username)
  }
  console.log(names.join(" - "));
  // call main and pass usernames
  // mains will update lobby.html

  return names.join(" - ");
}

/**
 * Function that starts client polling in an interval every 10 seconds
 */
function startClientPolling () {
  intervalObj = setInterval(checkClients, 1500);      // poll every 10 seconds
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

// startServer();
// startClientPolling();
module.exports.getHostIp = getHostIp;
module.exports.serverEvent = em;
module.exports.checkClients = checkClients;
