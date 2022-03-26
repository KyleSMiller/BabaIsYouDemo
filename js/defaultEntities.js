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

    return babaBlock;
}