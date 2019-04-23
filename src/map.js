
instruction = {}    // Json object that holds instructions to send to host
index = 0           // index for instructions
var originalColor 
var isSelected = false;

current_instruction = []

function move(){

    current_instruction.push("move");
    // alert("click country to move to")
    // D = document.getElementById("E")
    // doc = D.getSVGDocument()
    // country = doc.getElementById(id)
    // country.style.fill = "#000000"
    moveunit(current_instruction[0],current_instruction[1]);
}

function moveunit(id, dest){
    D = document.getElementById("E")
  /*  doc = D.getSVGDocument()
    troop = doc.getElementById(id)

    alert(troop.getAttribute("cx"))
    target = doc.getElementById(dest) */
   // alert(target)

   // targetX = target.getAttribute("cx")
    //troop.setAttribute("cx", targetX)
    console.log(current_instruction);

    // store into the database 
}

function suportunit(id, dest){
    console.log(current_instruction);

}

function support() {
    alert("click country to support")
    current_instruction.push("support");
    console.log(current_instruction);

}

function convoy() {
    alert("Select army to convoy")
}

function hold() {
    alert("Selected country will hold")
    current.push("hold")
}

/* for chat display */
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

/**
 * Grabs a valid path from bw_map_updated.svg when click.
 */
function getId(id){
    alert(id)
    current_instruction.push(id)    // add province to current instruction

  //  console.log(prv)//refer to the path
  /*  
    } */
   console.log("here(): "+ current_instruction);
}

function selected(id){
    alert("selected(): "+ id);
    isSelected = true;
    prv=document.getElementById(id)
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
    prv.innerHTML = id;
  /*  prv.addClass('active');
    $description.html($(this).attr('id'));
    console.log(prv.innerHTML);   */

}

function hoverOut(id) {
    prv=document.getElementById(id)
    if (prv.style.fill !=  "#ea0b8c") {
        prv.style.fill = originalColor
    }
    prv.innerHTML='';
}

