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
    singleJumpBtn;
    doubleJumpBtn;

    constructor(){
        super('MainScene');
    }  

    preload(){}    

    create(){
        this.mContext = this;
        this.initCameraScrollX = this.camera.scrollX;

        this.singleJumpBtn.on('pointerdown', () => {
            this.player.x += 290;
        });

        this.doubleJumpBtn.on('pointerdown', () => {
            this.player.x += 435;
        });
    }
    
    update(){
        this.grass.forEach((grass) => {
            // if (grass.key == 0){
            //     console.log("grass x: "+grass.x);
            //     console.log("Player x: "+this.player.x);
            // }
            if (this.player.x - grass.x  >= 290){
                console.log("grass reset"); 
                this.resetGrass(grass);
            }
        });
    }
    
    init(){
        this.height = this.sys.game.config.height;
        this.width = this.sys.game.config.width;
        this.add.image(0, 0, 'background').setScale(.8).setOrigin(0).setScrollFactor(0);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = this.physics.add.sprite(200, ((this.height/2) + 150), 'player');
        this.singleJumpBtn = this.add.image((this.width/2) - 150, (this.height - 150), 'play-btn').setScale(.5).setInteractive().setScrollFactor(0);
        this.doubleJumpBtn = this.add.image((this.width/2) + 150, (this.height - 150), 'play-btn').setScale(.5).setInteractive().setScrollFactor(0);
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
                temp_grass.key = i;
            }else {
                temp_grass = this.physics.add.sprite(
                    (this.grass[this.grass.length-1].x) + this.space_between_grass[this.getRandomInt(0, 2)], 
                    (this.height/2) + 300, 
                    'grass-'+this.getRandomInt(1, 3));
                temp_grass.key = i;
            }
            this.grass.push(temp_grass);
        }
    }

    resetGrass(grass){
        this.grass[this.grass.length-1].setTint(0xff0000);
        setTimeout(() => {
            this.grass[this.grass.length-1].setTint(0x000000);
        }, 1000);  
        grass.x = (this.grass[this.grass.length-1]).x + this.space_between_grass[this.getRandomInt(0, 2)];
        grass.setTexture('grass-'+this.getRandomInt(1, 3));

        this.swap(this.grass, grass.key, this.grass[this.grass.length-1].key);

        this.grass.forEach((grass) => {
            console.log(grass.key);
        });
    }

    swap(arr, index1, index2) {
        let temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }

    gameOver(){
        mContext.scene.start('GameOverScene', {score: scoreCounter});
    }
} 