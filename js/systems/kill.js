MyGame.systems.kill = (function(){
    "use strict";

    function killEntity(entity){
        let idx = MyGame.entities.indexOf(entity);
        MyGame.entities.splice(idx, 1);
    }

    function update(entities){
        let ents = [];
        let killObjects = [];

        for (let id in entities) {
            let entity = entities[id];
            if (entity.components.moveable){
                ents.push(entity);
            }
            if (entity.components.kill){
                killObjects.push(entity);
            }
        }

        for (let i = 0; i < ents.length; i++){
            for (let j = 0; j < killObjects.length; j++){
                if (ents[i].components.position.x === killObjects[j].components.position.x && ents[i].components.position.y === killObjects[j].components.position.y){
                    killEntity(ents[i]);
                }
            }
        }

    }

    return {
        update: update
    };

}());