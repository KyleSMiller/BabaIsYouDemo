MyGame.components.Appearance = function(spec){
    "use strict";

    let image = new Image();
    let isReady = false;
    image.onload = function(){
        isReady = true;
    }
    image.src = spec.imageSrc;

    let timeSinceFrame = 0;

    function nextFrame(elapsedTime){
        timeSinceFrame += elapsedTime;

        while (timeSinceFrame > spec.animation.frameTime){
            if (spec.animation.index === spec.animation.frames){
                spec.animation.index = 0;
            }
            else{
                spec.animation.index += 1;
            }
            timeSinceFrame -= spec.animation.frameTime;
        }
    }

    let api = {
        get name() { return "appearance"; },
        get imageSrc() { return spec.imageSrc; },
        get imageReady() { return isReady; },
        get image() { return image; },
        get size() { return spec.size; },
        get subTextureWidth() { return spec.animation.subTextureWidth },
        get subTextureHeight() { return spec.animation.subTextureHeight },
        get index() { return spec.animation.index },
        get animated() { return spec.animated; },
        nextFrame: nextFrame
    }

    return api;

};