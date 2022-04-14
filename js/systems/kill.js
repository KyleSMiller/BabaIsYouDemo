MyGame.systems.kill = (function(){
    "use strict";
    
    let particleSystems = [];

    function killEntity(entity){
        let idx = MyGame.entities.indexOf(entity);
        MyGame.entities.splice(idx, 1);

        return MyGame.particles.destroyed(entity);
    }

    function update(elapsedTime, entities){
        let ents = [];
        let killObjects = [];

        for (let id in entities) {
            let entity = entities[id];
            if (entity.components.killable && !entity.components.kill){
                ents.push(entity);
            }
            if (entity.components.kill){
                killObjects.push(entity);
            }
        }

        for (let i = 0; i < ents.length; i++){
            for (let j = 0; j < killObjects.length; j++){
                if (ents[i].components.position.x === killObjects[j].components.position.x && ents[i].components.position.y === killObjects[j].components.position.y){
                    particleSystems = killEntity(ents[i]);
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