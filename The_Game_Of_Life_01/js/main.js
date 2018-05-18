window.addEventListener('load', init, false);

function init() {
    canvasApp();
}

function canvasApp() {
    var canvas = document.getElementById('canvas'),
        gen = document.getElementById('gen'),
        ctx = canvas.getContext('2d'),
        width = 1000,
        height = 600,
        resolution = 10,
        fps = 30,
        generation = 0,
    
        grid,
        cols,
        rows;
    
    canvas.width = width;
    canvas.height = height;
    cols = width / resolution;
    rows = height / resolution;
    
    grid = fillArray2D(buildArray2D(cols, rows), cols, rows);
    
    drawScreen();

    function drawScreen() {
        setTimeout(function () {
            
            ctx.fillStyle = '#595959';
            ctx.fillRect(0, 0, width, height);
            
	    for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    let x = i * resolution;
                    let y = j * resolution;
                    if (grid[i][j]){
                        ctx.fillStyle = '#F2F2F2';
                        ctx.fillRect(x, y, resolution-1, resolution-1);
                    }
                }
            }
        
            let next = buildArray2D(cols, rows);
            
            for (let i = 0; i < cols; i++) {
               for (let j = 0; j < rows; j++) {
                   let sum = 0;
                   let neighbors = countNeighbors(grid, i, j, cols, rows);
                   let state = grid[i][j];
                   
                   if(state == 0 && neighbors == 3) {
                       next[i][j] = 1;
                   } else if(state == 1 && (neighbors < 2 || neighbors > 3)) {
                       next[i][j] = 0;
                   } else {
                       next[i][j] = grid[i][j];
                   }
                   
               }
            }
            
            grid = next;
            generation++;
            gen.innerHTML = generation;
            
	    window.requestAnimationFrame(drawScreen);
        },1000/fps);
    }
}



