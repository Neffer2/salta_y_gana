export class MainScene extends Phaser.Scene {
    player;
    mContext;
    camera;
    height;
    width;
    grass = [];
    initGrassPosition = 200;
    space_between_grass = [290, 435];
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

        this.grass.forEach((grass) => {
            if (this.player.x - grass.x  === 300){
                this.resetGrass(grass);
            }
        });
    
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
        let temp_grass; 

        for (let i = 0; i < 3; i++){
            if (i == 0){
                temp_grass = this.physics.add.sprite(this.initGrassPosition, (this.height/2) + 300, 'grass-'+this.getRandomInt(1, 3));
            }else {
                temp_grass = this.physics.add.sprite(
                    (this.grass[this.grass.length-1].x) + this.space_between_grass[this.getRandomInt(0, 2)], 
                    (this.height/2) + 300, 
                    'grass-'+this.getRandomInt(1, 3));
            }
            this.grass.push(temp_grass);
        }
    }

    resetGrass(grass){
        grass.x = (this.grass[this.grass.length-1].x) + this.space_between_grass[this.getRandomInt(0, 2)];
        grass.setTexture('grass-'+this.getRandomInt(1, 3));
    }

    gameOver(){
        mContext.scene.start('GameOverScene', {score: scoreCounter});
    }
} 