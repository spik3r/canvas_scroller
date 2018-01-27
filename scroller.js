
var game = new Game();

function init() {
	if(game.init())
		game.start();
}

// Image stuff
var imageRepository = new function() {
	// Define images
	this.empty = null;
	this.background = new Image();
	this.car = new Image();
	
	// Set images src
	this.background.src = "road.jpg";
	this.car.src = "car.png";
}

function Drawable() {	
	this.init = function(x, y) {
		// Defualt variables
		this.x = x;
        this.y = y;
	}

	this.speed = 0;
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	
	this.draw = function() {
	};
}

function Background() {
	this.speed = 1; // Redefine speed of the background for panning
	
	this.draw = function() {
        //move the road
		this.y += this.speed;
        this.context.drawImage(imageRepository.background, this.x, this.y);
        
        // should move this somewhere else
        this.context.drawImage(imageRepository.car, car.x, car.y);

		// redraw road when it's off the screen
		this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);
        this.context.drawImage(imageRepository.car, car.x, car.y);

		// If the image scrolled off the screen, reset
		if (this.y >= this.canvasHeight)
			this.y = 0;
	};
}
// Set Background to inherit properties from Drawable
Background.prototype = new Drawable();
car = new Drawable();

function Game() {

	this.init = function() {
		// Get the canvas element
		this.bgCanvas = document.getElementById('background');
		
		// Test to see if canvas is supported
		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext('2d');
		
			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;
			
			// Setup car & background
            this.background = new Background();
            this.background.init(0,0); 
            car.init(50, 250);
			return true;
		} else {
			return false;
		}
	};
	
	// Start the animation loop
	this.start = function() {
		animate();
	};
}

function animate() {
	requestAnimFrame( animate );
    game.background.draw();


    update(10);
}

// no idea what this does I copied it from stackoverflow :)
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();


// hacky movement shit
var keysDown = {};
addEventListener("keydown", function(e){
        keysDown[e.keyCode] = true;
    e.preventDefault();
}, false);
addEventListener("keyup", function(e){
        delete keysDown[e.keyCode];
         e.preventDefault();
}, false);


function update(speedX){
    // left
    if(37 in keysDown){
        console.log("left");
        if (car.x - speedX > 0) {
            car.x -= speedX;
        }
        else {
            console.log("can't move left");
        }
    }
    //right
    if(39 in keysDown){
        console.log("right");
        if (car.x + 100 + speedX < 800) {
            car.x += speedX;
        }
        else {
            console.log("can't move right");
        }
    }
}

