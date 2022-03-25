
MyGame.screens["controls-screen"] = (function(game, menuControls, gameControls){
    "use strict";

    let cancelNextRequest = true;
    let prevTime = performance.now();
    let menuButtons = {};
    let keyButtons = {};
    let keyFunctions = {};

    // keep track of key that is being rebound so multiple cannot be rebound at once
    let acceptingKeys = {};
    
    function initialize(){
        let upKeyButton = document.getElementById("up-key-button");
        let downKeyButton = document.getElementById("down-key-button");
        let leftKeyButton = document.getElementById("left-key-button");
        let rightKeyButton = document.getElementById("right-key-button");
        let reloadKeyButton = document.getElementById("reload-key-button");

        let backButton = document.getElementById("controls-back");

        keyButtons = {
            'up-key': upKeyButton,
            'down-key': downKeyButton,
            'left-key': leftKeyButton,
            'right-key': rightKeyButton,
            'reload-key': reloadKeyButton,
        };
        
        menuButtons = {
            'up-key': upKeyButton,
            'down-key': downKeyButton,
            'left-key': leftKeyButton,
            'right-key': rightKeyButton,
            'reload-key': reloadKeyButton,
            'back-button': backButton
        };

        keyFunctions = {
            'up-key': gameControls.up,
            'down-key': gameControls.down,
            'left-key': gameControls.left,
            'right-key': gameControls.right,
            'reload-key': gameControls.reload
        };

        acceptingKeys = {};

        showControls();


        // bind new control buttons
        for (let button in keyButtons){
            keyButtons[button].addEventListener(
                "click",
                function() { acceptNewKey(keyButtons[button]); });
        }

        // back button
        backButton.addEventListener(
            "click",
            function() { cancelNextRequest = true; game.openScreen("main-menu-screen");});
    }


    // ###########################
    // #  Key Binding Functions  #
    // ###########################
    function acceptNewKey(keyButton){
        deselectKeys();

        let oldKey = keyButton.innerText;
        acceptingKeys[oldKey] = keyButton;
        keyButton.innerText = "_";
    }

    function rebind(oldKey, newKey){
        // register an existing handler to a new key
        if (oldKey === newKey){
            acceptingKeys = {};
            showControls();
        }
        else{
            // get the handler associated with the key to be rebound
            let keyButton = acceptingKeys[oldKey];
            let label = Object.keys(keyButtons).find(key => keyButtons[key] === keyButton);
            let oldKeyHandler = keyFunctions[label];
            
            let rebound = gameControls.myKeyboard.rebind(oldKeyHandler, newKey);

            // save new key in storage
            if (rebound){
                switch (label){
                    case "up-key": gameControls.saveKey("upKey", newKey); break;
                    case "down-key": gameControls.saveKey("downKey", newKey); break;
                    case "left-key": gameControls.saveKey("leftKey", newKey); break;
                    case "right-key": gameControls.saveKey("rightKey", newKey); break;
                    case "reload-key": gameControls.saveKey("reloadKey", newKey); break;
                }   
            }

            acceptingKeys = {};
            showControls();
        }
    }

    function deselectKeys(){
        // don't let multiple keys be rebound at once
        if (Object.keys(acceptingKeys).length != 0){
            for (let key in acceptingKeys){
                if (acceptingKeys.hasOwnProperty(key)){
                    // reset key button to original text
                    acceptingKeys[key].innerText = key;
                }
            }
        }
    }

    function showControls(){
        // update the button text based off the actual registered key for that function
        for (let button in keyButtons){
            let handler = keyFunctions[button];
            if (gameControls.myKeyboard.getKey(handler) === " "){
                keyButtons[button].innerText = "Space"
            }
            else{
                keyButtons[button].innerText = gameControls.myKeyboard.getKey(handler);
            }
        }
    }


    // ###########################
    // #   Menu loop Functions   #
    // ###########################
    function processInput(elapsedTime) {
        // don't accept navigation input while rebinding a key
        if (Object.keys(acceptingKeys).length == 0){
            menuControls.myKeyboard.update(elapsedTime);   
        }
        else {
            let pressedKeys = menuControls.myKeyboard.getPressed(elapsedTime);
            if (Object.keys(pressedKeys).length !== 0){
                rebind(Object.keys(acceptingKeys)[0], Object.keys(pressedKeys)[0]);
            }
        }
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

}(MyGame.manager, MyGame.MenuKeyboard, MyGame.GameKeyboard));