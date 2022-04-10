MyGame.screens["level-select-screen"] = (function(game){
    "use strict";

    let cancelNextRequest = true;

    let prevTime = performance.now();

    function initialize() {
        let levelListHTML = document.getElementById("level-select-list");

        MyGame.Level.loadLevelFile();

        for (let i = 0; i < MyGame.Level.levelCount; i++){
            let entry = document.createElement("li");
            // create the level select button
            let button = document.createElement("button");
            button.innerHTML = `Level-${i+1}`;
            button.id = `Level-${i}`;
            button.addEventListener(
                "click",
                function(){ 
                    cancelNextRequest = true;
                    MyGame.Level.loadLevel(i);
                    game.openScreen("game-screen");
                });

            entry.appendChild(button);
            levelListHTML.appendChild(entry);
        }

        if (MyGame.Level.levelCount === 0){
            levelListHTML.appendChild(document.createTextNode("NO LEVEL LOADED"));
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