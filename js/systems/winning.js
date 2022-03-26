MyGame.systems.winning = (function(){
    "use strict";

    let hasWon = false;

    function winGame(){
        hasWon = true;
        // TODO: particles, advance to next level, disable movement
        console.log("YOU WIN!");
    }

    function update(entities){
        let you = [];
        let win = [];

        for (let id in entities) {
            let entity = entities[id];
            if (entity.components.moveable){
                you.push(entity);
            }
            if (entity.components.win){
                win.push(entity);
            }
        }

        let wonThisTick = false;
        for (let i = 0; i < you.length; i++){
            for (let j = 0; j < win.length; j++){
                if (you[i].components.position.x === win[j].components.position.x && you[i].components.position.y === win[j].components.position.y){
                    wonThisTick = true;
                }
            }
            if (!wonThisTick){
                hasWon = false;
            }
        }

        if (wonThisTick && !hasWon){
            // we only call win once per flag touch. 
            // don't call it repeatedly while standing on it
            winGame();
        }

    }

    return {
        update: update
    };

}());