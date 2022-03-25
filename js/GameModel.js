function GameModel(levelFile, currentLevel) {
    "use strict";
    
    // file reading will be implemented later - just hard-code a level to test
    let tempLevel = `Level-1
    20 x 20
    hhhhhhhhhhhhhhhhhhhh
    h                  h
    h                  h
    h                  h
    h                  h
    h                  h
    h                  h
    h                  h
    h   llllllllllll   h
    h   llllllllllll   h
    h   llllllllllll   h
    h                  h
    h                  h
    h                  h
    h                  h
    h                  h
    h                  h
    h                  h
    h                  h
    hhhhhhhhhhhhhhhhhhhh
                        
                        
                        
                        
                        
         WIS    RIP     
                        
        wwwwwwwwwwww    
             r          
          b  r   f      
             r          
        wwwwwwwwwwww    
                        
         BIY    FIX     
                        
                        
                        
                        
                        
                        `


    let gridWidth = null;
    let gridHeight = null;
    let visualsGrid = [];
    let entityGrid = [];

    function decodeEntity(symbol){  // interpret a symbol in a level file and convert it to an entity
        // TODO: interpret the symbol

        let entity = null;

        MyGame.entities.push(entity);
        return entity;
    }

    // temp testing function
    function placeCat(x, y){
        let cat = Entity.createEntity();
        cat.addComponent(MyGame.components.Position({ x: x, y: y }));
        cat.addComponent(MyGame.components.Moveable({}));

        entityGrid[x][y] = cat;
        MyGame.entities.push(cat);

    }

    function readLevel(){
        // TODO: read in level file

        let levelArray = tempLevel.split(/\r?\n/);
        
        let dimensions = levelArray[1].split("x");
        gridWidth = parseInt(dimensions[0]);
        gridHeight = parseInt(dimensions[1]);

        let visuals = levelArray.slice(2, gridHeight + 2);
        let entities = levelArray.slice(gridHeight + 2, levelArray.length - 1);

        // load visual elements (entities with no properties beyond rendering)
        for (let row = 0; row < visuals.length; row++){
            let cells = visuals[row].split("");
            visualsGrid.push([]);
            for (let cell = 0; cell < cells.length; cell++){
                visualsGrid[row].push(cells[cell]);  // TODO: function that converts smybol to entity
            }
        }

        // load entities
        for (let row = 0; row < entities.length; row++){
            let cells = entities[row].split("");
            entityGrid.push([]);
            for (let cell = 0; cell < cells.length; cell++){
                entityGrid[row].push(cells[cell]);  // TODO: function that converts smybol to entity
            }
        }
    }
    
    function registerKeys(){

        MyGame.GameKeyboard.registerUp(function() {
            for (let id in MyGame.entities){
                let entity = MyGame.entities[id];
                if (entity.components["moveable"]){
                    MyGame.systems.movement.move(entity, 0, -1);
                }
            }
        });

        MyGame.GameKeyboard.registerDown(function() {
            for (let id in MyGame.entities){
                let entity = MyGame.entities[id];
                if (entity.components["moveable"]){
                    MyGame.systems.movement.move(entity, 0, 1);
                }
            }
        });

        MyGame.GameKeyboard.registerLeft(function() {
            for (let id in MyGame.entities){
                let entity = MyGame.entities[id];
                if (entity.components["moveable"]){
                    MyGame.systems.movement.move(entity, -1, 0);
                }
            }
        });

        MyGame.GameKeyboard.registerRight(function() {
            for (let id in MyGame.entities){
                let entity = MyGame.entities[id];
                if (entity.components["moveable"]){
                    MyGame.systems.movement.move(entity, 1, 0);
                }
            }
        });
    }    

    function initalize(){
        readLevel();
        placeCat(10, 10);
        registerKeys();
    }
    
    function update(elapsedTime){
        
    }

    initalize();

    return {
        update: update
    };

}