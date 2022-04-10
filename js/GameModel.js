function GameModel(levelFile, currentLevel) {
    "use strict";
    
    let gridWidth = null;
    let gridHeight = null;
    let cellSize = null;  // in canvas pixels. cells must be square
    let visualsGrid = [];
    let entityGrid = [];

    // this is a strange variable, but it's needed bc of a really obscure bug with key rebinding
    MyGame.needsReset = false;

    let cancelNextRequest = false;
    
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
            case "b": entity = Cat(x, y, cellSize); break;
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
        if (MyGame.Level.currentLevel === "<<DONE>>"){
            console.log("YOU WIN!");
            cancelNextRequest = true;
            MyGame.manager.openScreen("main-menu-screen");
            MyGame.Music.stop();
            return;
        }

        let levelArray = MyGame.Level.currentLevel.split(/\r?\n/);
        
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
            if (cells.length > 0){
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
        }

        // load entities
        let cat = null;
        let catRow = null;
        let catCell = null;
        for (let row = 0; row < entities.length; row++){
            let cells = entities[row].split("");
            if (cells.length > 0){  // ignore extra \n at end of file
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
        }

        // always surround the arena with collidable borders
        // this would have been easy if level files included hedges in the entity layer instead of the visuals layer
        for (let i = 0; i < entityGrid[0].length; i++){  // top row
            let border = Border(i, 0, cellSize);
            border.addComponent(MyGame.components.Stop({}));
            entityGrid[0][i] = border;
            MyGame.entities.push(border);
        }
        for (let i = 0 ; i < entityGrid[entityGrid.length - 1].length; i++){  // bottom row
            let border = Border(i, entityGrid.length - 1, cellSize);
            border.addComponent(MyGame.components.Stop({}));
            entityGrid[entityGrid.length - 1][i] = border;
            MyGame.entities.push(border);
        }
        for (let i = 0; i < entityGrid.length; i++){  // left and right edges
            let border = Border(0, i, cellSize);
            border.addComponent(MyGame.components.Stop({}));
            entityGrid[i][0] = border;
            MyGame.entities.push(border);
            
            border = Hedge(entityGrid.length - 1, i, cellSize);
            border.addComponent(MyGame.components.Stop({}));
            entityGrid[i][entityGrid.length - 1]
            MyGame.entities.push(border);
        }

        // render cat on top of everything
        if (cat !== null){
            entityGrid[catRow][catCell] = cat;
            MyGame.entities.push(cat);
        }

    }
    
    function registerKeys(){

        MyGame.GameKeyboard.registerUp(MyGame.GameKeyboard.up);
        MyGame.GameKeyboard.registerDown(MyGame.GameKeyboard.down);
        MyGame.GameKeyboard.registerLeft(MyGame.GameKeyboard.left);
        MyGame.GameKeyboard.registerRight(MyGame.GameKeyboard.right);
        MyGame.GameKeyboard.registerReload(MyGame.GameKeyboard.reload);

    }    

    function nextLevel(){
        gridWidth = null;
        gridHeight = null;
        cellSize = null;  // in canvas pixels. cells must be square
        visualsGrid = [];
        entityGrid = [];
        MyGame.entities = [];
        MyGame.systems.winning.reset();
        levelNum += 1;
        initalize();
    }

    function clearLevel(){
        gridWidth = null;
        gridHeight = null;
        cellSize = null;  // in canvas pixels. cells must be square
        visualsGrid = [];
        entityGrid = [];
        MyGame.entities = [];
        MyGame.systems.winning.reset();
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
        registerKeys();
        readLevel();
    }
    
    MyGame.Music.play();

    function update(elapsedTime){
        MyGame.systems.render.update(elapsedTime, MyGame.entities);
        MyGame.systems.winning.update(elapsedTime, MyGame.entities);
        MyGame.systems.sinking.update(MyGame.entities);
        MyGame.systems.kill.update(MyGame.entities);
        MyGame.systems.rules.update(elapsedTime, MyGame.entities, entityGrid);
        MyGame.systems.movement.update(elapsedTime);
        MyGame.Music.shouldPlay = true;

        // if the reset key is pressed, reload the level
        if (MyGame.needsReset){
            MyGame.needsReset = false;
            gridWidth = null;
            gridHeight = null;
            cellSize = null;
            visualsGrid = [];
            entityGrid = [];
            MyGame.entities = [];
            MyGame.systems.winning.reset();
            initalize();
        }
        
        // return to main menu after finishing level
        if (currentLevel != MyGame.Level.currentLevelNum){
            cancelNextRequest = true;
            MyGame.manager.openScreen("main-menu-screen");
            MyGame.Music.stop();
            clearLevel();
            //nextLevel();
        }
        return cancelNextRequest;
    }

    initalize();

    return {
        update: update
    };

}