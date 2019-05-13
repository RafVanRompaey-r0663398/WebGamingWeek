"use strict";

class Game{

    constructor() {

        this.map = new Map();
		this.grid = this.map.getGrid();
        this.enemies = new Enemies();
        this.player = new Player(this.map);
		this.turretCost = 50;
		this.emptyModuleCost = 20;
		this.resourceModuleCost = 50;
    }

    startGameLogic(game){

        window.setInterval(this.updateGameState, 2000, game);
    }

    updateGameState(game){

        game.spawnNewEnemy();

        game.fireTurrets(game);

        game.map.clearDeadObjectsFromMap();

        game.enemies.clearDead(game.enemies);

        game.moveEnemies(game);

        game.allEnemiesAttack();

        game.collectResources(game);
    }


    fireTurrets(game){

        //all turrets shoot

        this.player.getTurrets().forEach(
            function (turret) {


                let target = game.findClosestTarget();


                turret.shoot(target);
            }
        );
    }

    collectResources(game) {

        this.player.getResourceModules().forEach(
            function (resourceModule) {

                game.player.addIron(5);
            }
        );
    }

    spawnNewEnemy() {


        if(game.enemies.enemyArmy.length < 5 && game.grid[0][0].type === "E"){

            //enemy spawn
            let temp = new Enemy();
            this.enemies.addToArmy(temp);
            this.map.spawnEnemy(temp);
        }
    }

    moveEnemies(game) {

        //all enemies move
        game.enemies.enemyArmy.forEach(
            function (enemy) {

                if(game.validCoordinates(enemy.position.row + 1,enemy.position.column+1)) {
                    if (game.grid[enemy.position.row + 1][enemy.position.column + 1].type === "E") {

                        game.grid[enemy.position.row][enemy.position.column] = new EmptySpace();
                        game.grid[enemy.position.row + 1][enemy.position.column + 1] = enemy;
                        enemy.position.row++;
                        enemy.position.column++;
                    }
                }
            }
        );
    }

    allEnemiesAttack() {

        this.enemies.enemyArmy.forEach(

            function(enemy){

             let x = enemy.position.row - 1;
             let y = enemy.position.column - 1;

             for(let i = x; i < x + 3;i++){

                 for(let j = y; j < y + 3;j++){

                     if(game.validCoordinates(i, j)){

                         if(game.grid[i][j].type === "T" || game.grid[i][j].type === "L"){

                             enemy.shoot(game.grid[i][j]);
                         }
                     }
                 }
             }
             enemy.canAttack = true;
        });

    }
	
	addObject(type, row, col) {

		switch(type) {
			case "S":
				if(this.player.getIron() >= this.emptyModuleCost){
					this.map.addObjectToMap(type, row, col);	
					this.player.addIron(-this.emptyModuleCost);
				}
				break;
			case "T":
				if(this.player.getIron() >= this.turretCost){
					this.map.addObjectToMap(type, row, col);	
					this.player.addIron(-this.turretCost);
                    this.player.addTurret(game.grid[row][col]);
				}
				break;
			case "R":
				if(this.player.getGold() >= this.resourceModuleCost){
					this.map.addObjectToMap(type, row, col);	
					this.player.addGold(-this.resourceModuleCost);
                    this.player.addResourceModule(game.grid[row][col]);
				}
				break;
			default:
				break;
		}
	
	}
	

    getMapUpdate(){

        let mapString = "";

        for(let i = 0; i < 20; i++){

            for(let j = 0; j < 20; j++){

                let temp = game.map.grid[i][j].type;
                mapString = mapString.concat(temp);

            }
        }

        return mapString;
    }

    findClosestTarget(){

        for(let i = 19; i >= 0; i--){

            for(let j = 19; j >= 0; j--){

                if(game.grid[i][j].type === "N"){

                    return game.grid[i][j];
                }
            }
        }
    }

    checkIfGameIsOver(){

        let over = this.player.getLifeModule().isDead();

        if(over){

            window.clearInterval();
        }
    }

    validCoordinates(row, column){

        return row >= 0 && row <= 19 && column >= 0 && column <= 19;
    }
}

