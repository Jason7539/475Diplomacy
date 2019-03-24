const express = require('express')
const app = express()
const http = require('http')
const os = require('os');
const ip = require('ip')

const port = 3001
const hostIP = ip.address()


let users = [];             // array to hold userNames of clients

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
 * Start the server
 */

app.listen(port, hostIP, () =>{
  console.log("connected");
});


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

module.exports.getHostIp = getHostIp;

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
