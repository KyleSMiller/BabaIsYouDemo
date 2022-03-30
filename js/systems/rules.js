MyGame.systems.rules = (function(){
    "use strict";

    let rules = {}  // "type": "rule"
    let prevYou = [];
    let prevWin = [];
    let particleSystems = [];

    function createRules(entity, grid){
        let x = entity.components.position.x;
        let y = entity.components.position.y;
        let typeUp = null;
        let typeLeft = null;
        let ruleDown = null;
        let ruleRight = null;

        // get the blocks on each side of the isBlock
        if (y - 1 >= 0){
            let ents = MyGame.entitiesAt(x, y - 1);
            for (let i = 0; i < ents.length; i++){
                if (ents[i].components.objectBlock){
                    typeUp = ents[i];  // object blocks can never overlap, so don't account for it
                }
            }
        }
        if (x - 1 >= 0){
            let ents = MyGame.entitiesAt(x - 1, y);
            for (let i = 0; i < ents.length; i++){
                if (ents[i].components.objectBlock){
                    typeLeft = ents[i];
                }
            }
        }
        if (y + 1 <= grid[0].length - 1){
            let ents = MyGame.entitiesAt(x, y + 1);
            for (let i = 0; i < ents.length; i++){
                if (ents[i].components.rule){
                    ruleDown = ents[i];
                }
            }
        }
        if (x + 1 <= grid.length - 1){
            let ents = MyGame.entitiesAt(x + 1, y);
            for (let i = 0; i < ents.length; i++){
                if (ents[i].components.rule){
                    ruleRight = ents[i];
                }
            }
        }

        // check that surrounding blocks are valid
        if (typeUp !== null && typeUp.components.objectBlock){
            if (ruleDown !== null && ruleDown.components.rule){
                rules[typeUp.components.type.type] = ruleDown.components.rule.rule;
            }
        }
        if (typeLeft !== null && typeLeft.components.objectBlock){
            if (ruleRight !== null && ruleRight.components.rule){
                rules[typeLeft.components.type.type] = ruleRight.components.rule.rule;
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