MyGame.systems.movement = (function(){
    "use strict";

    function move(entity, xDist, yDist){
        // distance is measured in number of cells

        let canMove = false;
        if (entity.components.position){

            // check if space is occupied by a block with the "STOP" property
            // assumes entity is only moving 1 square in a single direction at a time
            canMove = true;
            if (xDist !== 0){
                let entityList = MyGame.entitiesAt(entity.components.position.x + xDist, entity.components.position.y);
                for (let e = 0; e < entityList.length; e++){
                    if (entityList[e].components.stop){
                        canMove = false;
                    }
                    // handle pushing
                    if (entityList[e].components.pushable){
                        canMove = move(entityList[e], xDist, yDist);
                    }
                }
            }
            else if (yDist !== 0){
                let entityList = MyGame.entitiesAt(entity.components.position.x, entity.components.position.y + yDist)
                for (let e = 0; e < entityList.length; e++){
                    if (entityList[e].components.stop){
                        canMove = false;
                    }
                    // handle pushing
                    if (entityList[e].components.pushable){
                        canMove = move(entityList[e], xDist, yDist);
                    }
                }
            }

            if (canMove){
                entity.components.position.x = entity.components.position.x + xDist;
                entity.components.position.y = entity.components.position.y + yDist;
            }
        }
        return canMove;
    }

    return {
        move: move
    };

}());