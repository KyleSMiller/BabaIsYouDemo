MyGame.components.Moveable = function(spec){
    "use strict";

    let elapsedTime = 0;
    
    let api = {
        get name() { return 'moveable'; },
        get elapsedTime() { return elapsedTime; },
        set elapsedTime(value) { elapsedTime = value; }
    }

    return api;

}