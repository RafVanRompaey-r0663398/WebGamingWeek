"use strict";

class Map{

    constructor(){

        this.grid = new Array(20);

        for(let i = 0; i < 20; i++){

            this.grid.push(new Array(20));
        }

        this.fillMapWithEmptySpace();
        this.fillWithRandom();
    }

    fillMapWithEmptySpace(){

        this.grid = [];
        for(let i = 0; i < 20; i++){
            this.grid[i] = [];
            for(let j = 0; j < 20; j++){

                this.grid[i][j] = new EmptySpace();
            }
        }
    }

    fillWithRandom(){

        this.grid[19][19] = new LifeModule(19, 19);
        this.grid[19][18] = new Turret();
        this.grid[18][19] = new Turret();
        this.grid[18][18] = new Turret();
    }

	//Pass in the type and position
    addObjectToMap(objectType, rowIndex, columnIndex){
		
        if(this.grid[rowIndex][columnIndex].type === "E" || this.grid[rowIndex][columnIndex].type === "S"){
		//Empty space or structure clicked
			
			//Empty structure build checks
			if(objectType === "S") {
				
				//Check adjacents to see if they are not null first, then see if they are part of station
				var rightCheck = false;
				var leftCheck = false;
				var bottomCheck = false;
				var topCheck = false;

				if(columnIndex+1 >= 0 && columnIndex+1 <= 19) {
					if(this.grid[rowIndex][columnIndex+1].type !== "E") {
						//Right is not empty space and not null
						rightCheck = true;
					}
				}
				if(columnIndex-1 >= 0 && columnIndex-1 <= 19) {
					if(this.grid[rowIndex][columnIndex-1].type !== "E") {
						//Left is not empty space and not null
						leftCheck = true;
					}
				}
				if(rowIndex+1 >= 0 && rowIndex+1 <= 19) {
					if(this.grid[rowIndex+1][columnIndex].type !== "E") {
						//Bottom is not empty space and not null
						bottomCheck = true;
					}
				}
				if(rowIndex-1 >= 0 && rowIndex-1 <= 19) {
					if(this.grid[rowIndex-1][columnIndex].type !== "E") {
						//Top is not empty space and not null
						topCheck = true
					}
				}
				
				//Check if any of the adjacents were part of the main ship
				if(rightCheck || leftCheck || bottomCheck || topCheck) {
					
					//Build empty structure
					this.grid[rowIndex][columnIndex] = new EmptyModule(rowIndex, columnIndex);
					}
			}
			
			else {
				//Must be a different type of module being built
				//If it is being built on an empty structure, build the right one in its place
				if(this.grid[rowIndex][columnIndex].type === "S") {
					switch(objectType) {
						case "T":
							//Build turret
							this.grid[rowIndex][columnIndex] = new Turret(rowIndex, columnIndex);
							break;
						case "R":
							//Build resource module
							this.grid[rowIndex][columnIndex] = new ResourceModule(rowIndex, columnIndex);
							break;
						default:
							
					}
				}
			}
        }
    }

    clearDeadObjectsFromMap()
	{

        for(let i = 0; i < 20; i++)
		{

            for(let j = 0; j < 20; j++)
			{

                if(this.grid[i][j].dead === true){

                    this.grid[i][j] = new EmptySpace();
                }
            }
        }
    }

    getGrid(){

        return this.grid;
    }

    spawnEnemy(enemy){

    	this.grid[0][0] = enemy;
    }
}