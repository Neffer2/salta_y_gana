let width, height;

export class MenuScene extends Phaser.Scene {
    constructor(){
        super('MenuScene');
    }  

    preload(){
        
    }    
 
    create(){
        this.playMusic();
        width = this.game.config.width;
        height = this.game.config.height;
        this.add.image(0, 0, 'background').setScale(0.8).setOrigin(0, 0);
        let playButton = this.add.image(width/2, height/2, 'play-btn').setInteractive();
        playButton.on('pointerdown', () => {
            playButton.setScale(.8);
            setTimeout(() => {
                this.scene.start('MainScene');
            }, 100);
        });
        
        playButton.on('pointerout', () => {            
            playButton.setScale(1);
        });
    }

    playMusic(){
        let backgroundMusic = this.sound.add('sound-back', { loop: true });
        backgroundMusic.play();
    }
}