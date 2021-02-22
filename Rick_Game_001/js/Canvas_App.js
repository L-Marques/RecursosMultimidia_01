window.addEventListener('load', init, false);

function init() {
    canvasApp();
}

function canvasApp() {
    var game_setup = new Setup();
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var placar = document.getElementById('placar');
    var pontos = 0;
    placar.innerHTML ='Pontos: ' + pontos;
    var canvas_width = canvas.width;
    var canvas_height = canvas.height;
    var fps = 60;
    var key;

    var loop = setInterval(isLoad, 500);
    
    // Player
    var rc = 30;
    var xPlayer = rc * 2 + parseInt(Math.random() * (canvas_width - rc * 4));
    var yPlayer = rc * 2 + parseInt(Math.random() * (canvas_height - rc * 4));
    
    // Fruit
    var rf = 10;
    var xf = rc * 2 + parseInt(Math.random() * (canvas_width - rc * 4));
    var yf = rc * 2 + parseInt(Math.random() * (canvas_height - rc * 4));
    

    var Player = new Character(canvas_width / 2, canvas_height / 2, 38, 50, game_setup.playerImg, 4, 5, 125, 163, canvas_width, canvas_height);
    var Enemy01 = new Character(10, 0, 130, 130, game_setup.enemyImg, 3, 1, 400, 400, canvas_width, canvas_height, 1, 0);
    var Enemy02 = new Character(50, 0, 130, 130, game_setup.enemyImg, 3, 1, 400, 400, canvas_width, canvas_height, 2, 1);
    var Enemy03 = new Character(200, 0, 130, 130, game_setup.enemyImg, 3, 1, 400, 400, canvas_width, canvas_height, 3, 3);
    var Enemy04 = new Character(150, 350, 130, 130, game_setup.enemyImg, 3, 1, 400, 400, canvas_width, canvas_height, 1, 2);
    var Enemy05 = new Character(400, 350, 130, 130, game_setup.enemyImg, 3, 1, 400, 400, canvas_width, canvas_height, 2, 1);
    var Enemy06 = new Character(600, 350, 130, 130, game_setup.enemyImg, 3, 1, 400, 400, canvas_width, canvas_height, 3, 3);
    var Coin = new Item(xf, yf, 20, 17, game_setup.itemImg, 4, 5, 110, 96, 15, canvas_width, canvas_height);

    game_setup.loadAsset();

    function isLoad() {
        clearInterval(loop);
        drawScreen();

        game_setup.audio_theme.play(); 
        if(game_setup.audio_theme.loop===false){
            game_setup.audio_theme.loop = true; 
        }else{
            game_setup.audio_theme.addEventListener('ended',function(){
                game_setup.audio_theme.currentTime = 0;
                game_setup.audio_theme.play();
                
            },false);
        }
    }


    function drawScreen() {
        setTimeout(function (){
            
            ctx.clearRect(0, 0, canvas_width, canvas_height);
            control();
            
            drawBackground();
            Coin.draw(ctx);
            Player.movePlayer(key);
            Player.drawPlayer(ctx);
            Enemy01.moveEnemy();
            Enemy01.drawEnemy(ctx);
            Enemy02.moveEnemy();
            Enemy02.drawEnemy(ctx);
            Enemy03.moveEnemy();
            Enemy03.drawEnemy(ctx);
            Enemy04.moveEnemy();
            Enemy04.drawEnemy(ctx);
            Enemy05.moveEnemy();
            Enemy05.drawEnemy(ctx);
            Enemy06.moveEnemy();
            Enemy06.drawEnemy(ctx);
            
            
            if (Coin.collision(Player.x, Player.y, Player.width, Player.height)) {
                game_setup.audio_eat.play();
                Coin.x = 10 * 2 + parseInt(Math.random() * (canvas_width - 10 * 4));
                Coin.y = 10 * 2 + parseInt(Math.random() * (canvas_height - 10 * 4));
                pontos += 10;
                placar.innerHTML ='Pontos: ' + pontos;
            }
            if(Enemy01.enemyCollision(Player.x, Player.y, Player.width, Player.height)) {
                game_setup.gameOver(ctx, canvas_width, canvas_height, pontos);
                game_setup.audio_theme.pause();
                game_setup.audio_die.play();
                $(document).keydown(function (e) {
                    location.reload();
                });
                return false;
            } else if (Enemy02.enemyCollision(Player.x, Player.y, Player.width, Player.height)) {
                game_setup.gameOver(ctx, canvas_width, canvas_height, pontos);
                game_setup.audio_theme.pause();
                game_setup.audio_die.play();
                $(document).keydown(function (e) {
                    location.reload();
                });
                return false;
            } else if (Enemy03.enemyCollision(Player.x, Player.y, Player.width, Player.height)) {
                game_setup.gameOver(ctx, canvas_width, canvas_height, pontos);
                game_setup.audio_theme.pause();
                game_setup.audio_die.play();
                $(document).keydown(function (e) {
                    location.reload();
                });
                return false;
            } else if (Enemy04.enemyCollision(Player.x, Player.y, Player.width, Player.height)) {
                game_setup.gameOver(ctx, canvas_width, canvas_height, pontos);
                game_setup.audio_theme.pause();
                game_setup.audio_die.play();
                $(document).keydown(function (e) {
                    location.reload();
                });
                return false;
            } else if (Enemy05.enemyCollision(Player.x, Player.y, Player.width, Player.height)) {
                game_setup.gameOver(ctx, canvas_width, canvas_height, pontos);
                game_setup.audio_theme.pause();
                game_setup.audio_die.play();
                $(document).keydown(function (e) {
                    location.reload();
                });
                return false;
            } else if (Enemy06.enemyCollision(Player.x, Player.y, Player.width, Player.height)) {
                game_setup.gameOver(ctx, canvas_width, canvas_height, pontos);
                game_setup.audio_theme.pause();
                game_setup.audio_die.play();
                $(document).keydown(function (e) {
                    location.reload();
                });
                return false;
            }
            
            window.requestAnimationFrame(drawScreen);
        },1000/fps);
    }
    
    function drawBackground() {
        ctx.fillStyle = "#A55E30";
        ctx.fillRect(0, 0, canvas_width, canvas_height);
    }
    
    function control() {
        $(document).keydown(function (e) {
            key = e.which;
        });

        $(document).keyup(function (e) {
            key = 0;
        });
    }
    
    function randomInt(min,max) {
        return Math.round(Math.random()*(max-min+1)+min);
    }
    
    function collisionEnemy(x1, y1, rSize, x2, y2, r) {
        let distX = Math.abs(x2 - x1-rSize/2);
        let distY = Math.abs(y2 - y1-rSize/2);

        if (distX > (rSize/2 + r) || distY > (rSize/2 + r)) { 
            return false; 
        }

        if (distX <= (rSize/2) || distY <= (rSize/2)) { 
            return true; 
        }
        
        let dx=distX-rSize/2;
        let dy=distY-rSize/2;
        return (dx*dx+dy*dy<=(r*r));
    }  
}

