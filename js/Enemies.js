"use strict";

class Enemies{

    constructor(){

        this.waveNumber = 0;
        this.enemyArmy = [];
    }

    addToArmy(enemy){

        this.enemyArmy.push(enemy);
    }

    clearDead(enemies){

        this.enemyArmy.forEach(

            function(enemy){


                if(enemy.dead === true){

                    let temp = enemies.enemyArmy.indexOf(enemy);
                    enemies.enemyArmy.splice(temp, 1);
                }
            });
    }
}