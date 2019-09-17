class Rover {
    constructor(x, y, orientation, id) {
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.orientation = orientation.toUpperCase();
        this.id = parseInt(id);
        //Rotate Rover
        this.rotate = function(direction) {
            switch (this.orientation) {
                case "N":
                    direction == "R" ? (this.orientation = "E") : (this.orientation = "W");
                    break;
                case "E":
                    direction == "R" ? (this.orientation = "S") : (this.orientation = "N");
                    break;
                case "S":
                    direction == "R" ? (this.orientation = "W") : (this.orientation = "E");
                    break;
                case "W":
                    direction == "R" ? (this.orientation = "N") : (this.orientation = "S");
                    break;
                default:
                    console.log("Invalid rotation");
            }
        };
        //Move Rover
        this.move = function() {
            switch (this.orientation) {
                case "N":
                    this.y += 1;
                    if (this.y > plateau.maxY) {
                        this.y -= 1;
                        return (false);
                    }
                    break;
                case "E":
                    this.x += 1;
                    if (this.x > plateau.maxX) {
                        this.x -= 1;
                        return (false);
                    }
                    break;
                case "S":
                    this.y -= 1;
                    if (this.y < plateau.minY) {
                        this.y += 1;
                        return (false);
                    }
                    break;
                case "W":
                    this.x -= 1;
                    if (this.x < plateau.minX) {
                        this.x += 1;
                        return (false);
                    }
                    break;
                default:
                    break;
            }
            return (true);
        };
        //Return Posistion
        this.position = function() {
            return { x: this.x, y: this.y, orientation: this.orientation };
        };
    }
}