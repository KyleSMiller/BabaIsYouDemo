MyGame.systems.winning = (function(){
    "use strict";

    let hasWon = false;
    let particleSystems = [];
    let postWinDelay = 2500;  // milliseconds to wait after winning before advancing to the next level
    let timeSinceWin = 0;
    
    function winGame(winningTile){
        hasWon = true;
                
        let sound = new Audio();
        sound.addEventListener('canplay', function(){ this.play(); });
        sound.src = 'sounds/win.mp3';
        sound.play();

        return MyGame.particles.win(winningTile);
    }

    function reset(){
        // called when a new map is loaded to reset the win state
        hasWon = false;
        particleSystems = [];
        timeSinceWin = 0;
    }

    function update(elapsedTime, entities){
        let you = [];
        let win = [];
        let winningTile = null;

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
                    winningTile = win[j];
                }
            }
        }

        if (wonThisTick && !hasWon){
            // we only call win once per flag touch. 
            // don't call it repeatedly while standing on it
            particleSystems = winGame(winningTile);
        }

        if (particleSystems.length != 0){
            for (let edge = 0; edge < particleSystems.length; edge++){
                particleSystems[edge].update(elapsedTime);
            }
        }

        if (hasWon){
            timeSinceWin += elapsedTime;
        }
        if (timeSinceWin >= postWinDelay){
            // reset win state after victory
            reset();
            MyGame.Level.loadLevel(MyGame.Level.currentLevelNum + 1);
        }

    }

    return {
        update: update,
        reset: reset
    };

}());