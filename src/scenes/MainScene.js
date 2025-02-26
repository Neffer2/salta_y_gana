export class MainScene extends Phaser.Scene {
    player;
    camera;
    height;
    width;
    grass = [];
    initGrassPosition = 275;
    space_between_grass = [304, 456];
    initCameraScrollX; 
    singleJumpBtn;
    doubleJumpBtn;
    scoreText;
    scoreTimer;
    scoreCounter = 0;
    timer = 30;
    gameOVer = false; 
    jumpSound;
    fallSound;
    allowFallSound = true;
    timeInterval;
    lives = [];

    constructor(){
        super('MainScene');
    }  

    preload(){}    

    create(){
        this.initCameraScrollX = this.camera.scrollX;
        this.setTimer();
        this.getLives();    

        this.singleJumpBtn.on('pointerdown', () => {
            this.singleJumpBtn.setScale(.8);
            if (!this.gameOVer){
                this.player.anims.play('jump', true);
                this.jumpSound.play();
                this.player.x += 304;
                this.scoreCounter++;
                this.scoreText.setText(this.scoreCounter);
            }
        });

        this.singleJumpBtn.on('pointerup', () => {
            this.singleJumpBtn.setScale(1);
        });

        this.doubleJumpBtn.on('pointerdown', () => {
            this.doubleJumpBtn.setScale(.8);
            if (!this.gameOVer){
                this.player.anims.play('jump', true);
                this.jumpSound.play();
                this.player.x += 456;
                this.scoreCounter++;
                this.scoreText.setText(this.scoreCounter);
            }
        });

        this.doubleJumpBtn.on('pointerup', () => {
            this.doubleJumpBtn.setScale(1);
        });

        this.physics.add.collider(this.player, this.grass);
    }
    
    update(){
        if (this.player.x - this.grass[0].x >= 290){
            this.resetGrass(this.grass[0]);
        }

        if (!this.gameOVer){
            this.player.setVelocityY(900);
        }
        
        if (this.player.y > 871.5){
            if (this.player.lives > 0 && this.allowFallSound){
                this.fallSound.play()
                this.player.lives--;
                this.allowFallSound = false;
                this.resetGame();
                this.getLives();

                setTimeout(() => {
                    this.allowFallSound = true;
                }, 1000);
            }else if (this.player.lives === 0 && this.allowFallSound){
                this.fallSound.play()
                this.allowFallSound = false;
                this.gameOver();
            }
        }
    }
    
    init(){
        this.height = this.sys.game.config.height;
        this.width = this.sys.game.config.width;
        this.add.image(0, 0, 'background').setOrigin(0).setScrollFactor(0);

        let miniPlayer = this.add.image(20, 110, 'player').setScale(0.3).setOrigin(0).setScrollFactor(0);
        this.scoreText = this.add.text(miniPlayer.x + 90, 115, this.scoreCounter, { font: '50px LuckiestGuy', fill: '#ffffff' }).setScrollFactor(0);

        this.add.image(this.width - 150, 65, 'time').setScale(1).setScrollFactor(0);
        this.scoreTimer = this.add.text(this.width - 165, 43, "00:"+this.timer, { font: '30px LuckiestGuy', fill: '#833B1C' }).setScrollFactor(0);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = this.physics.add.sprite(270, ((this.height/2) + 150), 'player').setScale(.5).setDepth(1).setSize(100, 130);    
        this.player.lives = 3;
        this.singleJumpBtn = this.add.image((this.width/2) - 150, (this.height - 150), 'single-jump').setScale(1).setInteractive().setScrollFactor(0).setDepth(1);
        this.doubleJumpBtn = this.add.image((this.width/2) + 150, (this.height - 150), 'double-jump').setScale(1).setInteractive().setScrollFactor(0).setDepth(1);
        this.setGrass();
        this.camera = this.cameras.main;
        this.camera.startFollow(this.player, true, .05, .0000001, -(this.player.x + 60), 100);

        this.jumpSound = this.sound.add('jump', { loop: false });
        this.fallSound = this.sound.add('fall', { loop: false });

        // Animations
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 23 }),
            frameRate: 100,
            repeat: 0
        });
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    getLives(){
        let temp_heart;

        this.lives.forEach((heart) => {
            heart.destroy();
        });

        for (let i = 0; i < 3; i++){
            if (this.player.lives > i){
                temp_heart = this.add.image(50 + (i * 70), 65, 'heart').setScale(1).setScrollFactor(0);
            }else {
                temp_heart = this.add.image(50 + (i * 70), 65, 'heart_off').setScale(1).setScrollFactor(0);
            }
            this.lives.push(temp_heart);
        }
    }

    setTimer(){
        this.timeInterval = setInterval(() => {
            this.timer--;
            if (this.timer < 10){ this.scoreTimer.setText("00:0"+this.timer);}else {this.scoreTimer.setText("00:"+this.timer);}
            if(this.timer == 0){
                clearInterval(this.timeInterval);
                this.gameOver();
            }
        }, 1000);
    }

    setGrass(){
        let temp_grass; 

        this.grass.forEach((grass) => {
            grass.destroy();
        });

        for (let i = 0; i < 50; i++){
            if (i == 0){
                temp_grass = this.physics.add.sprite(this.initGrassPosition, (this.height/2) + 500, 'grass-1').setScale(.5, 1);
                temp_grass.key = i;
            }else {
                temp_grass = this.physics.add.sprite(
                    (this.grass[this.grass.length-1].x) + this.space_between_grass[this.getRandomInt(0, 2)], 
                    (this.height/2) + 500, 
                    'grass-1').setScale(.5, 1);
                temp_grass.key = i;
            }

            temp_grass.setImmovable(true);
            this.grass.push(temp_grass);
        }
    } 

    resetGrass(grass){
        grass.x = (this.grass[this.grass.length-1]).x + this.space_between_grass[this.getRandomInt(0, 2)];
        this.swap(this.grass, grass.key, this.grass[this.grass.length-1].key);
    }

    swap(arr, index1, index2) {
        let temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }

    resetGame(){
        setTimeout(() => {
            this.scoreCounter = 0;
            this.scoreText.setText(this.scoreCounter);
            this.player.x = 270;
            this.player.y = ((this.height/2) + 150);
            this.player.anims.play('jump', true);
            this.setGrass();
        }, 1000);        
    }

    gameOver(){
        this.gameOVer = true;
        clearInterval(this.timeInterval);
        setTimeout(() => {
            this.scene.stop('MainScene');
            this.scene.start('GameOverScene', {score: this.scoreCounter});
        }, 2000);
    }
} 