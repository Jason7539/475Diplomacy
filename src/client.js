const http = require("http");
const electron = require('electron');
const {ipcRenderer} = electron;
const events = require('events');

var em = new events.EventEmitter();
var orders = []

const ip = '104.237.158.50'
const port = 3001

/**
 * This function sends the client username to the host.
 * should be called from join.html.
 */
function sendUser(hip, userName, clientIP, obj){
    var post = http.request({
    hostname: ip,
    port: port,
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

function addOrders(orders){
	//Convert the list of orders into a JSON string
	payload = JSON.stringify(orders)
	
	options = {
		host: ip,
		port: port,
		method: 'POST',
		path: '/addOrders',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(payload)
		}
	}
	
	const req = http.request(options, 
		(res) => {
			console.log("Sent")
		})
	req.write(payload)
	req.end()
}

module.exports.clientEvent = em
module.exports.sendUser = sendUser
module.exports.addOrders = addOrders
//require this file so we can use this list
module.exports = orders
