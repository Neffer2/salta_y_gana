export class GameOverScene extends Phaser.Scene {
    score;
    height;

    constructor(){
        super('GameOverScene');
    }  

    preload(){}    

    create(){ 
        this.score = this.sys.settings.data.score;
        this.height = this.game.config.height;
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.add.image(screenCenterX, ((this.height/2) - 200), 'game-over-title').setOrigin(0.5);
        this.add.image((screenCenterX - 80), (this.height/2) + 100, 'player').setScale(.7).setOrigin(.5);
        this.add.text((screenCenterX + 80), ((this.height/2 + 100)), this.score, { font: '80px LuckiestGuy', fill: '#ffffff' }).setOrigin(.5);

        setTimeout(() => {
            location.reload();
        }, 5000);
    }
} 