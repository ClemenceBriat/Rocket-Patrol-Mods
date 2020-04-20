class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload() {
        //load images and tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfield2', './assets/starfield2.png');
        this.load.image('starfield3', './assets/starfield3.png');
        this.load.image('fastship', './assets/fastship.png');
        this.load.image('top', './assets/top.png');
        this.load.image('bottom', './assets/bottom.png');
        this.load.image('left', './assets/pillarL.png');
        this.load.image('right', './assets/pillarR.png');


        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion2.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.starfield2 = this.add.tileSprite(0, 0, 640, 480, 'starfield2').setOrigin(0, 0);
        this.starfield3 = this.add.tileSprite(0, 0, 800, 480, 'starfield3').setOrigin(0, 0);

        // white borders
        //this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        // green ui background
        //this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

        // add rocket for p1
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket').setScale(0.5, 0.5).setOrigin(0, 0);

        //add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width +192, 132, 'spaceship', 0, 30).setOrigin (0, 0);
        this.ship02 = new Spaceship(this, game.config.width +96, 196, 'spaceship', 0, 20).setOrigin (0, 0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setOrigin (0, 0);

        //add fastship
        this.fastship01 = new FastShip(this, game.config.width +288, 132, 'fastship', 0, 50).setOrigin (0, 0);

        // define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        //animation config
        this.anims.create({
            key: 'explode', 
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}), 
            frameRate: 30
        });

        //border
        var top = this.add.image(5, 5, 'top').setScale(1.39, 1).setOrigin(0, 0);
        var left = this.add.image(5, 32, 'left').setScale(1.17, 0.91).setOrigin(0, 0);
        var bottom = this.add.image(5, 446, 'bottom').setScale(1.39, 1).setOrigin(0, 0);
        var right = this.add.image(603, 32, 'right').setScale(1.17, 0.91).setOrigin(0, 0);

        //score
        this.p1Score = 0;

        //score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            //backgroundColor: '#F3B141', 
            color: '#843605',
            align: 'right',
            /*padding: {
                top: 5, 
                bottom: 5,
            },
            */
           //fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        //game over flag
        this.gameOver = false;

        //60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER',scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <- for Menu',scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        //chekc key input for restart
        if( this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restand(this.p1Score);
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        // scroll starfield
        this.starfield.tilePositionX -= 4;
        this.starfield2.tilePositionX -= 6;
        this.starfield3.tilePositionX -= 8;

        if (!this.gameOver) {
            //update rocket
            this.p1Rocket.update();

            //update spaceship
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();

            //update fastship
            this.fastship01.update();
        }

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

        if(this.checkCollision(this.p1Rocket, this.fastship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.fastship01);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if(rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height && 
            rocket.height + rocket.y > ship.y) {
                return true;
            }
        else {
            return false;
        }
    }

    shipExplode(ship) {
        //temp hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explotion').setOrigin(0, 0);
        //play explode anim
        boom.anims.play('explode');
        //callback after animation completes
        boom.on('animationcomplete', () => {
            ship.reset();                       //reset ship position
            ship.alpha = 1;                     //make ship visible again
            boom.destroy();                     //remove explosion sprite
        });
        //score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        //sound plays
        this.sound.play('sfx_explosion');
    }
}