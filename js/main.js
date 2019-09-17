let allRovers = [];
let plateau;
let roverCounter = 0;
var BreakException = {};

function generatePlateau(platX, platY){
    displayError("")
    if ((Number.isInteger(+platX) && Number.isInteger(+platY)) && (platX != '' && platY != '')){
        plateau = new Plateau(platX, platY);
        //if platue exists show screen to add and move rovers
        if (plateau){
            document.getElementById("plateauForm").style.display="none";
            document.getElementById("genRoverForm").style.display="block";
            document.getElementById("moveRover").style.display="block";
        }
        displayPlat();
        return (true);
    }else{
        displayError("Invalid coordinates");
        return (false);
    }
}

function generateRover(roverX, roverY, roverOrient){
    roverCounter++;
    displayError("");
    displaySuccess("");
    if (isValidRover(roverX, roverY, roverOrient.toUpperCase())){
        //create rover
        const rover = new Rover(roverX, roverY, roverOrient, roverCounter);
        allRovers.push(rover);
        displaySuccess("Rover Added successfully!");
        displayRovers();
        return (true);
    }else{
        displayError("Coordinates out of bounds");
        return (false);
    }
}

function moveRover(roverID, moveCommands){
    displayError("");
    displaySuccess("");
    let rover = allRovers[roverID - 1];
    //check if valid rover is selected
    if (rover){
       executeMove(moveCommands, rover)
       return (true);
    }else{
        displayError("The rover ID you selected does not exist");
        return (false);
    }
}

function executeMove(moveCommands, rover){
    //split commands into array
    var moveArray = moveCommands.split('');
    //move the rover according to commands
    try {
        moveArray.forEach(function (command) {
            if (command.toUpperCase() == "M"){
                if (!rover.move()){
                    throw BreakException;
                }
            }else if(command.toUpperCase() == "L" || command.toUpperCase() == "R"){
                rover.rotate(command);
            }
            displaySuccess("Rover Moved successfully!");
        });
    }catch(e){
        displaySuccess("");
        displayError("Oops, you went out of bounds! Some of the commands could not finish.");
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