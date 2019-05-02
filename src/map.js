const fs = require("fs")
//const db = require("./db_interactions/db_test.js")

instruction = {};    // Json object that holds instructions to send to host
index = 0;           // keep the count of the number of instuctiosn
current_instruction = [];
instruction_position = 0;     // keep the count of the position of the instruction (A-Moscow-Russia/move)
total_instructions = "";     // PLEASE ADD THIS 
var originalColor;
country = ""


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

    //show instruction on the screen
    total_instructions +=  current_instruction[index] + "<br/>";
    document.getElementById("currentInstructions").innerHTML = total_instructions;

    index++;
    alert("submitted: "  + current_instruction);
  }
}

function endTurn() {

//======================================================= PLEASE ADD THIS
total_instructions="";
document.getElementById("currentInstructions").innerHTML = total_instructions;


// submit the current instruction to the database
  // db.testAdd(country, current_instruction);
  // alert("instuctions submitted to db")
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

      country = fs.readFileSync('country.txt');
      alert("your country is " + country)

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
      current_instruction.push(unitStr);
      // if the unit is still null there is no unit on that province //
      unitId = unit.id

      instruction_position++
    }
    else if(instruction_position == 2){
      // selecting the province to move the unit to
      current_instruction[index] += "/"+id
      instruction_position = 0
      
      alert("submitted: "  + current_instruction);

      //show instruction on the screen
      total_instructions +=  current_instruction[index] + "<br/>";
      document.getElementById("currentInstructions").innerHTML = total_instructions;

      index++;
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
