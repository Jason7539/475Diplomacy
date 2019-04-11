var user = (function(){

	var orders = [];
	var country1;
	var country2;
	var order_type;
	var count_total = 0;
	var count_order = 0;
	var count_country = 0;
	
	var pub = {};
	
	//set order function
	pub.setOrder = function(id){
		
		//if clicked thing is a province
		if (id != "move" && id != "support" && id != "convoy" && id != "hold") {
			
			count_country++
		
			//setting country 1, or 2 if 1 is already set
			if (count_country == 1) {
				country1 = id
			}
			else {
				country2 = id
			}
		}
	
		//id passed through is an order type
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

	//test
	alert(country1 + " " + order + " " + country1);
	//
	
	return pub;
}());

/*user.setOrder("c1");
user.setOrder("move");
user.setOrder("c2");*/

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