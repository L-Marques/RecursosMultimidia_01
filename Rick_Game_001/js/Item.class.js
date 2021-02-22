function Item (x, y, width, height, img, ns, fd, sw, sh, rItem, cw, ch)
{
    this.x = x + width / 2;
    this.y = y + height / 2;
    this.speed = 3;
    this.width = width;
    this.height = height;
    this.img = img;
    this.cf = 0;
    this.fd = fd; //frame delay
    this.ns = ns; //numero de sprites
    this.sw = sw;
    this.sh = sh;
    this.rItem = rItem; // raio
    this.canvasWidth = cw;
    this.canvasHeight = ch;
    
    this.collision = function (playerX, playerY, playerWidth, playerHeight) {
        let distX = Math.abs(this.x - playerX - playerWidth / 2);
        let distY = Math.abs(this.y - playerY - playerHeight / 2);

        if (distX > (playerWidth / 2 + this.rItem) || distY > (playerHeight / 2 + this.rItem)) { 
            return false; 
        }

        if (distX <= (playerWidth / 2) || distY <= (playerHeight / 2)) { 
            return true; 
        }
        
        let dx = distX - playerWidth / 2;
        let dy = distY - playerHeight / 2;
        
        return (dx*dx+dy*dy <= (this.rItem * this.rItem));
    }
    
    this.draw = function (ctx) {
        if (this.cf === this.ns * this.fd){
            this.cf = 0;
        }
      
        ctx.drawImage(this.img, Math.floor(this.cf/this.fd) * 110, 0, this.sw, this.sh, this.x, this.y, this.width, this.height);
               
        this.cf++;
    };
}