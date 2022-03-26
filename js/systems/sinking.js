MyGame.systems.sinking = (function(){
    "use strict";

    function sinkEntity(entity){
        let idx = MyGame.entities.indexOf(entity);
        MyGame.entities.splice(idx, 1);
    }

    function update(entities){
        let ents = [];
        let sink = [];

        for (let id in entities) {
            let entity = entities[id];
            if (entity.components.moveable || entity.components.pushable){
                ents.push(entity);
            }
            if (entity.components.sink){
                sink.push(entity);
            }
        }

        for (let i = 0; i < ents.length; i++){
            for (let j = 0; j < sink.length; j++){
                if (ents[i].components.position.x === sink[j].components.position.x && ents[i].components.position.y === sink[j].components.position.y){
                    sinkEntity(ents[i]);
                }
            }
        }

    }

    return {
        update: update
    };

}());