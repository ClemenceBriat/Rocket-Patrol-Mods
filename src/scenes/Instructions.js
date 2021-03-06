class Instructions extends Phaser.Scene{
    constructor() {
        super("instructScene");
    }

    preload() {
        //load audio
        /*
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('top', './assets/top.png');
        this.load.image('bottom', './assets/bottom.png');
        this.load.image('left', './assets/pillarL.png');
        this.load.image('right', './assets/pillarR.png');
        */
    }

    create() {
        //menu display
        let instructConfig = {
            fontFamily: 'Palatino',
            fontSize: '28px',
            //backgroundColor: '#F3B141', 
            color: '#FFFFFF',
            align: 'right',
            /*padding: {
                top: 5, 
                bottom: 5,
            },
            */
            fixedWidth: 0
        }

        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - (2 * textSpacer), 'Instructions', instructConfig).setOrigin(0.5);
        instructConfig.fontFamily = 'Tahoma';
        instructConfig.color = '#3395FF';
        this.add.text(centerX, centerY - textSpacer, 'Use <- -> arrows to move & (F) to Fire', instructConfig).setOrigin(0.5);
        //menuConfig.backgroundColor = '#00FF00';
        instructConfig.color = '#FF5734';
        this.add.text(centerX, centerY, 'Destroy enemy spaceships for points', instructConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, '60 seconds for Easy, 45 for Hard', instructConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + (2 * textSpacer), 'Press <- for Easy or -> for Hard', instructConfig).setOrigin(0.5);
        
        //border
        var top = this.add.image(5, 5, 'top').setScale(1.39, 1).setOrigin(0, 0);
        var left = this.add.image(5, 32, 'left').setScale(1.17, 0.91).setOrigin(0, 0);
        var bottom = this.add.image(5, 446, 'bottom').setScale(1.39, 1).setOrigin(0, 0);
        var right = this.add.image(603, 32, 'right').setScale(1.17, 0.91).setOrigin(0, 0);

        // starts next scene
        //this.scene.start("playScene");

        //define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                fastshipSpeed: 5,
                gameTimer: 60000,
                highScore: 0
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                fastshipSpeed: 6,
                gameTimer: 45000,
                highScore: 0
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }
}