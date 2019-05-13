"use strict";

class Enemy{

    constructor(){

        this.position = {row: 0, column: 0};
        this.type = "N";
        this.health = 10;
        this.attack = 5;
        this.canAttack = true;
        this.dead = false;
    }

    takeDamage(damage){

        if(!this.dead){

            this.setHealth( this.health - damage );
        }
    }

    shoot(target){

        if((!this.dead) && this.canAttack){

            target.takeDamage(this.attack);
            this.canAttack = false;
        }
    }

    setHealth(newHealth){

        this.health = newHealth;

        if(newHealth <= 0){

            this.dead = true;
        }
    }
}