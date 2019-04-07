const http = require("http");
const electron = require('electron');
const {ipcRenderer} = electron;
const events = require('events');

var em = new events.EventEmitter();

let hostIP = 0;             // hold host IP. value is updated sendUser function
let intervalObj;            // Timeout object that polls for user information
var names = [];             // hold the current list of user

let intervalFlag = false;

/**
 * This function sends the client username to the host.
 * should be called from join.html.
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
    let body = []
    res.on("data", (chunk) => {
      body.push(chunk);
    }).on("end", () => {
      names = []
      for (var item in body){
        names.push(body[item]);
      }
    })
  })
  console.log("we are trying to return " + names);
  return names;
}

/**
 * calls main to ask for usernames from host
 */
function updateUsers(){
  ipcRenderer.send("updateClientLobby");    // send message to main to poll for users
  if(intervalFlag == false){
    intervalObj = setInterval(updateUsers, 5000); // repeat polling every 5 seconds
    intervalFlag = true;
  }
}

module.exports.requestUsers = requestUsers;
module.exports.clientEvent = em;
module.exports.sendUser = sendUser;
module.exports.updateUsers = updateUsers;
