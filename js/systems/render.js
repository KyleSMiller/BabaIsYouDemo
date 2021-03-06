MyGame.systems.render = (function(){
    "use strict";

    // Render all entities with both a position and appearance
    // Handles rendering of both animated and static textures
    function renderEntities(entities, elapsedTime){
        for (let id in entities) {
            let entity = entities[id];
            if (entity.components.appearance && entity.components.position){

                let x = entity.components.position.x
                let y = entity.components.position.y
                let cellSize = entity.components.appearance.size.width;

                if (entity.components.appearance.animated){
                    MyGame.render.AnimatedTexture.render({
                        image: entity.components.appearance.image,
                        center: { x: x * cellSize + (cellSize / 2), y: y * cellSize + (cellSize / 2) },
                        size: entity.components.appearance.size,
                        subTextureWidth: entity.components.appearance.subTextureWidth,
                        subTextureHeight: entity.components.appearance.subTextureHeight,
                        index: entity.components.appearance.index
                    });
                    entity.components.appearance.nextFrame(elapsedTime);
                }
                else{
                    MyGame.render.Texture.render({
                        image: entity.components.appearance.image,
                        center: { x: x * cellSize + (cellSize / 2), y: y * cellSize + (cellSize / 2) },
                        size: entity.components.appearance.size
                    });
                }
            }
        }
    }

    function update(elapsedTime, entities){
        MyGame.graphics.clear();
        renderEntities(entities, elapsedTime);
    }

    return {
        update: update
    };
}());