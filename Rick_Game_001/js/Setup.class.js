function Setup ()
{
    this.audio_eat = new Audio();
    this.audio_die = new Audio();
    this.audio_theme = new Audio();
    this.playerImg = new Image();
    this.enemyImg = new Image();
    this.itemImg = new Image();
    this.audio_eat.src = 'sounds/eat.mp3';
    this.audio_die.src = 'sounds/die.wav';
    this.audio_theme.src = 'sounds/theme.mp3';
    this.playerImg.src = 'img/rick.png';
    this.enemyImg.src = 'img/sprite-monstros.png';
    this.itemImg.src = 'img/sprite-moeda.png';
    this.audio_eat.load();
    this.audio_die.load();
    this.audio_theme.load();
    this.cont = 0;

    this.loadAsset = function () {
        var load = 0;
        var total = 6;

        this.audio_eat.oncanplaythrough = function(){
            load++;
        };
    
        this.audio_die.oncanplaythrough = function(){
            load++;
        };
                
        this.audio_theme.oncanplaythrough = function(){
            load++;
        };

        this.playerImg.onload = function (){
            load++;
        }

        this.enemyImg.onload = function (){
            load++;
        }

        this.itemImg.onload = function (){
            load++;
        }
        
        if(load === total){
            return true;
        }
    }

    this.gameOver = function (ctx, cw, ch, pt) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
        ctx.fillRect(0, 0, cw, ch);
        ctx.fillStyle = 'red';
        ctx.font = '30px sans-serif';
        ctx.textAlign="center";
        ctx.fillText('GAME OVER', cw / 2 , ch / 2 + 10);
        ctx.fillText(pt + ' Pontos', cw / 2 , ch / 2  + 40);
        ctx.font = '15px sans-serif';
        ctx.fillStyle = 'white';
        ctx.fillText('Pressione qualquer tecla para reiniciar!', cw / 2 , ch - 20);
    }
}