const http = require("http");
const electron = require('electron');
const {ipcRenderer} = electron;
const events = require('events');

var em = new events.EventEmitter();

let hostIP = 0;             // hold host IP. value is updated sendUser function
let intervalObj;            // Timeout object that polls for user information
var names = [];             // hold the current list of user. to be displayed in lobby
gameStatus = "false";
let intervalFlag = false;
name = "";                  // holds name of each player
country = "";               // what country the player is in charge of

/**
 * This function sends the client username to the host.
 * should be called from join.html.
 * it also stores client username and host ip
 */
function sendUser(ip, userName, clientIP, obj){
    var post = http.request({
    hostname: ip,
    port: 3001,
    path: '/',
    method: 'POST',
    'content-type': 'text/plain'
  }, (res) => {     // add event listener to response event
    // if the response is successful switch to the lobby.html
    console.log("you got a response")
    console.log(res.statusCode);

    // tell main to siwtch to lobby.html when the response succeeds
    if(res.statusCode == 200){
      em.emit("SwitchToLobby");
    }
  })
  post.on("Error", (err) => {
    console.log(err);
  });
  hostIP = ip;
  name = userName;
  console.log("ip is now " + hostIP);
  post.write(JSON.stringify(obj));
  post.end();
}

/**
 * This function asks the server for the current list of connected users
 * and displays them.
 */
function requestUsers(){
  var post = http.get({
  hostname: hostIP,
  port: 3001,
  path: '/lobby',
  'content-type': 'text/plain'
  }, (res) => {
    names = []
    res.on("data", (chunk) => {
      names.push(chunk);
    }).on("end", ()=>{
      let jsonObj = JSON.parse(names);
      names = jsonObj;
    })
  })

  return names;
}

/**
 * open game map when game status is true
 * from the server
 */
 function pollGameStatus(){
   var post = http.get({
   hostname: hostIP,
   port: 3001,
   path: '/gameStart',
   'content-type': 'text/plain'
   }, (res) => {
     status = []
     res.on("data", (chunk) => {
       status.push(chunk);
     }).on("end", ()=>{
       // gameStatus = status.toString();
       gameStatus = status;
     })
   })

   return gameStatus;
 }

/**
 * calls main to ask for usernames from host
 */
function updateUsers(){
  ipcRenderer.send("updateClientLobby");    // send message to main to poll for users
  if(intervalFlag == false){
    intervalObj = setInterval(updateUsers, 1000); // repeat polling every 5 seconds
    intervalFlag = true;
  }
}

/*
 * Return the username of the client
 */
function getName(){
  return name;
}

/*
 * Update the country of the user
 */
function setCountry(newCountry){
  country = newCountry;
}

/*
 * returns the clients country
 */
function getCountry(){
  return country;
}





module.exports.hostIP = hostIP;
module.exports.requestUsers = requestUsers;
module.exports.clientEvent = em;
module.exports.sendUser = sendUser;
module.exports.updateUsers = updateUsers;
module.exports.pollGameStatus= pollGameStatus
module.exports.getName = getName;
module.exports.setCountry = setCountry;
module.exports.getCountry = getCountry;
