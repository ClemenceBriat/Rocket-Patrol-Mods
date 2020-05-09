class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('top', './assets/top.png');
        this.load.image('bottom', './assets/bottom.png');
        this.load.image('left', './assets/pillarL.png');
        this.load.image('right', './assets/pillarR.png');
    }

    create() {
        //menu display
        let menuConfig = {
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

        this.add.text(centerX, centerY - textSpacer, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        menuConfig.fontFamily = 'Tahoma';
        menuConfig.color = '#3395FF';
        this.add.text(centerX, centerY + textSpacer, 'Press SPACE to Start', menuConfig).setOrigin(0.5);
        
        //border
        var top = this.add.image(5, 5, 'top').setScale(1.39, 1).setOrigin(0, 0);
        var left = this.add.image(5, 32, 'left').setScale(1.17, 0.91).setOrigin(0, 0);
        var bottom = this.add.image(5, 446, 'bottom').setScale(1.39, 1).setOrigin(0, 0);
        var right = this.add.image(603, 32, 'right').setScale(1.17, 0.91).setOrigin(0, 0);

        // starts next scene
        //this.scene.start("instructScene");

        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('sfx_select');
            this.scene.start("instructScene");
        }
    }
}