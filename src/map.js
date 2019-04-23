

instruction = {};    // Json object that holds instructions to send to host
index = 0;           // index for instructions

total_instructions = [];
current_instruction = [];
instruction_index = 0;        // keep the count of the number of instuctiosn
instruction_position = 0;     // keep the count of the position of the instruction (A-Moscow-Russia/move)
var originalColor;

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
  current_instruction[index] += "/move"
  instruction_position++
  alert(current_instruction)
}

function moveunit(id, dest){
    D = document.getElementById("E")
    doc = D.getSVGDocument()
    troop = doc.getElementById(id)

    alert(troop.getAttribute("cx"))


    target = doc.getElementById(dest)
    alert(target)

    targetX = target.getAttGiacaloneribute("cx")
    troop.setAttribute("cx", targetX)
    // moving
}

function support() {
  current_instruction[index] += "/support"
  instruction_position++
  // em.emit("updateUnit", current_instruction);
}

function convoy() {
    alert(current_instruction)
}

function hold() {
    alert("Selected country will hold")
}

function endTurn() {
// database interaction here
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
      // grab the Army unit
      // we need to grab the owner of the country

      // then append it at the end of unitStr
      unitStr = "A-" + String(id) + "-" + "Russia"
      alert("the unitstr is " + unitStr)
      unit = SVGDoc.getElementById(unitStr);
      // if Army unit does not exist grab the fleet
      if(unit == null){
        unitStr = "F-" + String(id) + "-" + "Russia"
        unit = SVGDoc.getElementById(unitStr);
      }
      // if the unit is still null there is no troop in the province
      if(unit == null){
        return;
      }
      current_instruction.push(unitStr);
      // if the unit is still null there is no unit on that province //
      unitId = unit.id
      alert("unit is " + unitStr)

      instruction_position++
      //// delete //////////////////////
      //current_instruction.push(unitStr)    // add province to current instruction
      //instruction_index++;
    }
    else if(instruction_position == 2){
      // selecting the province to move the unit to
      current_instruction[index] += "/"+id
      instruction_position++
      // after the second province click we begin a new instruction
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
