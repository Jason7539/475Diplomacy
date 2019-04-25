// Json object that holds instructions to send to host
var instruction = {
    region_1: '',
    region_2: '',
    current_instruction: ''
}    

index = 0           // index for instructions
var originalColor 
var isSelected = false;

region = [];
var current_instruction;

function move(){

   // current_instruction.push("move");
    // alert("click country to move to")
    // D = document.getElementById("E")
    // doc = D.getSVGDocument()
    // country = doc.getElementById(id)
    // country.style.fill = "#000000"
    current_instruction = "moves";
      var instruction_1 = new Object();
    instruction_1.region_1 = region[0];
    instruction_1.region_2 = region[1];
    console.log(" object : " + instruction_1.region_1)
    moveunit(region[0],region[1]);

}

function moveunit(id, dest){
    //D = document.getElementById("E")
  /*  doc = D.getSVGDocument()
    troop = doc.getElementById(id)

    alert(troop.getAttribute("cx"))
    target = doc.getElementById(dest) */
   // alert(target)

   // targetX = target.getAttribute("cx")
    //troop.setAttribute("cx", targetX)
    console.log(region[0]+ " "+ current_instruction + " "+ region[1]);
	region= []

    // store into the database 

}

function supportunit(id, dest){
    console.log(region[0]+ " "+ current_instruction + " "+ region[1]);
	region= []

}

function support() {
    /*alert("click country to support")
    current_instruction = "supports";
    console.log(region);*/
	current_instruction = "supports";
    var instruction_1 = new Object();
    instruction_1.region_1 = region[0];
    instruction_1.region_2 = region[1];
    console.log(" object : " + instruction_1.region_1)
    supportunit(region[0],region[1]);

}

function convoyunit(id1, id2, dest){
    console.log(region[0]+ " "+ current_instruction + " "+ region[1] + " to " + region[2]);
	region= []

}

function convoy() {
    current_instruction = "convoys";
    var instruction_1 = new Object();
    instruction_1.region_1 = region[0];
    instruction_1.region_2 = region[1];
	instruction_1.region_3 = region[2];
    console.log(" object : " + instruction_1.region_1)
    convoyunit(region[0],region[1]);
}

function holdunit(id){
    console.log(region[0]+ " "+ current_instruction);
	region= []

}

function hold() {
    current_instruction = "holds";
    var instruction_1 = new Object();
    instruction_1.region_1 = region[0];
    console.log(" object : " + instruction_1.region_1)
    holdunit(region[0]);
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
  
    if(region.length == 3)
    {
        region= []
    }
    region.push(id)    // add province to current instruction

  //  console.log(prv)//refer to the path
  /*  
    } */
   console.log("here(): "+ region);
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
 

}

function hoverOut(id) {
    prv=document.getElementById(id)
    if (prv.style.fill !=  "#ea0b8c") {
        prv.style.fill = originalColor
    }
    prv.innerHTML='';
}

