MyGame.screens["main-menu-screen"] = (function(game){
    "use strict";

    let menuButtons = {};
    let cancelNextRequest = true;

    let prevTime = performance.now();

    function initialize() {
        // let newGameButton = document.getElementById("new-game-button");
        let levelSelectButton = document.getElementById("level-select-button");
        let controlsButton = document.getElementById("controls-button");
        let creditsButton = document.getElementById("credits-button");
        
        menuButtons = {
            // 'game-screen': newGameButton,
            'level-select-screen': levelSelectButton,
            'controls-screen': controlsButton,
            'credits-screen': creditsButton
        }
        
        // --- set up button functionality ---
        for (let button in menuButtons){
            if (menuButtons.hasOwnProperty(button)){
                menuButtons[button].addEventListener(
                    "click",
                    function() { cancelNextRequest = true; game.openScreen(button); });
            }
        }
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

    function run(){
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