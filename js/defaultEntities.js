// This is used to define the default properties for certain entities
// Generally, this is only used for appearance and size
// Other properties are dependent on the rule blocks

let Cat = function(x, y, size){
    let cat = Entity.createEntity();
    cat.addComponent(MyGame.components.Position({ x: x, y: y }));
    cat.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["cat"],
        size: { width: size, height: size },
        animated: false,
    }));
    cat.addComponent(MyGame.components.Type({type: "cat"}));
    cat.addComponent(MyGame.components.AssociatedBlock({block: "babaBlock"}));

    return cat;
}

let Rock = function(x, y, size){
    let rock = Entity.createEntity();
    rock.addComponent(MyGame.components.Position({ x: x, y: y }));
    rock.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["rocks"],
        size: { width: size, height: size },
        animated: true,
        animation: {
            subTextureWidth: 24,
            subTextureHeight: 24,
            frames: 2,
            frameTime: 100,
            index: 0
        }
    }));
    rock.addComponent(MyGame.components.Type({type: "rock"}));
    rock.addComponent(MyGame.components.AssociatedBlock({block: "rockBlock"}));

    return rock;
}

let Wall = function(x, y, size){
    let wall = Entity.createEntity();
    wall.addComponent(MyGame.components.Position({ x: x, y: y }));
    wall.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["wall"],
        size: { width: size, height: size },
        animated: false
    }));
    wall.addComponent(MyGame.components.Type({type: "wall"}));
    wall.addComponent(MyGame.components.AssociatedBlock({block: "wallBlock"}));

    return wall;
}

let Flag = function(x, y, size){
    let flag = Entity.createEntity();
    flag.addComponent(MyGame.components.Position({ x: x, y: y }));
    flag.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["flag"],
        size: { width: size, height: size },
        animated: true,
        animation: {
            subTextureWidth: 24,
            subTextureHeight: 24,
            frames: 2,
            frameTime: 100,
            index: 0
        }
    }));
    flag.addComponent(MyGame.components.Type({type: "flag"}));
    flag.addComponent(MyGame.components.AssociatedBlock({block: "flagBlock"}));
    
    return flag;
}

let Floor = function(x, y, size){
    let floor = Entity.createEntity();
    floor.addComponent(MyGame.components.Position({ x: x, y: y }));
    floor.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["floor"],
        size: { width: size, height: size },
        animated: false
    }));
    floor.addComponent(MyGame.components.Type({type: "floor"}));

    return floor;
}

let Grass = function(x, y, size){
    let grass = Entity.createEntity();
    grass.addComponent(MyGame.components.Position({ x: x, y: y }));
    grass.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["grass"],
        size: { width: size, height: size },
        animated: true,
        animation: {
            subTextureWidth: 24,
            subTextureHeight: 24,
            frames: 2,
            frameTime: 100,
            index: 0
        }
    }));
    grass.addComponent(MyGame.components.Type({type: "grass"}));

    return grass;
}

let Water = function(x, y, size){
    let water = Entity.createEntity();
    water.addComponent(MyGame.components.Position({ x: x, y: y }));
    water.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["water"],
        size: { width: size, height: size },
        animated: true,
        animation: {
            subTextureWidth: 24,
            subTextureHeight: 24,
            frames: 2,
            frameTime: 100,
            index: 0
        }
    }));
    water.addComponent(MyGame.components.Type({type: "water"}));
    water.addComponent(MyGame.components.AssociatedBlock({block: "waterBlock"}));

    return water;
}

let Lava = function(x, y, size){
    let lava = Entity.createEntity();
    lava.addComponent(MyGame.components.Position({ x: x, y: y }));
    lava.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["lava"],
        size: { width: size, height: size },
        animated: true,
        animation: {
            subTextureWidth: 24,
            subTextureHeight: 24,
            frames: 2,
            frameTime: 100,
            index: 0
        }
    }));
    lava.addComponent(MyGame.components.Type({type: "lava"}));
    lava.addComponent(MyGame.components.AssociatedBlock({block: "lavaBlock"}));

    return lava;
}

