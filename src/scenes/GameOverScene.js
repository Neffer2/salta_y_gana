let width, height, score;

export class GameOverScene extends Phaser.Scene {
    constructor(){
        super('GameOverScene');
    }  

    preload(){}    

    create(){ 
        score = this.sys.settings.data.score;
        height = this.game.config.height;
        this.add.image(0, 0, 'background').setScale(0.8).setOrigin(0, 0);
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.add.text(screenCenterX, (height/3), 'Game Over', { font: '100px Arial', fill: '#ffffff' }).setOrigin(0.5);
        this.add.image((screenCenterX - 80), (height/2), 'sheep').setOrigin(.5);
        this.add.text((screenCenterX + 80), (height/2), score, { font: '70px Arial', fill: '#ffffff' }).setOrigin(.5);

        setTimeout(() => {
            location.reload();
        }, 5000);
    }
} 