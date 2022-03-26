// This is used to define the default properties for certain entities
// Generally, this is only used for appearance and size
// Other properties are dependent on the rule blocks

let Cat = function(x, y, size){
    let cat = Entity.createEntity();
    cat.addComponent(MyGame.components.Position({ x: x, y: y }));
    cat.addComponent(MyGame.components.Appearance({
        imageSrc: "images/cat.png",
        size: { width: size, height: size },
        animated: false,
    }));
    cat.addComponent(MyGame.components.Type({type: "cat"}));

    return cat;
}

let Rock = function(x, y, size){
    let rock = Entity.createEntity();
    rock.addComponent(MyGame.components.Position({ x: x, y: y }));
    rock.addComponent(MyGame.components.Appearance({
        imageSrc: "images/rocks.png",
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

    return rock;
}

let Wall = function(x, y, size){
    let wall = Entity.createEntity();
    wall.addComponent(MyGame.components.Position({ x: x, y: y }));
    wall.addComponent(MyGame.components.Appearance({
        imageSrc: "images/wall.png",
        size: { width: size, height: size },
        animated: false
    }));
    wall.addComponent(MyGame.components.Type({type: "wall"}));

    return wall;
}

let Flag = function(x, y, size){
    let flag = Entity.createEntity();
    flag.addComponent(MyGame.components.Position({ x: x, y: y }));
    flag.addComponent(MyGame.components.Appearance({
        imageSrc: "images/flag.png",
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
    
    return flag;
}

let Floor = function(x, y, size){
    let floor = Entity.createEntity();
    floor.addComponent(MyGame.components.Position({ x: x, y: y }));
    floor.addComponent(MyGame.components.Appearance({
        imageSrc: "images/floor.png",
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
        imageSrc: "images/grass.png",
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
        imageSrc: "images/water_color.png",
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

    return water;
}

let Lava = function(x, y, size){
    let lava = Entity.createEntity();
    lava.addComponent(MyGame.components.Position({ x: x, y: y }));
    lava.addComponent(MyGame.components.Appearance({
        imageSrc: "images/Lava_color.png",
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

    return lava;
}

let Hedge = function(x, y, size){
    let hedge = Entity.createEntity();
    hedge.addComponent(MyGame.components.Position({ x: x, y: y }));
    hedge.addComponent(MyGame.components.Appearance({
        imageSrc: "images/hedge.png",
        size: { width: size, height: size },
        animated: false
    }));
    hedge.addComponent(MyGame.components.Type({type: "hedge"}));

    return hedge;
}

// --- Rule Blocks ---

let IsBlock = function(x, y, size){
    let isBlock = Entity.createEntity();
    isBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    isBlock.addComponent(MyGame.components.Appearance({
        imageSrc: "images/wordIs.png",
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

    return isBlock;
}

let YouBlock = function(x, y, size){
    let youBlock = Entity.createEntity();
    youBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    youBlock.addComponent(MyGame.components.Appearance({
        imageSrc: "images/wordYou.png",
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

    return youBlock;
}

let StopBlock = function(x, y, size){
    let stopBlock = Entity.createEntity();
    stopBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    stopBlock.addComponent(MyGame.components.Appearance({
        imageSrc: "images/wordStop.png",
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

    return stopBlock;
}

let PushBlock = function(x, y, size){
    let pushBlock = Entity.createEntity();
    pushBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    pushBlock.addComponent(MyGame.components.Appearance({
        imageSrc: "images/wordPush.png",
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

    return pushBlock;
}

let WinBlock = function(x, y, size){
    let winBlock = Entity.createEntity();
    winBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    winBlock.addComponent(MyGame.components.Appearance({
        imageSrc: "images/wordWin.png",
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

    return winBlock;
}

let SinkBlock = function(x, y, size){
    let sinkBlock = Entity.createEntity();
    sinkBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    sinkBlock.addComponent(MyGame.components.Appearance({
        imageSrc: "images/wordSink.png",
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

    return sinkBlock;
}

let KillBlock = function(x, y, size){
    let killBlock = Entity.createEntity();
    killBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    killBlock.addComponent(MyGame.components.Appearance({
        imageSrc: "images/wordKill.png",
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

    return killBlock;
}

let BabaBlock = function(x, y, size){
    let babaBlock = Entity.createEntity();
    babaBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    babaBlock.addComponent(MyGame.components.Appearance({
        imageSrc: "images/wordBaba.png",
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

    return babaBlock;
}

let WallBlock = function(x, y, size){
    let wallBlock = Entity.createEntity();
    wallBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    wallBlock.addComponent(MyGame.components.Appearance({
        imageSrc: "images/wordWall.png",
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

    return wallBlock;
}

let RockBlock = function(x, y, size){
    let rockBlock = Entity.createEntity();
    rockBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    rockBlock.addComponent(MyGame.components.Appearance({
        imageSrc: "images/wordRock.png",
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

    return rockBlock;
}

let FlagBlock = function(x, y, size){
    let flagBlock = Entity.createEntity();
    flagBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    flagBlock.addComponent(MyGame.components.Appearance({
        imageSrc: "images/wordFlag.png",
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

    return flagBlock;
}

let LavaBlock = function(x, y, size){
    let lavaBlock = Entity.createEntity();
    lavaBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    lavaBlock.addComponent(MyGame.components.Appearance({
        imageSrc: "images/wordLava.png",
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

    return lavaBlock;
}

let WaterBlock = function(x, y, size){
    let waterBlock = Entity.createEntity();
    waterBlock.addComponent(MyGame.components.Position({ x: x, y: y }));
    waterBlock.addComponent(MyGame.components.Appearance({
        imageSrc: "images/wordWater.png",
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

    return waterBlock;
}