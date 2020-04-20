// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add an object to scene, displayList, updateList
        scene.add.existing(this);

        // tracks firing
        this.isFiring = false;

        //add rocket sfx
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        //left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= 47) {
                this.x -= 2;
                //this.velocity -= 2;
            }
            else if(keyRIGHT.isDown && this.x <= 578) {
                this.x += 2;
                //this.velocity += 2;
             }
             //this.x += velocity;
        }
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            //play sfx
            this.sfxRocket.play();
        }

        //if fired, move up
        if(this.isFiring && this.y >= 108) {
            this.y -= 2;
        }

        // reset on miss
        if(this.y <= 108) {
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = 432;
    }
}