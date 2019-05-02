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

//performs the move action, called by move()
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

//gathers the first two selected provinces and calls moveunit()
function move(){
	
    current_instruction = "moves";
      var instruction_1 = new Object();
    instruction_1.region_1 = region[0];
    instruction_1.region_2 = region[1];
    console.log(" object : " + instruction_1.region_1)
    moveunit(region[0],region[1]);

}

//performs the support action, called by support()
function supportunit(id, dest){
    console.log(region[0]+ " "+ current_instruction + " "+ region[1]);
	region= []

}

//gathers the first two selected provinces and calls supportunit()
function support() {
	
	current_instruction = "supports";
    var instruction_1 = new Object();
    instruction_1.region_1 = region[0];
    instruction_1.region_2 = region[1];
    console.log(" object : " + instruction_1.region_1)
    supportunit(region[0],region[1]);

}

//performs the convoy action, called by convoy()
function convoyunit(id1, id2, dest){
    console.log(region[0]+ " "+ current_instruction + " "+ region[1] + " to " + region[2]);
	region= []

}

//gathers the first three selected provinces and calls convoyunit()
function convoy() {
	
    current_instruction = "convoys";
    var instruction_1 = new Object();
    instruction_1.region_1 = region[0];
    instruction_1.region_2 = region[1];
	instruction_1.region_3 = region[2];
    console.log(" object : " + instruction_1.region_1)
    convoyunit(region[0],region[1]);
}

//performs the hold action, called by hold()
function holdunit(id){
	
    console.log(region[0]+ " "+ current_instruction);
	region= []

}

//gathers the first selected provinces and calls holdunit()
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

/* Grabs a valid path from bw_map_updated.svg when click */
function getId(id){
	
    //clicking same region twice in a row removes it from object
	if(region[region.length - 1] == id)
	{
		region.pop()
		console.log("pop - getId(): "+ region);
	}
	else{
		//empties the object if size already 3
		if(region.length == 3)
		{
			region= []
		}
		
		//adds newest clicked province
		region.push(id)    // add province to current instruction
		console.log("getId(): "+ region);
	}

  //  console.log(prv)//refer to the path
  /*  
    } */
   
}

//verifies an item has been clicked and changes province's color
function selected(id){
    alert("selected(): "+ id);
    isSelected = true;
    prv=document.getElementById(id)
	
	//changes to blue when clicked, and hoverOut automatically changes it back to default
    prv.style.fill = "#3399ff"
}
function hoverIn(id){
    prv=document.getElementById(id)
    originalColor = document.getElementById(id).style.fill
    prv.style.fill="#ffffff"
    prv.innerHTML = id;
}

function hoverOut(id) {
    prv=document.getElementById(id)
    if (prv.style.fill !=  "#ea0b8c") {
        prv.style.fill = originalColor
    }
    prv.innerHTML='';
}

