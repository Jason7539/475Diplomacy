const http = require("http");

/**
 * This function sends the client username to the host.
 * should be called from join.html.
 */
function sendUser(ip, userName, obj){
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

  })
  post.on("Error", (err) => {
    console.log(err);
  });

  post.write(JSON.stringify(obj));
  post.end();
}


module.exports.sendUser = sendUser;
