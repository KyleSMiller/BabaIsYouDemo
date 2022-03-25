// this IIFE defines controls for the main game

MyGame.GameKeyboard = (function(input) {
    
    let keyBinds = {};
    let previousKeyBinds = localStorage.getItem("MyGame.keyBinds");

    if (previousKeyBinds !== null){
        keyBinds = JSON.parse(previousKeyBinds);
    }
    else{
        // define default controls
        keyBinds.upKey = "w";
        keyBinds.downKey = "s";
        keyBinds.leftKey = "a";
        keyBinds.rightKey = "d";
        keyBinds.reloadKey = "r";
    }
    
    let that = {
        myKeyboard: input.Keyboard(),
        get upKey() { return keyBinds.upKey },
        get downKey() { return keyBinds.downKey },
        get leftKey() { return keyBinds.leftKey },
        get rightKey() { return keyBinds.rightKey },
        get reloadKey() { return keyBinds.reloadKey },
        // these functions are placeholder and should be properly defined in GameModel.js
        up: function(){ console.log("up"); },
        down: function(){console.log("down");},
        left: function(){console.log("left");},
        right: function(){console.log("right");},
        reload: function(){console.log("reload");}
    };

    that.myKeyboard.register(that.upKey, that.up, "held");
    that.myKeyboard.register(that.downKey, that.down, "held");
    that.myKeyboard.register(that.leftKey, that.left, "held");
    that.myKeyboard.register(that.rightKey, that.right, "held");
    that.myKeyboard.register(that.reloadKey, that.reload, "held");

    // use these functions to register the controls on startup
    that.registerUp = function(handler){
        that.up = handler;
        that.myKeyboard.register(this.upKey, that.up, "held");
    }

    that.registerDown = function(handler){
        that.down = handler;
        that.myKeyboard.register(this.downKey, that.down, "held");
    }

    that.registerLeft = function(handler){
        that.left = handler;
        that.myKeyboard.register(this.leftKey, that.left, "held");
    }

    that.registerRight = function(handler){
        that.right = handler;
        that.myKeyboard.register(this.rightKey, that.right, "held");
    }

    that.registerReload = function(handler){
        that.reload = handler;
        that.myKeyboard.register(this.reloadKey, that.reload, "held");
    }

    that.saveKey = function(key, value){
        keyBinds[key] = value;
        localStorage["MyGame.keyBinds"] = JSON.stringify(keyBinds);
    }

    return that;

}(MyGame.input));