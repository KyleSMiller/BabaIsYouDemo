MyGame.systems.sinking = (function(){
    "use strict";

    let particleSystems = [];

    function sinkEntity(entity, sinkObject){
        let idx = MyGame.entities.indexOf(entity);
        MyGame.entities.splice(idx, 1);

        idx = MyGame.entities.indexOf(sinkObject);
        MyGame.entities.splice(idx, 1);

        return MyGame.particles.destroyed(entity);
    }

    function update(elapsedTime, entities){
        let ents = [];
        let sink = [];

        for (let id in entities) {
            let entity = entities[id];
            if (entity.components.sinkable && !entity.components.sink) {
                ents.push(entity);
            }
            if (entity.components.sink){
                sink.push(entity);
            }
        }

        for (let i = 0; i < ents.length; i++){
            for (let j = 0; j < sink.length; j++){
                if (ents[i].components.position.x === sink[j].components.position.x && ents[i].components.position.y === sink[j].components.position.y){
                    particleSystems = sinkEntity(ents[i], sink[j]);
                }
            }
        }

        // particles
        if (particleSystems.length != 0){
            for (let edge = 0; edge < particleSystems.length; edge++){
                particleSystems[edge].update(elapsedTime);
            }
        }

    }

    return {
        update: update
    };

}());