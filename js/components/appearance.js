MyGame.components.Appearance = function(spec){
    "use strict";

    let image = new Image();
    let isReady = false;
    image.onload = function(){
        isReady = true;
    }
    image.src = spec.imageSrc;

    let api = {
        get name() { return "appearance"; },
        get imageSrc() { return spec.imageSrc; },
        get imageReady() { return isReady; },
        get image() { return image; },
        get center() { return spec.center; },
        get size() { return spec.size; },
        get animated() { return spec.animated; }
    }

    return api;

};