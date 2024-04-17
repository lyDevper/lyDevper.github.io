class Simulator {
    static spriteList = [];
    static interval = null;

    static addSprite(sprite) {
        this.spriteList.push(sprite);
    }

    static updateFrame() {
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        for (let sprite of this.spriteList) {
            sprite.update();
            sprite.render();
        }
    }
    static init(fps=24) {
        this.interval = setInterval(() => {
            this.updateFrame();
        }, 1000 / fps);
    }
}