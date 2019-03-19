

function move(id){
    alert("click country to move to")
    D = document.getElementById("E")
    doc = D.getSVGDocument()
    country = doc.getElementById(id)
    country.style.fill = "#000000"
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
}

/* for chat display */
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function Here(id){
    alert(id)
    prv=document.getElementById(id)
    if(prv.style.fill === "rgb(234, 11, 140)"){
    prv.style.fill = "#3399ff"
    }
    else{
    prv.style.fill = "#ea0b8c"
    }
}
