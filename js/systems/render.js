MyGame.systems.render = (function(){
    "use strict";

    // Render all entities with both a position and appearance
    // Handles rendering of both animated and static textures
    function renderEntities(entities){
        for (let id in entities) {
            let entity = entities[id];
            if (entity.components.appearance && entity.components.position){
                if (entity.components.appearance.animated){
                    if (entity.components.appearance.imageReady){
                        MyGame.render.AnimatedTexture.render(entity.components.appearance);
                    }
                }
                else{
                    if (entity.components.appearance.imageReady){
                        MyGame.render.Texture.render(entity.components.appearance);
                    }
                }
            }
        }
    }

    function update(elapsedTime, entities){
        renderEntities(entities);
    }

    return {
        update: update
    };
}());