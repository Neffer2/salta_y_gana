export class PreloadScene extends Phaser.Scene {
    constructor(){
        super('PreloadScene');
    }  

    preload(){
        this.load.setPath('public/assets');
        // Menu
        this.load.image('menu-background', './menu/back.jpg');
        this.load.image('menu-title', 'menu/title.png'); 
        this.load.image('play-btn', 'buttons/play.png');

        // Main scene
        this.load.image('grass-1', 'env/grass_1.png');
        this.load.image('background', 'env/background_tall.jpg');
        this.load.image('single-jump', 'buttons/1jump.png');
        this.load.image('double-jump', 'buttons/2jump.png');
        this.load.image('heart', 'items/heart.png');
        this.load.image('heart_off', 'items/heart_off.png');
        this.load.image('time', 'items/time.png');
        this.load.spritesheet('player', 'characters/capibara.png', { frameWidth: 183.75, frameHeight: 217.3 });  

        // Game Over
        this.load.image('game-over-title', 'game_over/title.png');

        // Sounds
        this.load.audio('sound-back', 'music/hackbeat.mp3');
        this.load.audio('jump', 'music/jump.wav');
        this.load.audio('fall', 'music/fall.wav');
    }    
 
    create(){
        this.scene.start('MenuScene');   
    }
}