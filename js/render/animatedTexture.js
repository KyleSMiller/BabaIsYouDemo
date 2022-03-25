MyGame.render.AnimatedTexture = (function(graphics){
    "use strict";

    function render(spec){
        graphics.drawSubTexture(spec);
    }

    return {
        render: render
    };

}(MyGame.graphics));