let Hedge = function(x, y, size){
    let hedge = Entity.createEntity();
    hedge.addComponent(MyGame.components.Position({ x: x, y: y }));
    hedge.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["hedge"],
        size: { width: size, height: size },
        animated: false
    }));
    hedge.addComponent(MyGame.components.Type({type: "hedge"}));

    return hedge;
}

let Border = function(x, y, size){
    let border = Entity.createEntity();
    border.addComponent(MyGame.components.Position({ x: x, y: y }));
    border.addComponent(MyGame.components.Type({type: "border"}));

    return border;
}

// --- Rule Blocks ---

let IsBlock = function(x, y, size){
    let isBlock = Entity.createEntity();
    isBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    isBlock.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["wordIs"],
        size: { width: size, height: size },
        animated: true,
        animation: {
            subTextureWidth: 24,
            subTextureHeight: 24,
            frames: 2,
            frameTime: 100,
            index: 0
        }
    }));
    isBlock.addComponent(MyGame.components.Type({type: "isBlock"}));
    isBlock.addComponent(MyGame.components.Pushable({}));

    return isBlock;
}

let YouBlock = function(x, y, size){
    let youBlock = Entity.createEntity();
    youBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    youBlock.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["wordYou"],
        size: { width: size, height: size },
        animated: true,
        animation: {
            subTextureWidth: 24,
            subTextureHeight: 24,
            frames: 2,
            frameTime: 100,
            index: 0
        }
    }));
    youBlock.addComponent(MyGame.components.Type({type: "youBlock"}));
    youBlock.addComponent(MyGame.components.Rule({rule: MyGame.components.Moveable}));
    youBlock.addComponent(MyGame.components.Pushable({}));

    return youBlock;
}

let StopBlock = function(x, y, size){
    let stopBlock = Entity.createEntity();
    stopBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    stopBlock.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["wordStop"],
        size: { width: size, height: size },
        animated: true,
        animation: {
            subTextureWidth: 24,
            subTextureHeight: 24,
            frames: 2,
            frameTime: 100,
            index: 0
        }
    }));
    stopBlock.addComponent(MyGame.components.Type({type: "stopBlock"}));
    stopBlock.addComponent(MyGame.components.Rule({rule: MyGame.components.Stop}));
    stopBlock.addComponent(MyGame.components.Pushable({}));

    return stopBlock;
}

let PushBlock = function(x, y, size){
    let pushBlock = Entity.createEntity();
    pushBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    pushBlock.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["wordPush"],
        size: { width: size, height: size },
        animated: true,
        animation: {
            subTextureWidth: 24,
            subTextureHeight: 24,
            frames: 2,
            frameTime: 100,
            index: 0
        }
    }));
    pushBlock.addComponent(MyGame.components.Type({type: "pushBlock"}));
    pushBlock.addComponent(MyGame.components.Rule({rule: MyGame.components.Pushable}));
    pushBlock.addComponent(MyGame.components.Pushable({}));

    return pushBlock;
}

let WinBlock = function(x, y, size){
    let winBlock = Entity.createEntity();
    winBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    winBlock.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["wordWin"],
        size: { width: size, height: size },
        animated: true,
        animation: {
            subTextureWidth: 24,
            subTextureHeight: 24,
            frames: 2,
            frameTime: 100,
            index: 0
        }
    }));
    winBlock.addComponent(MyGame.components.Type({type: "winBlock"}));
    winBlock.addComponent(MyGame.components.Rule({rule: MyGame.components.Win}));
    winBlock.addComponent(MyGame.components.Pushable({}));

    return winBlock;
}

let SinkBlock = function(x, y, size){
    let sinkBlock = Entity.createEntity();
    sinkBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    sinkBlock.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["wordSink"],
        size: { width: size, height: size },
        animated: true,
        animation: {
            subTextureWidth: 24,
            subTextureHeight: 24,
            frames: 2,
            frameTime: 100,
            index: 0
        }
    }));
    sinkBlock.addComponent(MyGame.components.Type({type: "sinkBlock"}));
    sinkBlock.addComponent(MyGame.components.Rule({rule: MyGame.components.Sink}));
    sinkBlock.addComponent(MyGame.components.Pushable({}));

    return sinkBlock;
}

