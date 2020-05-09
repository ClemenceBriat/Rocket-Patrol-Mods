// SPaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);

        // add an object to scene, displayList, updateList
        scene.add.existing(this);
        this.points = pointValue;

        this.value = Phaser.Math.Between(0, 1);

    }

    update() {
        if(this.value == 0){
            // move spaceship left
            this.x -= game.settings.spaceshipSpeed;
        }
        else {
            // move spaceship right
            this.x += game.settings.spaceshipSpeed;
        }
        
        // wraparound screen bounds
        if(this.value == 0) {
            if(this.x <= 0 - this.width) {
                this.reset();
            }
        }
        else {
            if(this.x >= game.config.width) {
                this.reset();
            }
        }
        
    }

    reset() {
        this.value = Phaser.Math.Between(0, 1);
        if(this.value == 0) {
            this.x = game.config.width;
        }
        else {
            this.x = 0;
        }
    }
}