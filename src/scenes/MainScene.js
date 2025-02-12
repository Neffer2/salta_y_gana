export class MainScene extends Phaser.Scene {
    player;
    camera;
    height;
    width;
    grass = [];
    initGrassPosition = 200;
    space_between_grass = [290, 435];
    initCameraScrollX; 
    singleJumpBtn;
    doubleJumpBtn;
    scoreText;
    scoreTimer;
    scoreCounter = 0;
    timer = 30;
    gameOVer = false; 

    constructor(){
        super('MainScene');
    }  

    preload(){}    

    create(){
        this.initCameraScrollX = this.camera.scrollX;
        this.setTimer();

        this.singleJumpBtn.on('pointerdown', () => {
            if (!this.gameOVer){
                this.player.x += 290;
                this.scoreCounter++;
                this.scoreText.setText(this.scoreCounter);
            }
        });

        this.doubleJumpBtn.on('pointerdown', () => {
            if (!this.gameOVer){
                this.player.x += 435;
                this.scoreCounter++;
                this.scoreText.setText(this.scoreCounter);
            }
        });

        this.physics.add.collider(this.player, this.grass);
    }
    
    update(){
        if (this.player.x - this.grass[0].x >= 290){
            this.resetGrass(this.grass[0]);
        }

        this.player.setVelocityY(900);
        if (this.player.y > 797.5){
            this.gameOver();   
        }
    }
    
    init(){
        this.height = this.sys.game.config.height;
        this.width = this.sys.game.config.width;
        this.add.image(0, 0, 'background').setScale(.8).setOrigin(0).setScrollFactor(0);

        let miniPlayer = this.add.image(20, 20, 'player').setScale(0.5).setOrigin(0).setScrollFactor(0);
        this.scoreText = this.add.text(miniPlayer.x + 90, 28, this.scoreCounter, { font: '50px font1', fill: '#ffffff' }).setScrollFactor(0);
        this.scoreTimer = this.add.text(this.width - 100, 20, ":"+this.timer, { font: '50px font1', fill: '#ffffff' }).setScrollFactor(0);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = this.physics.add.sprite(200, ((this.height/2) + 150), 'player');    
        this.singleJumpBtn = this.add.image((this.width/2) - 150, (this.height - 150), 'play-btn').setScale(.5).setInteractive().setScrollFactor(0);
        this.doubleJumpBtn = this.add.image((this.width/2) + 150, (this.height - 150), 'play-btn').setScale(.5).setInteractive().setScrollFactor(0);
        this.setGrass();
        this.camera = this.cameras.main;
        this.camera.startFollow(this.player, true, .05, .0000001, -(this.player.x + 80), 100);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    } 

    setTimer(){
        let timeInterval = setInterval(() => {
            this.timer--;
            if (this.timer < 10){ this.scoreTimer.setText(":0"+this.timer);}else {this.scoreTimer.setText(":"+this.timer);}
            if(this.timer == 0){
                clearInterval(timeInterval);
                this.gameOver();
            }
        }, 1000);
    }

    setGrass(){
        let temp_grass; 

        for (let i = 0; i < 50; i++){
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

            temp_grass.setImmovable(true);
            this.grass.push(temp_grass);
        }
    } 

    resetGrass(grass){
        grass.x = (this.grass[this.grass.length-1]).x + this.space_between_grass[this.getRandomInt(0, 2)];
        grass.setTexture('grass-'+this.getRandomInt(1, 3));

        this.swap(this.grass, grass.key, this.grass[this.grass.length-1].key);
    }

    swap(arr, index1, index2) {
        let temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }

    gameOver(){
        this.gameOVer = true;
        setTimeout(() => {location.reload();}, 2000);
        // mContext.scene.start('GameOverScene', {score: scoreCounter});
    }
} 