let KillBlock = function(x, y, size){
    let killBlock = Entity.createEntity();
    killBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    killBlock.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["wordKill"],
        size: { width: size, height: size },
        animated: true,
        animation: {
            subTextureWidth: 24,
            subTextureHeight: 24,
            frames: 2,
            frameTime: 100,
            index: 0
        }
    }));
    killBlock.addComponent(MyGame.components.Type({type: "killBlock"}));
    killBlock.addComponent(MyGame.components.Rule({rule: MyGame.components.Kill}));
    killBlock.addComponent(MyGame.components.Pushable({}));

    return killBlock;
}

let BabaBlock = function(x, y, size){
    let babaBlock = Entity.createEntity();
    babaBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    babaBlock.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["wordBaba"],
        size: { width: size, height: size },
        animated: true,
        animation: {
            subTextureWidth: 24,
            subTextureHeight: 24,
            frames: 2,
            frameTime: 100,
            index: 0
        }
    }));
    babaBlock.addComponent(MyGame.components.Type({type: "babaBlock"}));
    babaBlock.addComponent(MyGame.components.ObjectBlock({}));
    babaBlock.addComponent(MyGame.components.Pushable({}));

    return babaBlock;
}

let WallBlock = function(x, y, size){
    let wallBlock = Entity.createEntity();
    wallBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    wallBlock.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["wordWall"],
        size: { width: size, height: size },
        animated: true,
        animation: {
            subTextureWidth: 24,
            subTextureHeight: 24,
            frames: 2,
            frameTime: 100,
            index: 0
        }
    }));
    wallBlock.addComponent(MyGame.components.Type({type: "wallBlock"}));
    wallBlock.addComponent(MyGame.components.ObjectBlock({}));
    wallBlock.addComponent(MyGame.components.Pushable({}));
    
    return wallBlock;
}

let RockBlock = function(x, y, size){
    let rockBlock = Entity.createEntity();
    rockBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    rockBlock.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["wordRock"],
        size: { width: size, height: size },
        animated: true,
        animation: {
            subTextureWidth: 24,
            subTextureHeight: 24,
            frames: 2,
            frameTime: 100,
            index: 0
        }
    }));
    rockBlock.addComponent(MyGame.components.Type({type: "rockBlock"}));
    rockBlock.addComponent(MyGame.components.ObjectBlock({}));
    rockBlock.addComponent(MyGame.components.Pushable({}));

    return rockBlock;
}

let FlagBlock = function(x, y, size){
    let flagBlock = Entity.createEntity();
    flagBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    flagBlock.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["wordFlag"],
        size: { width: size, height: size },
        animated: true,
        animation: {
            subTextureWidth: 24,
            subTextureHeight: 24,
            frames: 2,
            frameTime: 100,
            index: 0
        }
    }));
    flagBlock.addComponent(MyGame.components.Type({type: "flagBlock"}));
    flagBlock.addComponent(MyGame.components.ObjectBlock({}));
    flagBlock.addComponent(MyGame.components.Pushable({}));

    return flagBlock;
}

let LavaBlock = function(x, y, size){
    let lavaBlock = Entity.createEntity();
    lavaBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    lavaBlock.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["wordLava"],
        size: { width: size, height: size },
        animated: true,
        animation: {
            subTextureWidth: 24,
            subTextureHeight: 24,
            frames: 2,
            frameTime: 100,
            index: 0
        }
    }));
    lavaBlock.addComponent(MyGame.components.Type({type: "lavaBlock"}));
    lavaBlock.addComponent(MyGame.components.ObjectBlock({}));
    lavaBlock.addComponent(MyGame.components.Pushable({}));

    return lavaBlock;
}

let WaterBlock = function(x, y, size){
    let waterBlock = Entity.createEntity();
    waterBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    waterBlock.addComponent(MyGame.components.Appearance({
        image: MyGame.assets["wordWater"],
        size: { width: size, height: size },
        animated: true,
        animation: {
            subTextureWidth: 24,
            subTextureHeight: 24,
            frames: 2,
            frameTime: 100,
            index: 0
        }
    }));
    waterBlock.addComponent(MyGame.components.Type({type: "waterBlock"}));
    waterBlock.addComponent(MyGame.components.ObjectBlock({}));
    waterBlock.addComponent(MyGame.components.Pushable({}));

    return waterBlock;
}