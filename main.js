// global object variables
let VIEWPORT_WIDTH = 160;
let VIEWPORT_HEIGHT = 100;
let SCALE = 5;

var imageLoader;
var gameIsOver = false;
var p1, p2;
var newP1, newP2;

function preload() {
    imageLoader = new ImageLoader();
    imageLoader.init();
}

function setup() {
    this.canvas = createCanvas(VIEWPORT_WIDTH * SCALE, VIEWPORT_HEIGHT * SCALE);
    frameRate(60);
    noStroke(); // removes shape outlines
    noSmooth(); // removes image compression

    p1 = new Player("Rubén", this.canvas, (VIEWPORT_WIDTH/2 - 50) * SCALE, 60 * SCALE, this.imageLoader.rubenImages);
    p2 = new Player("Edu", this.canvas, (VIEWPORT_WIDTH/2 + 50) * SCALE, 60 * SCALE, this.imageLoader.eduImages);
}

function draw() {
    clear();
    checkInput();

    fill("#FF0000");
    rect(p1.x, p1.y, p1.width*SCALE, 20);
    rect(p2.x, p2.y, p2.width*SCALE, 20);

    // draw ps total life bar (background):
    fill("#003300");
    rect(100, 20, 100*2, 20);
    rect(VIEWPORT_WIDTH * SCALE - 100, 20, -100*2, 20);

    fill("#00FF00");
    rect(100, 20, p1.hp*2, 20); // draw p1 life bar
    rect(VIEWPORT_WIDTH * SCALE - 100, 20, -p2.hp*2, 20); // draw p2 life bar
    
    p1.update();
    p2.update();
    
    var flip = p2.x < p1.x;
    p1.render(!flip);
    p2.render(flip);
    
    if (gameIsOver) {
        fill('rgba(0, 0, 0, 0.7)');
        rect(0, 0, VIEWPORT_WIDTH * SCALE, VIEWPORT_HEIGHT * SCALE);

        fill("#FFFF00");
        textSize(40);
        textAlign(CENTER, CENTER)
        text((p2.hp <= 0 ? p1.name : p2.name)  + " gana!", VIEWPORT_WIDTH*SCALE/2, VIEWPORT_HEIGHT*SCALE/2);

    } else {    
        fill("white");
        textSize(20);
        textAlign(RIGHT, BOTTOM)
        text(p1.name, (19) * SCALE, 42);
        textAlign(LEFT, BOTTOM)
        text(p2.name, (VIEWPORT_WIDTH - 19) * SCALE, 42);
    }
}

function gameOver() {
    gameIsOver = true;
}

function resetGameWithPlayers(name) {
    console.log("p selected (for " + ((newP1 == null) ? "player 1":"player 2") + "): " + name);
    var targetPlayer;
    switch(name) {
        case "ruben":
            targetPlayer = new Player("Rubén", this.canvas, 0, 0, this.imageLoader.rubenImages);
            document.getElementById("pRubenId").disabled = true;
            break;
        case "edu":
            targetPlayer = new Player("Edu", this.canvas, 0, 0, this.imageLoader.eduImages);
            document.getElementById("pEduId").disabled = true;
            break;
        case "corbi":
            targetPlayer = new Player("Corbi", this.canvas, 0, 0, this.imageLoader.corbiImages);
            document.getElementById("pCorbiId").disabled = true;
            break;
        case "gabi":
            targetPlayer = new Player("Gabi", this.canvas, 0, 0, this.imageLoader.gabiImages);
            document.getElementById("pGabiId").disabled = true;
            break;
        case "mariam":
            targetPlayer = new Player("Mariam", this.canvas, 0, 0, this.imageLoader.mariamImages);
            document.getElementById("pMariamId").disabled = true;
            break;
        case "anna":
            targetPlayer = new Player("Anna", this.canvas, 0, 0, this.imageLoader.annaImages);
            document.getElementById("pAnnaId").disabled = true;
            break;
        case "mario":
            targetPlayer = new Player("Mario", this.canvas, 0, 0, this.imageLoader.marioImages);
            document.getElementById("pMarioId").disabled = true;
            break;
        case "carlos":
            targetPlayer = new Player("Carlos", this.canvas, 0, 0, this.imageLoader.carlosImages);
            document.getElementById("pCarlosId").disabled = true;
            break;
    
    }

    if (newP1 == null) {
        newP1 = targetPlayer;
    } else {
        newP2 = targetPlayer;
    }

    if (newP1 != null && newP2 != null) {
        var array = document.getElementById("roaster").children;
        for (var i=0; i<array.length; i++) { array[i].disabled = false; }

        p1 = newP1;
        p1.x = (VIEWPORT_WIDTH/2 - 50) * SCALE;
        p1.y = 60 * SCALE;
        p2 = newP2;
        p2.x = (VIEWPORT_WIDTH/2 + 50) * SCALE;
        p2.y = 60 * SCALE;
        newP1 = null;
        newP2 = null;
        gameIsOver = false;
    }
}
