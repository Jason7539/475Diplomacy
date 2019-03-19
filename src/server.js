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

app.post("/", (req, res) => {
  let body = []
  console.log("you posted something");
  req.on("data", (chunk) =>{ // process the username and
    body.push(chunk);

  }).on("end", () => {
    let jsonObj = JSON.parse(Buffer.concat(body).toString());

    users.push(jsonObj.userName);     // add the username to the list of usernames
    console.log("the users so far are ");
    console.log(users);
  })
});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/map.html');
});

app.use(express.static('./images'))

app.listen(port, hostIP, () =>{
  console.log("connected");
});


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
