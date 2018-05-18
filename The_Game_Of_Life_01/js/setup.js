
function buildArray2D(x,y){
    let array = new Array(x);
    
    for (let i = 0; i < array.length; i++) {
        array[i] = new Array(y);
    }
    
    return array;
}

function fillArray2D(grid, cols, rows) {
    
    for (let i = 0; i < cols; i++){
       for (let j = 0; j < rows; j++){
           grid[i][j] = Math.round(Math.random(2));
       }
    }
            
    return grid;        
}

function countNeighbors(grid, x, y, cols, rows) {
    let sum = 0;
    
    for (let i = -1; i < 2; i++){
        for (let j = -1; j < 2; j++){
            
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            
            sum += grid[col][row];
        }    
    }
    
    sum -= grid[x][y];
    return sum;
}
