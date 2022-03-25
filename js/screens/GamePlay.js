MyGame.screens["game-screen"] = (function(){
    "use strict";

    let prevTime = performance.now();
    let cancelNextRequest = true;
    let model = null;

    function initialize() {
        console.log("game initalizing...");
    }

    function update(elapsedTime){
        model.update(elapsedTime);
    }

    function gameLoop(timeStamp){
        // ECS model, so input and render handled elsewhere

        let elapsedTime = timeStamp - prevTime;
        prevTime = timeStamp;

        update(elapsedTime);

        if (!cancelNextRequest){
            requestAnimationFrame(gameLoop);
        }

    }

    function run(){
        model = GameModel();

        prevTime = performance.now();
        cancelNextRequest = false;
        newGame();
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize: initialize,
        run: run
    };

}());