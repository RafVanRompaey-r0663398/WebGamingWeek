"use strict";

document.addEventListener('DOMContentLoaded', init);

let game;

function init(){

    game = new Game();
    window.setInterval(updateGameState,500);
}

function updateGameState(){

    game.startGame();
}