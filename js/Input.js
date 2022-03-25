MyGame.input.Keyboard = function() {
    let that = {
        keys: {},
        handlers: {}
    };

    let notHeld = [];
    let doNotRepeat = {};
    let pressed = {};

    function keyPress(e) {
        that.keys[e.key] = true;
    }

    function keyRelease(e) {
        delete that.keys[e.key];
        delete doNotRepeat[e.key];
    }

    that.update = function (elapsedTime) {
        pressed = {};
        for (let key in that.keys){
            if (that.keys.hasOwnProperty(key)) {
                if (that.handlers[key]) {
                    if (notHeld.indexOf(key) != -1){  // do not repeatedly call "on press" keys
                        if (!doNotRepeat[key]){
                            that.handlers[key](elapsedTime);
                            pressed[key] = true;
                            doNotRepeat[key] = true;
                        }
                    }
                    else {
                        that.handlers[key](elapsedTime);
                        pressed[key] = true;
                    }
                }
            }
        }
        return pressed;
    };

    that.getPressed = function (elapsedTime) {
        // return the keys that were pressed this frame - account for "on press" keys
        pressed = {};
        for (let key in that.keys){
            if (that.keys.hasOwnProperty(key)) {
                if (notHeld.indexOf(key) != -1){  // do not repeatedly call "on press" keys
                    if (!doNotRepeat[key]){
                        pressed[key] = true;
                        doNotRepeat[key] = true;
                    }
                }
                else {
                    pressed[key] = true;
                }
            }
        }
        return pressed;
    };

    that.register = function (key, handler, held) {
        that.handlers[key] = handler;
        if (held === "press"){  // don't call the key again while it's held - only on new presses
            notHeld.push(key);
        }
    };

    that.rebind = function (oldKeyHandler, newKey) {
        let oldKey = that.getKey(oldKeyHandler);
        let handler = that.handlers[oldKey];
        if (that.handlers[newKey] !== undefined){  // if conflicting binds
            alert("Key already bound to another function!")
            return false;

            // this used to be a cool way to swap keys if they were bound to conflicting things,
            // but that led to nightmares in saving the keys to the browser (due to the keyboard navigation requirements changing mid-assignment)
            // so i guess it just gets to live as a comment from now on. epic
            // let swapHandler = that.handlers[newKey];
            // delete that.handlers[oldKey];
            // delete that.handlers[newKey];
            // that.register(newKey, handler);
            // that.register(oldKey, swapHandler);
            // return oldKey;
        }
        else {
            delete  that.handlers[oldKey];
            that.register(newKey, handler);
            return true;
        }
    }

    that.getKey = function(handler){
        // return the key associated with a given handler
        return Object.keys(that.handlers).find(key => that.handlers[key] === handler);
    }

    window.addEventListener("keydown", keyPress);
    window.addEventListener("keyup", keyRelease);

    return that;
};