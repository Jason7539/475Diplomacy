const express = require('express')
const app = express();
const http = require('http');
const os = require('os');
const ip = require('ip');
const events = require('events');
const electron = require('electron');
const {ipcRenderer} = electron;

var em = new events.EventEmitter();
gameStatus = false;

const port = 3001;
const hostIP = ip.address();
pollFlag = false;
serverFlag = false;

let users = [];             // array to hold userNames of clients
let intervalObj;            // Timeout object that polls for user information
let serverObj;              // used to close http server

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
 * Respond to get user request for lobby.html
 */
app.get('/lobby', function(req, res){
  // get username of current users
  var names = []
  for (var item in users){
    names.push(users[item].username)
  }
  res.send(names);
});


/**
 * Create html to show the game start status
 */
app.get('/gameStart', function(req, res){
  // get username of current users
  if (gameStatus == false){
    res.send("False");
  }
  else{
    res.send("True");
  }
});


/**
 * This function begins the server that listens to post request
 * from clients sending their usernames and ip addresses
 */
function startServer () {
  serverObj = app.listen(port, hostIP, () =>{
    console.log("connected----------------------------");
  });
}


/**
 * Function that regularly checks and updates the current list of players
 *
 */
function updateUsers () {
  if(serverFlag == false){
    serverFlag = true;
    intervalObj = setInterval(updateUsers, 5000);

  }
  ipcRenderer.send("StartChecking");
}

/**
 * Function that starts client polling in an interval every 10 seconds
 * and returns the list as a string
 */
function startClientPolling () {

  if(pollFlag == false){
    //intervalObj = setInterval(startClientPolling, 1500);      // poll every 10 seconds
    console.log("server flag is false");
    startServer();        // start server to handle client's post

    pollFlag = true;
  }
  else{
    var names = [];

    console.log("*************")
    for (var item in users){
      names.push(users[item].username)
    }
    console.log("the names is " + names)
    return names.join(" - ");
    // mains will update lobby.html

  //  em.emit("PollUsers", names.join(" - "));     // notify main to update lobby.html
  }

}

/**
 * Function that cancels the client poll
 * called when the host cancels the game or starts the game
 * open the game map in from main.js
 * and change the contents of /getlobby
 */
function stopClientPolling () {
  gameStatus = true;    // change gamestatus to tell clients to switch to map.html
  alert("the game status = " + gameStatus);
  clearInterval(intervalObj);     // close the repeated queue for clients
  //serverObj.close(); closes the http server
}


/*
 * Return the local ip as a string
 * Used in host.html to display ip to join
 */
function display_ip(){
  document.getElementById("ip").write("hello world")
  alert("hello world")
}

/*
 * tell clients that game started ,so they can switch to
 * the game screen
 *
 */
function changeGameStatus(){
  gameStatus = true;
  return gameStatus;
}


/**
 * Function that returns the localip
 * called in host.html and lobby.html to display ip  that
 * clients should join
 */
function getHostIp(){
  return String(hostIP);
}

module.exports.stopClientPolling = stopClientPolling;
module.exports.startServer = startServer;
module.exports.getHostIp = getHostIp;
module.exports.serverEvent = em;
module.exports.startClientPolling = startClientPolling;
module.exports.updateUsers = updateUsers;
module.exports.changeGameStatus = changeGameStatus;
