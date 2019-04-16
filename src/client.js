const http = require("http");
const electron = require('electron');
const {ipcRenderer} = electron;
const events = require('events');

var em = new events.EventEmitter();

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
  }, (res) => {   // add event listener to response event
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
  post.write(JSON.stringify(obj));
  post.end();

}


module.exports.clientEvent = em;
module.exports.sendUser = sendUser;
