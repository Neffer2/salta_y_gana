import { Boot } from './scenes/Boot.js';
import { PreloadScene } from './scenes/PreloadScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { MainScene } from './scenes/MainScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';

// Configuracion general
const config = {
    // Phaser.AUTO, intenta usa WebGL y si el navegador no lo tiene, usa canva.
    type: Phaser.AUTO,
    parent: 'game-container',
    height: 1280,
    width: 720,
    backgroundColor: '#0000',
    scene: [Boot, PreloadScene, MenuScene, MainScene, GameOverScene],
    scale: {
        mode: Phaser.Scale.FIT
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            // gravity: { y: 580 }
        }
    }
}

// Inicializacion del objeto
export const game = new Phaser.Game(config)