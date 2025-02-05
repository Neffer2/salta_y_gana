export class MainScene extends Phaser.Scene {
    player;
    mContext;
    camera;
    height;
    width;
    grass = [];
    initCameraScrollX; 

    constructor(){
        super('MainScene');
    }  

    preload(){}    

    create(){
        this.mContext = this;
        this.initCameraScrollX = this.camera.scrollX;
    }
    
    update(){
        this.player.setVelocityX(0);
        if (this.camera.scrollX % (this.width - this.initCameraScrollX) == 0){
            console.log("Scroll: "+this.camera.scrollX);
        }
    
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
        this.player = this.physics.add.sprite(200, ((this.height/2) + 150), 'player');
        this.setGrass();
        this.camera = this.cameras.main;
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

    setGrass(){
        for (let i = 0; i < 3; i++){
            let temp_grass = this.physics.add.sprite((this.width - 33), (this.height/2) + 300, 'grass-'+this.getRandomInt(1, 3));
            this.grass.push(temp_grass);
        }
    }

    gameOver(){
        mContext.scene.start('GameOverScene', {score: scoreCounter});
    }
} 