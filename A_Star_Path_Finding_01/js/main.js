window.addEventListener('load', init, false);

function init() {
    canvasApp();
}

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    width = 700,
    height = 500,
    fps = 30,
    cols = 70,
    rows = 50,
    grid = buildArray2D(cols, rows),
    openSet = [],
    closedSet = [],
    w = width / cols, // width and height for it cell 
    h = height / rows, // definição do tamanho de cada célula no grid
    path = [],
    start,
    end,
    noSolution = false;
    canvas.width = width;
    canvas.height = height;

function canvasApp() 
{

    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            grid[i][j] = new Spot(i, j);
        }
    }

    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            grid[i][j].addNeighbors(grid);
        }
    }

    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    
    start.wall = false;
    end.wall = false; // para garantir que o começo e o fim nunca sejam obstáculos
    openSet.push(start);

    console.table(grid);   
    drawScreen();

    function drawScreen() {
        setTimeout(function () {
            
            ctx.fillStyle = '#595959';
            ctx.fillRect(0, 0, width, height);
            
            if(openSet.length > 0) {
                
                var winner = 0; // lowestIndex
                for(var j = 0; j < openSet.length; j++){
                    if(openSet[j].f < openSet[winner].f){
                        winner = j;
                    }
                }

                var current = openSet[winner];

                if(current === end) {
                    for(var i = 0; i < cols; i++){
                        for(let j = 0; j < rows; j++){
                            grid[i][j].show("#FFFFFF");
                        }
                    }

                    for(var i = 0;i < closedSet.length; i++){
                        closedSet[i].show("#FF0000");
                    }

                    for(var i = 0; i < openSet.length; i++){
                        openSet[i].show("#00FF00");
                    }

                    path[path.length - 1] = end;
                    
                    for(var i = 0; i < path.length; i++){
                        path[i].show("#0000FF");
                    }

                    console.log(path);
                    
                    console.log("DONE");
                    
                    return false;
                }

                removeFromArray(openSet, current);
                closedSet.push(current);

                var neighbors = current.neighbors;

                for (var i = 0; i < neighbors.length; i++){
                    var neighbor = neighbors[i];
                    
                    if(!closedSet.includes(neighbor) && !neighbor.wall){
                        var tempG = current.g + 1;
                        
                        var newPath = false;
                        
                        if(openSet.includes(neighbor)){
                            if(tempG < neighbor.g){
                                neighbor.g = tempG;
                                newPath = true;
                            }
                        } else {
                            neighbor.g = tempG;
                            newPath = true;
                            openSet.push(neighbor);
                        }
                        
                        if(newPath){
                            neighbor.h = heuristic(neighbor, end);
                            neighbor.f = neighbor.g + neighbor.h;

                            neighbor.previous = current;   
                        }
                    }
                }

            } else {
                for(var i = 0; i < cols; i++){
                    for(let j = 0; j < rows; j++){
                        grid[i][j].show("#FFFFFF");
                    }
                }

                for(var i = 0;i < closedSet.length; i++){
                    closedSet[i].show("#FF0000");
                }

                for(var i = 0; i < openSet.length; i++){
                    openSet[i].show("#00FF00");
                }

                for(var i = 0; i < path.length; i++){
                    path[i].show("#0000FF");
                }
                
                noSolution = true;
                return false;
            }

            for(var i = 0; i < cols; i++){
                for(let j = 0; j < rows; j++){
                    grid[i][j].show("#FFFFFF");
                }
            }

            for(var i = 0;i < closedSet.length; i++){
                closedSet[i].show("#FF0000");
            }

            for(var i = 0; i < openSet.length; i++){
                openSet[i].show("#00FF00");
            }
            
            if(!noSolution){
                // Encontrar o melhor caminho possível
                path = [];

                var temp = current;

                path.push(temp);
                while(temp.previous) {
                    path.push(temp.previous);
                    temp = temp.previous;
                }   
            }
            
            for(var i = 0; i < path.length; i++){
                path[i].show("#0000FF");
            }
            
            window.requestAnimationFrame(drawScreen);
        },1000/fps);
    }
}


