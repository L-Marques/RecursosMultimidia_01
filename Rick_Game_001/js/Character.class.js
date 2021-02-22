function Character (x, y, width, height, img, ns, fd, sw, sh, cw, ch, color = 0, value = 4)
{
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.width = width;
    this.height = height;
    this.state = 'stop';
    this.dead = false;
    this.img = img;
    this.cf = 0;
    this.fd = fd; //frame delay
    this.ns = ns; //numero de sprites
    this.sw = sw;
    this.sh = sh;
    this.canvasWidth = cw;
    this.canvasHeight = ch;
    this.color = color;
    this.value = value;
    this.rItem = 28;
    
    this.movePlayer = function (key) {

        switch (key) {
            case 39:
                this.x += this.speed; //Right
                this.state = 'right';
                if(this.x + this.speed > this.canvasWidth + this.width) {
                    this.x -= this.canvasWidth + this.width * 2;
                }
                break;
            case 40:
                this.y += this.speed; //Down
                this.state = 'down';
                if(this.y + this.speed > this.canvasHeight + this.height) {
                    this.y -= this.canvasHeight + this.height * 2;
                }
                break;
            case 37:
                this.x -= this.speed; //Left
                this.state = 'left';
                if(this.x - this.speed < 0 - this.width) {
                    this.x += this.canvasWidth + this.width;
                }
                break;
            case 38:
                this.y -= this.speed; //Up
                this.state = 'up';
                if(this.y - this.speed < 0 - this.height) {
                    this.y += this.canvasHeight + this.height;
                }
                break;
            case 68:
                this.x += this.speed; //Right
                this.state = 'right';
                if(this.x + this.speed > this.canvasWidth + this.width) {
                    this.x -= this.canvasWidth + this.width * 2;
                }
                break;
            case 83:
                this.y += this.speed; //Down
                this.state = 'down';
                if(this.y + this.speed > this.canvasHeight + this.height) {
                    this.y -= this.canvasHeight + this.height * 2;
                }
                break;
            case 65:
                this.x -= this.speed; //Left
                this.state = 'left';
                if(this.x - this.speed < 0 - this.width) {
                    this.x += this.canvasWidth + this.width;
                }
                break;
            case 87:
                this.y -= this.speed; //Up
                this.state = 'up';
                if(this.y - this.speed < 0 - this.height) {
                    this.y += this.canvasHeight + this.height;
                }
                break;
            default:
                this.y = this.y;
                this.x = this.x;
                this.state = 'stop';
                break;
        }
    };
    
    this.drawPlayer = function (ctx) {
        if (this.cf === this.ns * this.fd){
            this.cf = 0;
        }

        switch (this.state) {
            case 'stop':
                ctx.drawImage(this.img, 0, 0, this.sw, this.sh, this.x, this.y, this.width, this.height);
                break;
            case 'down':
                ctx.drawImage(this.img, Math.floor(this.cf/this.fd) * 125, 0, this.sw, this.sh, this.x, this.y, this.width, this.height);
                break;
            case 'left':
                ctx.drawImage(this.img, Math.floor(this.cf/this.fd) * 125, 163, this.sw, this.sh, this.x, this.y, this.width, this.height);
                break;
            case 'up':
                ctx.drawImage(this.img, Math.floor(this.cf/this.fd) * 125, 326, this.sw, this.sh, this.x, this.y, this.width, this.height);
                break;
            case 'right':
                ctx.drawImage(this.img, Math.floor(this.cf/this.fd) * 125, 489, this.sw, this.sh, this.x, this.y, this.width, this.height);
                break;
            default:
                ctx.drawImage(this.img, 0, 0, this.sw, this.sh, this.x, this.y, this.width, this.height);
                break;
        }

        this.cf++;
    };

    this.moveEnemy = function () {
        var r;
        if(this.count < 80){
            r = this.value;
            this.count++;
        } else {
            r = Math.round(Math.random()*(3-0+1)+0);
            this.value = r;
            this.count = 0;
        }

        switch (r) {
            case 0:
                this.x += this.speed; //Right
                if(this.x + this.speed > this.canvasWidth + this.width) {
                    this.x -= this.canvasWidth + this.width * 2;
                }
                break;
            case 1:
                this.y += this.speed; //Down
                if(this.y + this.speed > this.canvasHeight + this.height) {
                    this.y -= this.canvasHeight + this.height * 2;
                }
                break;
            case 2:
                this.x -= this.speed; //Left
                if(this.x - this.speed < 0 - this.width) {
                    this.x += this.canvasWidth + this.width;
                }
                break;
            case 3:
                this.y -= this.speed; //Up
                if(this.y - this.speed < 0 - this.height) {
                    this.y += this.canvasHeight + this.height;
                }
                break;
            default:
                this.y = this.y;
                this.x = this.x;
                this.state = 'stop';
                break;
        }
    }

    this.drawEnemy = function (ctx) {
        if (this.cf === this.ns * this.fd){
            this.cf = 0;
        }

        switch (this.color) {
            case 1:
                ctx.drawImage(this.img, Math.floor(this.cf/this.fd) * 400, 400, this.sw, this.sh, this.x, this.y, this.width, this.height);
                break;
            case 2:
                ctx.drawImage(this.img, Math.floor(this.cf/this.fd) * 400, 800, this.sw, this.sh, this.x, this.y, this.width, this.height);
                break;
            case 3:
                ctx.drawImage(this.img, Math.floor(this.cf/this.fd) * 400, 0, this.sw, this.sh, this.x, this.y, this.width, this.height);
                break;
            default:
                ctx.drawImage(this.img, Math.floor(this.cf/this.fd) * 400, 0, this.sw, this.sh, this.x, this.y, this.width, this.height);
                break;
        }

        this.cf++;
    }

    this.enemyCollision = function (playerX, playerY, playerWidth, playerHeight) {
        let x2 = this.x + this.width / 2;
        let y2 = this.y + this.height / 2;
        let r = this.rItem;
        let x1 = playerX;
        let y1 = playerY;

        let distX = Math.abs(x2 - x1 - playerWidth / 2);
        let distY = Math.abs(y2 - y1 - playerHeight / 2);

        if (distX > (playerWidth / 2 + r) || distY > (playerHeight / 2 + r)) { 
            return false; 
        }

        if (distX <= (playerWidth / 2) || distY <= (playerHeight / 2)) { 
            return true; 
        }
        

        let dx = distX - playerWidth / 2;
        let dy = distY - playerHeight / 2;

        return (dx * dx + dy * dy <= (r * r));
    }
    
}