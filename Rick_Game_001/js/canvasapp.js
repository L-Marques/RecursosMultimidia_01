$(document).ready(function () {
    var cf = 0;// contador de frames
    var fd = 4;//delay de frames para troca de sprite
    var ns = 5;// numero de sprites da animacao
    var ws = 80;// width sprite
    var hs = 120;// height sprite
    
    var img = new Image();
    img.src = 'img/sprite_ryu.png';
    img.onload = function () {
        desenhaImagem();
    };
    
    function desenhaImagem() {
        setTimeout(function () {
            if (cf === ns*fd)
                cf = 0;
            var canvas = $('#canvas')[0];
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, Math.floor(cf/fd) * 80, 0, 80, 120, 0, 0, 80, 120);
            cf++;
            window.requestAnimationFrame(desenhaImagem);
        }, 1000 / 60);
    }
});