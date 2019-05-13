document.addEventListener('DOMContentLoaded',init);


var buildGridToggle = false;
var gridImage = new Image(800, 800);
gridImage.src = "Assets/Images/grid.png";

//Toggles for each build button
var emptyModuleBtnToggle = false;
var turretModuleBtnToggle = false;
var resourceModuleBtnToggle = false;

var game = new Game();

//On page load
function init() {

    //Hide build buttons
    document.getElementById("moduleBtns").style.display="none";
    document.getElementById("buildMode").style.display="none";

    mainGameWindow.init();
}

//On start game pressed
function startGameBtn() {
    //Show build button
    document.getElementById("buildMode").style.display="block";
    document.getElementById("startGame").style.display="none";
    //Start the whole game
    mainGameWindow.startUpdate();
}

//Game window object
var mainGameWindow = {
	
    canvas: document.getElementById("myCanvas"),
	//Start update loop on this object and on game logic
    init: function() {
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas,document.body.childNodes[0]);
    },
    startUpdate() {
        this.interval = setInterval(updateGameWindow, 20);
        game.startGameLogic(game);
    },
    clear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
};

//Main update loop
function updateGameWindow(){
	
	//Clear window at start of each update cycle
    mainGameWindow.clear();
    let mapString = game.getMapUpdate();
    drawCanvas(mapString);

	//Then draw all components
     if(buildGridToggle === true){
        BuildModeUpdate();
    }

	drawUIText();
    //Update Game
    //game.updateGameState();
	drawCanvas(game.getMapUpdate());

}

function drawUIText() {
	ctx = mainGameWindow.context;
    ctx.font = "15px Arial";
    ctx.fillStyle="white";

	/*change the hardcode values with the functions*/
    ctx.fillText("Gold: "+game.player.getGold(),20,50);
    ctx.fillText("Iron: "+game.player.getIron(),20,75);
    ctx.fillText("Station Health: "+game.player.getLifeModule().getHealth(),100,50);
    ctx.fillText("Wave Number: "+game.enemies.waveNumber,100,75);
}



//Called when build mode button is pressed
function ToggleBuildMode(){
    buildGridToggle = !buildGridToggle;

    if(buildGridToggle) {
        document.getElementById("buildMode").style.backgroundColor = "red";
        document.getElementById("moduleBtns").style.display="block";	
    } else {
        document.getElementById("buildMode").style.backgroundColor = "#DDD";
        document.getElementById("moduleBtns").style.display="none";
		emptyModuleBtnToggle = false;
		turretModuleBtnToggle = false;
		resourceModuleBtnToggle = false;
				document.getElementById("EmptyModuleBtn").style.backgroundColor = "#DDD";
		document.getElementById("TurretModuleBtn").style.backgroundColor = "#DDD";
		document.getElementById("ResourceModuleBtn").style.backgroundColor = "#DDD";
    }
}

/*Calls while build mode toggle is true
 -Draws grid image onto canvas
 -Show buttons to be able to build modules
*/
function BuildModeUpdate(){
	//Create another canvas like that of the main window
    var newCanvas = mainGameWindow.canvas;
    this.context = newCanvas.getContext("2d");
    context.drawImage(gridImage,0,0);
}

//Empty module button clicked
function EmptyBuildSelected() {
	
	//Toggle this button, but set others to false
	emptyModuleBtnToggle = !emptyModuleBtnToggle
	turretModuleBtnToggle = false;
	resourceModuleBtnToggle = false;
	
	//Set them all back to the correct colours
	if(emptyModuleBtnToggle) {
		//Set button to "selected" colour, and others to "deselected" colour
		document.getElementById("EmptyModuleBtn").style.backgroundColor = "red";
		document.getElementById("TurretModuleBtn").style.backgroundColor = "#DDD";
		document.getElementById("ResourceModuleBtn").style.backgroundColor = "#DDD";
	} else {
		document.getElementById("EmptyModuleBtn").style.backgroundColor = "#DDD";
		document.getElementById("TurretModuleBtn").style.backgroundColor = "#DDD";
		document.getElementById("ResourceModuleBtn").style.backgroundColor = "#DDD";
	}
}

