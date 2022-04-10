MyGame.screens["game-screen"] = (function(input){
    "use strict";

    let prevTime = performance.now();
    let cancelNextRequest = true;
    let model = null;
    let levelFile = "file://level-all.bbiy";

    function initialize() {
        console.log("game initalizing...");
    }

    function processInput(elapsedTime){
        input.myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime){
        return model.update(elapsedTime);
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
        model = GameModel(levelFile, MyGame.Level.currentLevelNum);

        prevTime = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize: initialize,
        run: run
    };

}(MyGame.GameKeyboard));