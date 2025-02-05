export class PreloadScene extends Phaser.Scene {
    constructor(){
        super('PreloadScene');
    }  

    preload(){
        this.load.setPath('public/assets');
        this.load.image('background', 'generic-png/env/background_tall.png');
        this.load.image('player', 'generic-png/characters/white_sheep.png');
        this.load.image('play-btn', 'buttons/Play.png');

        // Sounds
        // this.load.audio('sound-back', 'music/hackbeat.mp3');
        // this.load.audio('sound-hit', 'music/sheep-hit.wav');
    }    
 
    create(){
        this.scene.start('MainScene');   
    }
}