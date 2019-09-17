let text;

function displayRovers() {
    text = "<table>"+
    "<tr>" +
    "<th>Rover ID</th>" +
    "<th>Rover X</th>" +
    "<th>Rover Y</th>" +
    "<th>Rover Orientation</th>" +
    "</tr>";
    allRovers.forEach(append);
    text += "</table>";
    document.getElementById("rover").innerHTML = text;  
}

function append(element) {
    text += "<tr>" + "<th>" + element.id + "</th><th>" + element.x + "</th><th>" + element.y + "</th><th>" + element.orientation + "</th></tr>";
}

function displayError(text){
    document.getElementById("errorMessage").innerHTML = text; 
}

function displaySuccess(text){
    document.getElementById("sucMessage").innerHTML = text; 
}

function displayPlat(){
    text = "Plateau Size: " + plateau.maxX + " by " + plateau.maxY;
    document.getElementById("plateauSize").innerHTML = text; 
}

