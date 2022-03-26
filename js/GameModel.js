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
    let cellSize = null;  // in canvas pixels. cells must be square
    let visualsGrid = [];
    let entityGrid = [];

    function decodeEntity(symbol, x, y){  // interpret a symbol in a level file and convert it to an entity
        // // TODO: interpret the symbol

        // let entity = null;

        // switch(symbol){
        //     case "h": entity = Hedge(x, y, cellSize); break;
        //     case "l": entity = Floor(x, y, cellSize); break;
        //     case "W": entity = 
        // }

        // entity = Cat(10, 10, cellSize);
        // // entity.addComponent(MyGame.components.Moveable({}));
        // entityGrid[10][10] = entity;
        // MyGame.entities.push(entity);

        // return entity;
    }

    function readLevel(){
        // TODO: read in level file

        let levelArray = tempLevel.split(/\r?\n/);
        
        let dimensions = levelArray[1].split("x");
        gridWidth = parseInt(dimensions[0]);
        gridHeight = parseInt(dimensions[1]);

        let canvas = document.getElementById("canvas");
        cellSize = canvas.width / Math.min(gridHeight, gridWidth);  // use canvas width bc canvas is always square

        let visuals = levelArray.slice(2, gridHeight + 2);
        let entities = levelArray.slice(gridHeight + 2, levelArray.length);

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

        let test = WaterBlock(5, 5, cellSize);
        entityGrid[5][5] = test;
        MyGame.entities.push(test);


        registerKeys();
    }
    
    function update(elapsedTime){
        MyGame.systems.render.update(elapsedTime, MyGame.entities)
    }

    initalize();

    return {
        update: update
    };

}