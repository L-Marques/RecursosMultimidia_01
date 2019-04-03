function buildArray2D(x,y)
{
    let array = new Array(x);
    
    for (let i = 0; i < array.length; i++) {
        array[i] = new Array(y);
    }
    
    return array;
}

function fillArray2D(grid, cols, rows)
{
    
    for (let i = 0; i < cols; i++){
       for (let j = 0; j < rows; j++){
           grid[i][j] = Math.round(Math.random(2));
       }
    }
            
    return grid;        
}

function Spot(i, j)
{
    this.x = i;
    this.y = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;
    
    if(Math.random() < 0.4){
        this.wall = true;
    }

    this.show = function (color) {
        ctx.fillStyle = color;
        
        if(this.wall){
            ctx.fillStyle = "#000000";
        }
        
        ctx.fillRect(this.x * w, this.y * h, w - 1, h - 1); // representação de cada célula no grid
    }

    this.addNeighbors = function (grid) {
        if(this.x < cols - 1){
            this.neighbors.push(grid[this.x + 1][this.y]);
        }
        if(this.x > 0){
            this.neighbors.push(grid[this.x - 1][this.y]);
        }
        if(this.y < rows - 1){
            this.neighbors.push(grid[this.x][this.y + 1]);
        }
        if(this.y > 0){
            this.neighbors.push(grid[this.x][this.y - 1]);
        }
        if(this.x > 0 && this.y > 0){
            this.neighbors.push(grid[this.x - 1][this.y - 1]);
        }
        if(this.x < cols - 1 && this.y > 0){
            this.neighbors.push(grid[this.x + 1][this.y - 1]);
        }
        if(this.x > 0 && this.y < rows - 1){
            this.neighbors.push(grid[this.x - 1][this.y + 1]);
        }
        if(this.x < cols - 1 && this.y < rows - 1){
            this.neighbors.push(grid[this.x + 1][this.y + 1]);
        }
    }
}

function removeFromArray(arr, element)
{
    for(var i = arr.length - 1; i >= 0; i--) {
        if(arr[i] == element) {
            arr.splice(i, 1);
        }
    }
}

function dist(x1, y1, x2, y2)
{
    var a = x1 - x2;
    var b = y1 - y2;

    var c = Math.sqrt(a * a + b * b);
    
    return c;
}

function heuristic(a, b)
{
    var d = dist(a.x, a.y, b.x, b.y);
    
    return d;
}