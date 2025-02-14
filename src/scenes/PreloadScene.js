export class PreloadScene extends Phaser.Scene {
    constructor(){
        super('PreloadScene');
    }  

    preload(){
        this.load.setPath('public/assets');
        this.load.image('background', 'generic-png/env/background_tall.png');
        this.load.image('player', 'generic-png/characters/white_sheep.png');
        this.load.image('play-btn', 'buttons/Play.png');
        this.load.image('grass-1', 'generic-png/env/grass_1.png');
        this.load.image('grass-2', 'generic-png/env/grass_2.png');
        this.load.image('grass-3', 'generic-png/env/grass_3.png');

        // Sounds
        this.load.audio('sound-back', 'music/hackbeat.mp3');
        this.load.audio('jump', 'music/jump.wav');
        this.load.audio('fall', 'music/fall.wav');
    }    
 
    create(){
        this.scene.start('MenuScene');   
    }
}