const http = require("http");

//const server = require("./server.js");
// const host = require("./server.js")

// const ip = "localhost";
// console.log(ip);
// 192.168.1.22
// const options = {
//   hostname: ip,
//   port: 3001,
//   path: '/',
// };

// http.get(options, (res) => {
//   res.on("data", function(chunk) {
//     console.log("BODY: " + chunk);
//   });
//   res.on("error", (err) => {
//     console.log(err);
//   });
// }).on("error", (err) =>{
//   console.log("error");
// });
//
// //send info to the server
function sendUser(ip, userName, clientIP, obj){
    var post = http.request({
    hostname: ip,
    port: 3001,
    path: '/',
    method: 'POST',
    'content-type': 'text/plain'
  }, (res) => {console.log(res.statusCode);
  }).on("Error", (err) => {
    console.log(err);
  });

  post.write(JSON.stringify(obj));
  post.end();
}


function sendParam(id, src, target, clientIP){
  var post = http.request({
  hostname: clientIP,
  port: 3001,
  path: '/sendParam',
  method: 'POST',
  'content-type': 'text/plain'
}, (res) => {console.log(res.statusCode);
}).on("Error", (err) => {
  console.log(err);
});


post.write(JSON.stringify(obj));
post.end();
}





module.exports.sendUser = sendUser;
