MyGame.systems.rules = (function(){
    "use strict";

    let rules = {}  // "type": "rule"

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
                    typeLeft = ents[i];  // object blocks can never overlap, so don't account for it
                }
            }
        }
        if (y + 1 <= grid.length[0] - 1){
            ents = MyGame.entitiesAt(x, y + 1);
            for (let i = 0; i < ents.length; i++){
                if (ents[i].components.rule){
                    ruleDown = ents[i];  // object blocks can never overlap, so don't account for it
                }
            }
        }
        if (x + 1 <= grid.length - 1){
            let ents = MyGame.entitiesAt(x + 1, y);
            for (let i = 0; i < ents.length; i++){
                if (ents[i].components.rule){
                    ruleRight = ents[i];  // object blocks can never overlap, so don't account for it
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

    function update(entities, grid){
        // check rule blocks for rules
        rules = {}
        for (let i = 0; i < entities.length; i++){
            if (entities[i].components.type.type === "isBlock"){
                createRules(entities[i], grid);
            }
        }
    }

    return {
        update: update
    };

}());