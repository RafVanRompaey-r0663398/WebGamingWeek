"use strict"

class EmptyModule {
	
	constructor() {
		
		this.health = 30;
		this.armor = 2;
	}
	
	takeDamage(damage) {
		
		let damageTaken = this.getArmor() - damage;
		
		if(damageTaken >= 0) {
			this.setHealth(this.getHealth - damageTaken);
		}
	}
	
	setHealth(newHealth) {
		
		this.health = newHealth;
	}
	
	getHealth() {
		
		return this.health;
	}

	getType(){

		return "E";
	}
}