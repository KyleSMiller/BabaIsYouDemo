MyGame.systems.rules = (function(){
    "use strict";

    let rules = {}  // "type": "rule"
    let replacements = {}  // "original": "replacement"
    let prevYou = [];
    let prevWin = [];
    let particleSystems = [];

    function createRules(entity, grid){
        let x = entity.components.position.x;
        let y = entity.components.position.y;
        let blockUp = null;
        let blockLeft = null;
        let blockDown = null;
        let blockRight = null;

        // get the blocks on each side of the isBlock
        if (y - 1 >= 0){  // up
            let ents = MyGame.entitiesAt(x, y - 1);
            for (let i = 0; i < ents.length; i++){
                if (ents[i].components.objectBlock){
                    blockUp = ents[i];  // object blocks can never overlap, so don't account for it
                }
            }
        }
        if (x - 1 >= 0){  // left
            let ents = MyGame.entitiesAt(x - 1, y);
            for (let i = 0; i < ents.length; i++){
                if (ents[i].components.objectBlock){
                    blockLeft = ents[i];
                }
            }
        }
        if (y + 1 <= grid[0].length - 1){  // down
            let ents = MyGame.entitiesAt(x, y + 1);
            for (let i = 0; i < ents.length; i++){
                if (ents[i].components.rule){
                    blockDown = ents[i];
                }
                if (ents[i].components.objectBlock){
                    blockDown = ents[i];
                }
            }
        }
        if (x + 1 <= grid.length - 1){  // right
            let ents = MyGame.entitiesAt(x + 1, y);
            for (let i = 0; i < ents.length; i++){
                if (ents[i].components.rule){
                    blockRight = ents[i];
                }
                if (ents[i].components.objectBlock){
                    blockRight = ents[i];
                }
            }
        }

        // check that surrounding blocks are valid, and if so, create an appropriate rule
        if (blockUp !== null && blockUp.components.objectBlock){
            if (blockDown !== null && blockDown.components.rule){
                // this gets called when there is a block configuration such as "Baba IS You"
                rules[blockUp.components.type.type] = blockDown.components.rule.rule;
            }
            if (blockDown !== null && blockDown.components.objectBlock){
                // this gets called when there is a block configuration such as "Baba IS Rock"
                // so, we remove the first entity and replace it with a new instance of the second entity
                replacements[blockUp.components.type.type] = blockDown.components.associatedEntity.entity;
            }
        }
        if (blockLeft !== null && blockLeft.components.objectBlock){
            if (blockRight !== null && blockRight.components.rule){
                // this gets called when there is a block configuration such as "Baba IS You"
                rules[blockLeft.components.type.type] = blockRight.components.rule.rule;
            }
            if (blockRight !== null && blockRight.components.objectBlock){
                // this gets called when there is a block configuration such as "Baba IS Rock"
                // so, we remove the first entity and replace it with a new instance of the second entity
                replacements[blockLeft.components.type.type] = blockRight.components.associatedEntity.entity;
            }
        }

    }

    function newYou(elapsedTime, prevYou, you){
        // check if new "you" is defined
        let isNewYou = false;
        if (prevYou.length === you.length){
            for (let i = 0; i < you.length; i++){
                if (prevYou[i] !== you[i]){
                    isNewYou = true;
                }
            }
        }
        else{
            isNewYou = true;
        }

        // if new "you" is defined, create particle systems
        if (isNewYou){
            for (let i = 0; i < you.length; i++){
                particleSystems.push(MyGame.particles.newYou(you[i]));
            }

            let sound = new Audio();
            sound.addEventListener('canplay', function(){ this.play(); });
            sound.src = 'sounds/newWin.mp3';
            sound.play();

        }

        // update particles
        if (particleSystems.length != 0){
            for (let i = 0; i < particleSystems.length; i++){
                for (let edge = 0; edge < particleSystems[i].length; edge++){
                    particleSystems[i][edge].update(elapsedTime);
                }
            }
        }
    }

    function newWin(elapsedTime, prevWin, win){
        // check if new "you" is defined
        let isNewWin = false;
        if (prevWin.length === win.length){
            for (let i = 0; i < win.length; i++){
                if (prevWin[i] !== win[i]){
                    isNewWin = true;
                }
            }
        }
        else{
            isNewWin = true;
        }

        // if new "you" is defined, create particle systems
        if (isNewWin){
            for (let i = 0; i < win.length; i++){
                particleSystems.push(MyGame.particles.newWin(win[i]));
            }

            let sound = new Audio();
            sound.addEventListener('canplay', function(){ this.play(); });
            sound.src = 'sounds/newWin.mp3';
            sound.play();

        }

        // update particles
        if (particleSystems.length != 0){
            for (let i = 0; i < particleSystems.length; i++){
                for (let edge = 0; edge < particleSystems[i].length; edge++){
                    particleSystems[i][edge].update(elapsedTime);
                }
            }
        }
    }

    function update(elapsedTime, entities, grid){
        // remove components from all entities
        for (let i = 0; i < entities.length; i++){
            if (entities[i].components.associatedBlock){  // if it has an associated block, a rule can be applied to it
                if (rules[entities[i].components.associatedBlock.block]){
                    entities[i].removeComponent(rules[entities[i].components.associatedBlock.block]());
                }
            }
        }
        
        // check rule blocks for rules
        rules = {}
        replacements = {}
        for (let i = 0; i < entities.length; i++){
            if (entities[i].components.type.type === "isBlock"){
                createRules(entities[i], grid);
            }
        }

        // apply the rules defined by the rule blocks
        let you = [];
        let win = [];
        for (let i = 0; i < entities.length; i++){
            if (entities[i].components.associatedBlock){
                if (rules[entities[i].components.associatedBlock.block]){
                    entities[i].addComponent(rules[entities[i].components.associatedBlock.block]());

                    // keep track of "you" to detect if a new "you" is defined
                    if (entities[i].components.moveable){
                        you.push(entities[i]);
                    }
                    // keep track of "win" to detect if a new "win" is defined
                    if (entities[i].components.win){
                        win.push(entities[i]);
                    }

                }
            }
        }

        // apply the replacements defined by the rule blocks
        for (let i = 0; i < entities.length; i++){
            if (entities[i].components.associatedBlock){
                if (replacements[entities[i].components.associatedBlock.block]){
                    let x = entities[i].components.position.x;
                    let y = entities[i].components.position.y;
                    let size = entities[i].components.appearance.size.width;
                    let replacement = replacements[entities[i].components.associatedBlock.block];

                    entities.splice(i, 1);

                    let replacementEntity = MyGame.defaultEntities[replacement](x, y, size)
                    grid[x][y] = replacementEntity;
                    entities.push(replacementEntity);
                }
            }
        }



        newYou(elapsedTime, prevYou, you);
        prevYou = you;
        you = [];

        newWin(elapsedTime, prevWin, win);
        prevWin = win;
        win = [];

    }

    return {
        update: update
    };

}());