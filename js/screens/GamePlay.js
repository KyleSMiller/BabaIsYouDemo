MyGame.screens["game-screen"] = (function(input){
    "use strict";

    let prevTime = performance.now();
    let cancelNextRequest = true;
    let model = null;
    let levelFile = "file://level-all.bbiy";
    let currentLevel = null;

    function initialize() {
        console.log("game initalizing...");
        currentLevel = 0;
    }

    function processInput(elapsedTime){
        input.myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime){
        model.update(elapsedTime);
    }

    function gameLoop(timeStamp){
        let elapsedTime = timeStamp - prevTime;
        prevTime = timeStamp;

        processInput(elapsedTime);
        let cancelNextRequest = update(elapsedTime);

        if (!cancelNextRequest){
            requestAnimationFrame(gameLoop);
        }

    }

    function run(){
        model = GameModel(levelFile, currentLevel);

        prevTime = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize: initialize,
        run: run
    };

}(MyGame.GameKeyboard));