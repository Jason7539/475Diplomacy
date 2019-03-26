/*let countries = {
		c1: "c1",
		c2: "c2"
}*/

function move(id){
	alert(id)
	//alert(countries.c1)
    alert("click country to move to")
	
    D = document.getElementById("E")
    doc = D.getSVGDocument()
    country = doc.getElementById(id)
    country.style.fill = "#000000"
	
}

/*function moveunit(id, dest){
    D = document.getElementById("ukraine")
    doc = D.getSVGDocument()
    troop = doc.getElementById("russia")

    alert(troop.getAttribute("cx"))


    target = doc.getElementById(dest)
    alert(target)

    targetX = target.getAttribute("cx")
    troop.setAttribute("cx", targetX)

    // moving
}*/

function support() {
    alert("click country to support")
}

function convoy() {
    alert("Select army to convoy")
}

function hold() {
    alert("Selected country will hold")
}

/** Open and close chat display */
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

/** Return function id & change color of clicked province */
function Here(id){
    alert(id)
    prv=document.getElementById(id)
    if(prv.style.fill === "rgb(234, 11, 140)"){
    prv.style.fill = "#3399ff"
    }
    else{
    prv.style.fill = "#ea0b8c"
    }
	
	//move(id)//test
	
	//return id;
	
	/*countries.c1 = id;
	alert(countries.c1)*/
}
