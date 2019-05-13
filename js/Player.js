"use strict";

class Player{

    constructor(map) {

        this.lifeModule = new LifeModule();
        this.turrets = [];
        this.resourceModules = [];
        this.gold = 500;
        this.iron = 100;
        this.lost = false;

        this.turrets.push(map.grid[18][18]);
        this.turrets.push(map.grid[18][19]);
        this.turrets.push(map.grid[19][18]);
        (map.grid[19][19]) = this.lifeModule;
    }

    hasLost(){

        return this.lost;
    }

    updateLost(){

        if( this.lifeModule.getHealth() <= 0 ){

            this.lost = true;
        }
    }

    getGold(){

        return this.gold;
    }

    getIron(){

        return this.iron;
    }
	
	addGold(additive) {
		
		this.gold += additive;
	}
	
	addIron(additive) {
		
		this.iron += additive;
	}

    getLifeModule(){

        return this.lifeModule;
    }

    addTurret(turret){

        this.turrets.push(turret);
    }

    addResourceModule(resMod){

    	this.resourceModules.push(resMod);
    }

    getTurrets(){

        return this.turrets;
    }

    getResourceModules() {

    	return this.resourceModules;
    }
}