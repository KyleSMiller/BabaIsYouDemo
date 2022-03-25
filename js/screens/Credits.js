
MyGame.screens["credits-screen"] = (function(game) {
    "use strict";

    let cancelNextRequest = true;
    let prevTime = performance.now();

    let menuButtons = {};

    function initialize(){
        let backButton = document.getElementById("credits-back");

        menuButtons = {
            'back-button': backButton
        };

        backButton.addEventListener(
            "click",
            function() { cancelNextRequest = true; game.returnFromScreen(); });
    }

    function processInput(elapsedTime) {
    }

    function update(elapsedTime){
    }

    function menuLoop(timeStamp){
        let elapsedTime = timeStamp - prevTime;
        prevTime = timeStamp;
        
        processInput(elapsedTime);
        update(elapsedTime);
        
        if (!cancelNextRequest){
            requestAnimationFrame(menuLoop);
        }
    }
    
    function run() {
        // start menu loop
        prevTime = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(menuLoop);
    }

    return {
        initialize: initialize,
        run: run
    };

}(MyGame.manager)); 