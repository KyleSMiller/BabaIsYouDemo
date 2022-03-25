MyGame.graphics = (function() {
    "use strict";

    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    function clear(){
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    function drawTexture(spec){
        // spec must be an appearance component
        context.save();

        context.translate(spec.center.x, spec.center.y);
        context.rotate(spec.rotation);
        context.translate(-spec.center.x, -spec.center.y);

        context.drawImage(
            spec.image,
            spec.center.x - spec.size.width / 2,
            spec.center.y - spec.size.height / 2,
            spec.size.width, spec.size.height
        );

        context.restore();
    }

    function drawSubTexture(spec){
        // spec must be a game object
        // spec contains: image, index, subTextureWidth, subTextureHeight, center, rotation, size        
        context.save();

        context.translate(spec.center.x, spec.center.y);
        context.rotate(spec.rotation);
        context.translate(-spec.center.x, -spec.center.y);

        context.drawImage(
            spec.image,
            spec.subTextureWidth * spec.index, 0,
            spec.subTextureWidth, spec.subTextureHeight,
            spec.center.x - spec.size.width / 2,
            spec.center.y - spec.size.height / 2,
            spec.size.width, spec.size.height
        );

        context.restore();
    }
    
    return {
        get canvas() { return canvas; },
        clear: clear,
        drawTexture: drawTexture,
        drawSubTexture, drawSubTexture
    };

}());