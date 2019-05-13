"use strict";

class Turret{

    constructor(rowIndex, columnIndex){

        this.position = {row: rowIndex,column: columnIndex};
        this.type = "T";
        this.attack = 1;
        this.health = 5;
		this.cost = "50";
        this.dead = false;
    }

    shoot(target){

        if(!this.dead){

            target.takeDamage(this.attack);
        }
    }

    takeDamage(damage){

        if(!this.dead){

            this.setHealth( this.getHealth() - damage );
            if( this.getHealth() <= 0){

                this.dead = true;
            }
        }
    }
	
	setHealth(newHealth) {
		this.health = newHealth;
	}

	getCost() {
		
		return this.cost;
	}
    getHealth(){

        return this.health;
    }

    getType(){

        return this.type;
    }

    isDead(){

        return this.dead;
    }
}