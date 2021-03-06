let config = {
    type: Phaser.CANVAS, 
    width: 640,
    height: 480,
    scene: [ Menu, Instructions, Play],
};

let game = new Phaser.Game(config);

//define game settings
game.settings = {
    spaceshipSpeed: 3,
    fastshipSpeed: 6,
    gameTimer: 60000,
    highScore: 0
}

// reserve keyboard variables
let keyF, keyLEFT, keyRIGHT, keySPACE;