//Turret button selected
function TurretBuildSelected() {
	//Toggle this button, but set others to false
	emptyModuleBtnToggle = false
	turretModuleBtnToggle = !turretModuleBtnToggle;
	resourceModuleBtnToggle = false;
	
	//Set them all back to the correct colours
	if(turretModuleBtnToggle) {
		//Set button to "selected" colour, and others to "deselected" colour
		document.getElementById("EmptyModuleBtn").style.backgroundColor = "#DDD";
		document.getElementById("TurretModuleBtn").style.backgroundColor = "red";
		document.getElementById("ResourceModuleBtn").style.backgroundColor = "#DDD";
	} else {
		document.getElementById("EmptyModuleBtn").style.backgroundColor = "#DDD";
		document.getElementById("TurretModuleBtn").style.backgroundColor = "#DDD";
		document.getElementById("ResourceModuleBtn").style.backgroundColor = "#DDD";
	}
}

//Resource button selected
function ResourceBuildSelected() {
	//Toggle this button, but set others to false
	emptyModuleBtnToggle = false
	turretModuleBtnToggle = false;
	resourceModuleBtnToggle = !resourceModuleBtnToggle;
	
	//Set them all back to the correct colours
	if(resourceModuleBtnToggle) {
		//Set button to "selected" colour, and others to "deselected" colour
		document.getElementById("EmptyModuleBtn").style.backgroundColor = "#DDD";
		document.getElementById("TurretModuleBtn").style.backgroundColor = "#DDD";
		document.getElementById("ResourceModuleBtn").style.backgroundColor = "red";
	} else {
		document.getElementById("EmptyModuleBtn").style.backgroundColor = "#DDD";
		document.getElementById("TurretModuleBtn").style.backgroundColor = "#DDD";
		document.getElementById("ResourceModuleBtn").style.backgroundColor = "#DDD";
	}
}

//Calculates which grid position was clicked on
function CanvasClicked(event) {
		var rect = mainGameWindow.canvas.getBoundingClientRect();
		var xPos = event.clientX - rect.left;
		var yPos = event.clientY - rect.top;
		
		var gridPosX = Math.ceil((xPos/40) - 1);
		var gridPosY = Math.ceil((yPos/40) - 1);
		
		//Now check if object is to be built in that position
		if(buildGridToggle) {
			if(emptyModuleBtnToggle) {
				game.addObject("S", gridPosY, gridPosX);
			}
			if(turretModuleBtnToggle) {
				game.addObject("T", gridPosY, gridPosX);
			}
			if(resourceModuleBtnToggle) {
				game.addObject("R", gridPosY, gridPosX);
			}	
		}	
	}

function drawCanvas(mapString){

    let ctx = mainGameWindow.context;

    let enemyImg = new Image(40, 40);
    enemyImg.src = "Assets/images/enemy.png";

    let turretImg = new Image(40, 40);
    turretImg.src = "Assets/images/Standard_turret.png";

    let lifeModuleImg = new Image(40, 40);
    lifeModuleImg.src = "Assets/images/Life_module.png";

	let emptyStructureImg = new Image(40,40);
	emptyStructureImg.src = "Assets/Images/Empty_module.png";
	
	let resourceModuleImg = new Image(40,40);
	resourceModuleImg.src = "Assets/Images/Resource_module.png";
	
	
    let x = 0;
    let y = 0;

    for(let i = 0; i <20;i++){

        for(let j = 0; j < 20;j++){

            //determine letter
            let char = mapString.charAt(i*20 + j);

            //determine x and y offset
            x = j*40;
            y = i*40;

            //determine image and load it
            switch(char){

                case "E":

                    break;

                case "T":

                    ctx.drawImage(turretImg, x, y);
                    break;

                case "L":

                    ctx.drawImage(lifeModuleImg, x, y);
                    break;

                case "N":

                    ctx.drawImage(enemyImg, x, y);
                    break;
					
				case "S":
					ctx.drawImage(emptyStructureImg, x, y);
					break;
					
				case "R":
					ctx.drawImage(resourceModuleImg, x, y);
            }
        }
    }
}
