"use strict";

class LifeModule{

    constructor(rowIndex, columnIndex){

        this.position = {row: rowIndex, column: columnIndex};
        this.type = "L";
        this.health = 50;
        this.dead = false;
    }

    takeDamage(damage){

        if(!this.dead){

            this.setHealth( this.getHealth() - damage );
            if( this.getHealth() <= 0){

                this.dead = true;
            }
        }
    }

    getHealth(){

        return this.health;
    }

    setHealth(newHealth){

        this.health = newHealth;
    }

    isDead(){

        return this.dead;
    }
}