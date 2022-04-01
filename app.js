class Level extends Phaser.Scene {

    constructor(config) {

        super();

    }

    preload() {

        this.load.image('button', 'assets/bomb.png');
        this.load.image('logo', 'assets/logo.png');

    }

    create() {
        var invadersIcon = this.add.image(120, 34, 'button', 0).setOrigin(0).setInteractive();

        invadersIcon.on('pointerup', function () {
            this.createWindow(ButtonGame)
        }, this);

    }

    createWindow(func) {
        var x = Phaser.Math.Between(400, 600);
        var y = Phaser.Math.Between(64, 128);

        var handle = 'window' + this.count++;

        var win = this.add.zone(x, y, func.WIDTH, func.HEIGHT).setInteractive().setOrigin(0);

        var demo = new func(handle, win);

        this.input.setDraggable(win);

        win.on('drag', function (pointer, dragX, dragY) {

            this.x = dragX;
            this.y = dragY;

            demo.refresh()

        });

        this.scene.add(handle, demo, true);
    }

    resize(width, height) {
        if (width === undefined) { width = this.game.config.width; }
        if (height === undefined) { height = this.game.config.height; }

        this.cameras.resize(width, height);
    }
}

class ButtonGame extends Phaser.Scene {
    create() {
        let clickCount = 0;
        this.clickCountText = this.add.text(100, 200, '');

        const clickButton = this.add.image(700, 300, 'logo', 0)
            .setInteractive()
            .on('pointerdown', () => this.updateClick(++clickCount));
            
        this.updateClick(clickCount);
    }

    updateClick(clickCount) {
        this.clickCountText.setText(`Button has been clicked ${clickCount} times.`);
    }
}

ButtonGame.WIDTH = 400;
ButtonGame.HEIGHT = 400;

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: new Level()
};

var game = new Phaser.Game(config);
