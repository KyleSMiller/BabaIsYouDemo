// This is used to define the default properties for particle effects

MyGame.particles = (function (){
    "use strict";
    
    function getEdges(entity){
        let edges = [];

        // not sure why the +10 offset is needed, but it is
        // top edge
        edges.push({
            x1: entity.components.position.x * entity.components.appearance.size.width - entity.components.appearance.size.width / 2 + 10,
            x2: entity.components.position.x * entity.components.appearance.size.width + entity.components.appearance.size.width / 2 + 10,
            y1: entity.components.position.y * entity.components.appearance.size.height - entity.components.appearance.size.height / 2 + 10,
            y2: entity.components.position.y * entity.components.appearance.size.height - entity.components.appearance.size.height / 2 + 10
        });
        // bottom edge
        edges.push({
            x1: entity.components.position.x * entity.components.appearance.size.width - entity.components.appearance.size.width / 2 + 10,
            x2: entity.components.position.x * entity.components.appearance.size.width + entity.components.appearance.size.width / 2 + 10,
            y1: entity.components.position.y * entity.components.appearance.size.height + entity.components.appearance.size.height / 2 + 10,
            y2: entity.components.position.y * entity.components.appearance.size.height + entity.components.appearance.size.height / 2 + 10
        });
        // left edge
        edges.push({
            x1: entity.components.position.x * entity.components.appearance.size.width - entity.components.appearance.size.width / 2 + 10,
            x2: entity.components.position.x * entity.components.appearance.size.width - entity.components.appearance.size.width / 2 + 10,
            y1: entity.components.position.y * entity.components.appearance.size.height - entity.components.appearance.size.height / 2 + 10,
            y2: entity.components.position.y * entity.components.appearance.size.height + entity.components.appearance.size.height / 2 + 10
        });
        // right edge
        edges.push({
            x1: entity.components.position.x * entity.components.appearance.size.width + entity.components.appearance.size.width / 2 + 10,
            x2: entity.components.position.x * entity.components.appearance.size.width + entity.components.appearance.size.width / 2 + 10,
            y1: entity.components.position.y * entity.components.appearance.size.height - entity.components.appearance.size.height / 2 + 10,
            y2: entity.components.position.y * entity.components.appearance.size.height + entity.components.appearance.size.height / 2 + 10
        });

        return edges;
    }

    let win = function(entity){

        let particleSystems = [];
        let edges = getEdges(entity);
        for (let i = 0; i < edges.length; i++){
            particleSystems.push(MyGame.systems.ParticleSystem({
                range: edges[i],
                size: { mean: 5, stdev: 2 },
                speed: { mean: 10, stdev: 25 },
                lifetime: { mean: 0.25, stdev: 0.1 },
                duration: 0.75,  // in seconds
                image: "images/particle_win.png"
            }));
        };
        
        return particleSystems;
    }

    let newWin = function(entity){

        let particleSystems = [];
        let edges = getEdges(entity);
        for (let i = 0; i < edges.length; i++){
            particleSystems.push(MyGame.systems.ParticleSystem({
                range: edges[i],
                size: { mean: 5, stdev: 2 },
                speed: { mean: 10, stdev: 25 },
                lifetime: { mean: 0.25, stdev: 0.1 },
                duration: 0.75,  // in seconds
                image: "images/particle_newWin.png"
            }));
        };
        
        return particleSystems;
    }

    return {
        win: win
    };
}());