"use strict"

class EmptyModule {
	
	constructor(rowIndex, columnIndex) {
		
		this.position = {row: rowIndex,column: columnIndex};
		this.type = "S";
		this.health = 30;
		this.cost = "20";
		this.dead = false;
	}
	
    takeDamage(damage){

        this.setHealth( this.getHealth() - damage );
        if( this.getHealth() <= 0){

            this.dead = true;
        }
    }
	
	setHealth(newHealth) {
		
		this.health = newHealth;
	}
	
	getCost() {
		return this.cost;
	}
	
	getHealth() {
		
		return this.health;
	}
	
	getType() {
		
		return this.type;
	}
	
	isDead() {
		
		return this.dead;
	}
}