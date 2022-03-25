MyGame.systems.movement = (function(){
    "use strict";

    function move(entity, xDist, yDist){
        // distance is measured in number of cells

        // TODO: check for collision and pushing
        let canMove = true;

        if (canMove){
            entity.components.position.x = entity.components.position.x + xDist;
            entity.components.position.y = entity.components.position.y + yDist;
        }
    }

    return {
        move: move
    };

}());