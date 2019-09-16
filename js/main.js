let allRovers = [];
let plateau;
let roverCounter = 0;
var BreakException = {};

function generatePlateau(){
    displayError("")
    let platX = document.getElementById("plateauX").value;
    let platY = document.getElementById("plateauY").value;
    if (Number.isInteger(+platX) && Number.isInteger(+platY)){
        plateau = new Plateau(platX, platY);
        //if platue exists show screen to add and move rovers
        if (plateau){
            document.getElementById("plateauForm").style.display="none";
            document.getElementById("genRoverForm").style.display="block";
            document.getElementById("moveRover").style.display="block";
        }
        displayPlat();
    }else{
        displayError("Invalid coordinates")
    }
    
}

function generateRover(){
    roverCounter++;
    displayError("");
    displaySuc("");
    let roverX = document.getElementById("roverX").value;
    let roverY = document.getElementById("roverY").value;
    let roverOrient = document.getElementById("roverOrient").value;
    if (isValidRover(roverX, roverY, roverOrient.toUpperCase())){
        //create rover
        const rover = new Rover(roverX, roverY, roverOrient, roverCounter);
        allRovers.push(rover);
        displaySuc("Rover Added Succsessfully!");
        displayRovers();
    }else{
        displayError("Coordinates out of bounds");
    }
    document.getElementById("roverX").value = '';
    document.getElementById("roverY").value = '';
    document.getElementById("roverOrient").value = '';
    
}

function moveRover(){
    displayError("");
    displaySuc("");
    let roverID = document.getElementById("roverID").value;
    let moveCommands = document.getElementById("roverMove").value;
    let rover = allRovers[roverID - 1];
    //check if valid rover is selected
    if (rover){
       executeMove(moveCommands, rover)
    }else{
        displayError("The rover ID you selected does not exist");
    }
    document.getElementById("roverID").value = '';
    document.getElementById("roverMove").value = '';	
}

function executeMove(moveCommands, rover){
    //split commands into array
    var moveArray = moveCommands.split('');
    //move the rover according to commands
    try {
        moveArray.forEach(function (command) {
            if (command.toUpperCase() == "M"){
                if (!rover.move()){
                    displayError("Oops, you went out of bounds! Some of the commands could not finish.");
                    throw BreakException;
                }
            }else if(command.toUpperCase() == "L" || command.toUpperCase() == "R"){
                rover.rotate(command);
            }
            displaySuc("Rover Moved Succsessfully!");
        });
    }catch(e){
        displaySuc("");
        if (e !== BreakException) throw e;
    }
    displayRovers();
}

function isValidRover(roverX, roverY, roverOrient){
    let compass = ["N", "E", "S", "W"];
    if (((roverX >= plateau.minX && roverX <= plateau.maxX) && (roverY >= plateau.minY && roverY <= plateau.maxY)) && (compass.includes(roverOrient))){
        return (true);
    }else{
        return(false);
    }
}


