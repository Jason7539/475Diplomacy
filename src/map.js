const fs = require("fs")
//const db = require("./db_interactions/db_test.js")
const http = require("http")
var hostIp = "";


index = 0;           // keep the count of the number of instuctiosn
current_instruction = [];
instruction_position = 0;     // keep the count of the position of the instruction (A-Moscow-Russia/move)
var originalColor;
country = ""
let intervalObj;
total_instructions = "";     // String to display current orders in map.html




function peruse(id){
  D=document.getElementById("E")
  SVGDoc=D.getSVGDocument()
  who=SVGDoc.getElementById(id)
  who.style.fill = "#3399ff"
  whoName=who.id
  current_instruction.push(String(who.id));
  alert(whoName)
}

// push the move command after the unit has been selected
function move(){
  if(instruction_position == 1){
    current_instruction[index] += "/move"
    instruction_position++
  }
}

function moveunit(id, dest){
    D = document.getElementById("E")
    doc = D.getSVGDocument()
    troop = doc.getElementById(id)

    alert(troop.getAttribute("cx"))


    target = doc.getElementById(dest)
    alert(target)

    targetX = target.getAttribute("cx")
    troop.setAttribute("cx", targetX)
    // moving
}

function support() {
  if(instruction_position == 1){
    current_instruction[index] += "/support"
    instruction_position++
  }
}

function convoy() {
    alert(current_instruction)
    // test to move the unit in moscow to ukraine


    // D=document.getElementById("E")
    // doc=D.getSVGDocument()
    // unit = doc.getElementById("A-Moscow-Russia");
    //
    // alert("the unit is " + unit.id)
    //
    // // moving to province
    // prov = doc.getElementById("C Ukraine");
    // targetx = prov.getAttribute("cx");
    // targety = prov.getAttribute("cy");
    // alert("the x ,y is " + targetx + " " + targety)
    //
    // // moving the unit
    // unit.setAttribute("cx", targetx);
    // unit.setAttribute("cy", targety);
}


function hold() {
  if(instruction_position == 1){
    current_instruction[index] += "/hold"
    instruction_position = 0;

    // show instruction on map.html
    total_instructions += current_instruction[index] + "<br/>";
    document.getElementById("currentInstructions").innerHTML = total_instructions;

    index++;
    alert("submitted: "  + current_instruction);
  }
}

function endTurn() {
  alert("submitted: " + current_instruction)
  total_instructions="";
  document.getElementById("currentInstructions").innerHTML = total_instructions;

  // send information to host
  hostIp = fs.readFileSync('hostIp.txt', "utf8");

  clientCountry = fs.readFileSync('country.txt', "utf8");

  // send the current instruction to host
  var post = http.request({
      hostname: hostIp,
      port: 3001,
      path: '/instructionPost',
      method: 'POST',
      'content-type': 'text/plain'
    }, (res) => {
      console.log("got a response");
    })

  post.on("Error", (err) =>{
    console.log(err);
  })

  jsonObj = {country: clientCountry,
             instructions: current_instruction.toString()}

  post.write(JSON.stringify(jsonObj));

  // pollResolve();
  intervalObj = setInterval(pollResolve, 2000);
  // reset instructions after posting
  current_instruction = []
  instruction_position = 0
  index = 0;

  post.end();
  // begin polling for resolve orders
}


function pollResolve(){
  // ready the host server
  console.log("polling for resolve");
  var get = http.get({
  hostname: hostIp,
  port: 3001,
  path: '/resolveOrders',
  'content-type': 'text/plain'
  }, (res) => {
    body = []
    res.on("data", (chunk) => {
      body.push(chunk);
    }).on("end", ()=>{

      if(body[0] == "not ready"){
        console.log("resolve not ready");
        get.end();
        return;
      }
      else{
        // Begin executing orders that have been resolved
        // alert(body)
        body = JSON.parse(body)
        for(i in body){
          // execute all orders sent from host
          // alert("the instructs are " + body[i])
          execute(body[i])
        }
      }
    })
  })

  get.end();

}

function execute(instruction){
  D = document.getElementById("E")
  doc = D.getSVGDocument()

  order = instruction.split("/")
  alert("trying to move " + order)
  troop = doc.getElementById(order[0].toString())

  dest = "C " + order[2]
  target = doc.getElementById(dest)

  targetX = target.getAttribute("cx")
  targetY = target.getAttribute("cy")


  // test if troop is an army or fleet
  if(troop.getAttribute("cx") == null){
    troop.setAttribute("x", targetX)
    troop.setAttribute("y", targetY)
  }
  else{
    troop.setAttribute("cx", targetX)
    troop.setAttribute("cy", targetY)
  }

  // changing id of unit
  troopid = troop.id.toString().split("-")
  newTroopid = troopid[0] + "-" + order[2] + "-" + troopid[2]

  troop.setAttribute("id", newTroopid)
}


/* for chat display */
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

/**
 * Grabs a province or unit to be push on the instructions array
 */
function Here(id){
    // grab the province that was clicked
    D=document.getElementById("E")
    SVGDoc=D.getSVGDocument()

    // grab the unit if this is the first click
    if(instruction_position == 0){
      // we need to grab the owner of the country

      country = fs.readFileSync('country.txt', "utf8");

      // then append it at the end of unitStr
      // grab the Army unit
      unitStr = "A-" + String(id) + "-" + country
      unit = SVGDoc.getElementById(unitStr);
      // if Army unit does not exist grab the fleet
      if(unit == null){
        unitStr = "F-" + String(id) + "-" + country
        unit = SVGDoc.getElementById(unitStr);
      }
      // if the unit is still null there is no troop in the province
      if(unit == null){
        alert("no unit selected")
        return;
      }

      alert("selected: " + unitStr)
      current_instruction.push(unitStr);
      // if the unit is still null there is no unit on that province //
      unitId = unit.id

      instruction_position++
    }
    else if(instruction_position == 2){
      // selecting the province to move the unit to
      current_instruction[index] += "/"+id
      instruction_position = 0

      //show instruction on the screen
      total_instructions +=  current_instruction[index] + "<br/>";
      document.getElementById("currentInstructions").innerHTML = total_instructions;

      index++;
      alert("submitted: "  + current_instruction);
    }


    // change color of province
    if(prv.style.fill === "rgb(234, 11, 140)"){
    prv.style.fill = "#3399ff"
    }
    else{
    prv.style.fill = "#ea0b8c"
    }
}

function hoverIn(id){
    prv=document.getElementById(id)
    originalColor = document.getElementById(id).style.fill
    prv.style.fill="#000000"
}

function hoverOut(id) {
    prv=document.getElementById(id)
    if (prv.style.fill !=  "#ea0b8c") {
        prv.style.fill = originalColor
    }
}
