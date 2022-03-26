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
        let entity = null;

        switch(symbol){
            case "h": entity = Hedge(x, y, cellSize); break;
            case "l": entity = Floor(x, y, cellSize); break;
            case "W": entity = WallBlock(x, y, cellSize); break;
            case "I": entity = IsBlock(x, y, cellSize); break;
            case "S": entity = StopBlock(x, y, cellSize); break;
            case "R": entity = RockBlock(x, y, cellSize); break;
            case "P": entity = PushBlock(x, y, cellSize); break;
            case "w": entity = Wall(x, y, cellSize); break;
            case "b": entity = Cat(x, y, cellSize); entity.addComponent(MyGame.components.Moveable({})); break;
            case "r": entity = Rock(x, y, cellSize); break;
            case "f": entity = Flag(x, y, cellSize); break;
            case "B": entity = BabaBlock(x, y, cellSize); break;
            case "Y": entity = YouBlock(x, y, cellSize); break;
            case "F": entity = FlagBlock(x, y, cellSize); break;
            case "X": entity = WinBlock(x, y, cellSize); break;
            case "g": entity = Grass(x, y, cellSize); break;
            case "a": entity = Water(x, y, cellSize); break;
            case "A": entity = WaterBlock(x, y, cellSize); break;
            case "N": entity = SinkBlock(x, y, cellSize); break;
            case "v": entity = Lava(x, y, cellSize); break;
            case "V": entity = LavaBlock(x, y, cellSize); break;
            case "K": entity = KillBlock(x, y, cellSize); break;
        }

        // entity.addComponent(MyGame.components.Moveable({}));
        // entityGrid[10][10] = entity;
        // MyGame.entities.push(entity);

        return entity;
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
                visualsGrid[row].push(cells[cell]);
                
                let decodedEntity = decodeEntity(cells[cell], cell, row)
                if (decodedEntity != null){
                    visualsGrid[row][cell] = decodedEntity;
                    MyGame.entities.push(decodedEntity);
                }
            }
        }

        // load entities
        let cat = null;
        let catRow = null;
        let catCell = null;
        for (let row = 0; row < entities.length; row++){
            let cells = entities[row].split("");
            entityGrid.push([]);
            for (let cell = 0; cell < cells.length; cell++){
                entityGrid[row].push(cells[cell]);
                
                let decodedEntity = decodeEntity(cells[cell], cell, row)
                if (decodedEntity != null){
                    
                    // we want cat to be top layer, so we add it to the grid last
                    if (decodedEntity.components.type.type === "cat"){
                        cat = decodedEntity;
                        catRow = row;
                        catCell = cell;
                    }
                    else{
                        entityGrid[row][cell] = decodedEntity;
                        MyGame.entities.push(decodedEntity);
                    }
                }
            }
        }

        // always surround the arena with collidable hedges
        for (let i = 0; i < entityGrid[0].length; i++){  // top row
            let hedge = Hedge(i, 0, cellSize);
            hedge.addComponent(MyGame.components.Stop({}));
            entityGrid[0][i] = hedge;
            MyGame.entities.push(hedge);
        }
        for (let i = 0 ; i < entityGrid[entityGrid.length - 1].length; i++){  // bottom row
            let hedge = Hedge(i, entityGrid.length - 1, cellSize);
            hedge.addComponent(MyGame.components.Stop({}));
            entityGrid[entityGrid.length - 1][i] = hedge;
            MyGame.entities.push(hedge);
        }
        for (let i = 0; i < entityGrid.length; i++){  // left and right edges
            let hedge = Hedge(0, i, cellSize);
            hedge.addComponent(MyGame.components.Stop({}));
            entityGrid[i][0] = hedge;
            MyGame.entities.push(hedge);
            
            hedge = Hedge(entityGrid.length - 1, i, cellSize);
            hedge.addComponent(MyGame.components.Stop({}));
            entityGrid[i][entityGrid.length - 1]
            MyGame.entities.push(hedge);
        }

        // render cat on top of everything
        if (cat !== null){
            entityGrid[catRow][catCell] = cat;
            MyGame.entities.push(cat);
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


    MyGame.entitiesAt = function(x, y){
        let entityList = [];

        for (let e in MyGame.entities){
            let ent = MyGame.entities[e]
            if (ent.components.position){
                if(ent.components.position.x === x && ent.components.position.y === y){
                    entityList.push(ent);
                }
            }
        }

        return entityList;
    }


    function initalize(){
        readLevel();
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