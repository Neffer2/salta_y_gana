export class MainScene extends Phaser.Scene {
    player;
    mContext;
    camera;
    height;
    width; 

    constructor(){
        super('MainScene');
    }  

    preload(){}    

    create(){
        this.mContext = this;
    }
    
    update(){
        this.player.setVelocityX(0);
    
        if (this.cursors.right.isDown){
            this.player.setVelocityX(300);
        }if (this.cursors.left.isDown){
            this.player.setVelocityX(-300);
        }
    }
    
    init(){
        this.height = this.sys.game.config.height;
        this.width = this.sys.game.config.width;
        this.add.image(0, 0, 'background').setScale(.8).setOrigin(0).setScrollFactor(0);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = this.physics.add.sprite(200, ((this.height/2) + 100), 'player');
        this.camera = this.cameras.main;
        // this.camera.startFollow(this.player);
        this.camera.startFollow(this.player, true, .5, 1, -(this.player.x), 100);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    } 

    // setTimer(){
    //     let timeInterval = setInterval(() => {
    //         time--;
    //         if (time < 10){scoreTimer.setText(":0"+time);}else {scoreTimer.setText(":"+time);}
    //         if(time == 0){
    //             clearInterval(timeInterval);
    //             mContext.gameOver();
    //         }
    //     }, 1000);
    // }

    gameOver(){
        mContext.scene.start('GameOverScene', {score: scoreCounter});
    }
} 