MyGame.render.Texture = (function(graphics) {
    'use strict';

    function render(spec){
        graphics.drawTexture(spec);
    }

    return {
        render : render
    };

}(MyGame.graphics));