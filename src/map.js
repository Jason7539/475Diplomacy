instruction = {}    // Json object that holds instructions to send to host
index = 0           // index for instructions


const client = require(./client.js)

var orders = []
var country1
var country2
var order_type
var count_total = 0
var count_order = 0
var count_country = 0

function order(id){
	
	count_total++
	//id passed through is a country
	if (id != "move" && id != "support" && id != "convoy" && id != "hold") {
		count_country++
		if (count_country == 1) country1 = id
		else country2 = id
		/*prv=document.getElementById(id)

		if(prv.style.fill === "rgb(234, 11, 140)"){
			prv.style.fill = "#3399ff"
		}
		else{
			prv.style.fill = "#ea0b8c"
		}*/
	}
	//id passed through is a order type
	else {
		count_order++
		order_type = id
	}
	
	//Completed the hold order
	if (country1 != null && order_type == "hold") {
		//Store the country and type in a order
		var order = {
			type: order_type,
			from: country1,
			to: "NULL"
		}
		orders.push(order)
		/*console.log(orders)
		console.log(order)*/
		alert(orders)
		alert(order)
		count_total = 0
		count_country = 0
	}
	//Completed the 3 necessary steps for most orders
	else if (country1 != null && country2 != null && order_type != null) {
		//Store the country and type in a order
		var order = {
			type: order_type,
			from: country1,
			to: country2
		}
		
		//Push to the orders list
		orders.push(order)
		/*console.log(orders)
		console.log(order)*/
		alert(orders)
		alert(order)
		count_total = 0
		count_country = 0
	}
}

/*order("Ukraine")
order("hold")
order("Russia")*/

function send() {
	orders = [
	{type:"move", from:"Ukraine", to:"Russia"},
	{type:"hold", from:"Ukraine", to:"NULL"},
	{type:"support", from:"Ukraine", to:"Russia"}
	]
	
	client.addOrders(orders)
	console.log("Sent")
}

/*
function move(){

    current_instruction.push("")
    // alert("click country to move to")
    // D = document.getElementById("E")
    // doc = D.getSVGDocument()
    // country = doc.getElementById(id)
    // country.style.fill = "#000000"
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
    alert("click country to support")
}

function convoy() {
    alert("Select army to convoy")
}

function hold() {
    alert("Selected country will hold")
}*/

/* for chat display */
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function hoverIn(id){
    prv=document.getElementById(id)
    prv.style.fill="#000000"
}

function hoverOut(id) {
    prv=document.getElementById(id)
    if (prv.style.fill !=  "#ea0b8c") {
        prv.style.fill = "#3399ff"
    }
}

