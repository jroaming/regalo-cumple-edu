const toggleIdleWalk = 10;
const attackFrames = 20;
const specialFrames = 50;

class Player {

    constructor(pName, cnv, oX, oY, images) {
        this.name = pName;
        this.hp = 100;
        this.stamina = 100;
        
        this.canvas = cnv;

        this.x = oX;
        this.dx = 0;
        this.y = oY;
        
        this.movSpeed = 2.4; // el jugador avanza 2 px/frame
        
        this.idleImg = images[STANCES.idle];
        this.walkImg = images[STANCES.walk];
        this.attackImg = images[STANCES.attack];
        this.specialImg = images[STANCES.special];

        this.currImage = this.idleImg; // this image is the one we are updating according to the gameplay
        this.width = 18;

        // frame index to toggle between 'idle' and 'walk' image:
        this.iFrame = toggleIdleWalk;

        // player movement stop control:
        this.stopFrames = 0;
        this.moveEnabled = true;
        this.isMoving = false;
    }

    update() {
        if (this.stamina < 100) this.stamina++;

        // caminar: avanzar / retroceder
        this.isMoving = this.dx != 0;
        
        // check toggleIdleWalk
        if (this.isMoving && this.moveEnabled) {
            this.x += this.dx * this.movSpeed;
            this.dx = 0;
        
            this.iFrame--;
            if (this.iFrame <= 0) {
                this.iFrame = toggleIdleWalk;
                
                if (this.currImage == this.idleImg) this.currImage = this.walkImg;
                else if (this.currImage == this.walkImg) this.currImage = this.idleImg;
                //else this.currImage = this.walkImg;
            }
        }

        // check player movement
        this.stopFrames--;
        if (!this.moveEnabled && this.stopFrames <= 0) {
            this.moveEnabled = true;
            this.currImage = this.idleImg;
        }
    }

    dxTo(dir) {
        if (!this.moveEnabled) return
        if ((this.x <= 0 && dir <= 0) || (this.x >= VIEWPORT_WIDTH * SCALE && dir >= 0)) return
        this.dx += dir;
    }

    attack(enemyPlayer) {
        if (!this.moveEnabled || this.stamina < attackFrames*3) return;
        this.currImage = this.attackImg;
        this.stamina -= attackFrames*3;


        this.moveEnabled = false;
        this.stopFrames = attackFrames;

        if (Math.abs(this.x - enemyPlayer.x) <= 20 * SCALE) {
            enemyPlayer.hp -= 10;
            soundController.playHitSFX();
            if (enemyPlayer.hp <= 0) {
                console.log("Winner!");
                gameOver();
            }
        }
    }

    special(enemyPlayer) {
        if (!this.moveEnabled || this.stamina < specialFrames*2) return;
        this.currImage = this.specialImg;
        this.stamina -= specialFrames * 2;

        this.moveEnabled = false;
        this.stopFrames = specialFrames;

        if (Math.abs(this.x - enemyPlayer.x) <= 30 * SCALE) {
            enemyPlayer.hp -= 20;
            soundController.playSpecialSFX();
            if (enemyPlayer.hp <= 0) {
                console.log("Winner!");
                gameOver();
            }
        }
    }
    
    render(flip) {
        
        if (flip) {
            image(this.currImage.data, this.x - ((this.currImage.data.width * SCALE)/2), this.y, this.currImage.data.width * SCALE, this.currImage.data.height * SCALE);
        } else {
            push();
            scale(-1, 1);
            image(this.currImage.data, -this.x + ((this.currImage.data.width * SCALE)/2), this.y, -this.currImage.data.width * SCALE, this.currImage.data.height * SCALE);
            pop();
        }

    }
}