MyGame.Level = (function(){

    let currentLevelNum = 0;
    let currentLevel = "";
    let levelFile = "";
    let levels = [];

    function loadLevelFile(){
        levelFile = MyGame.assets.levels;
        levels = levelFile.split("Level-");
        // javascript doesn't have an easy way to keep the delimeter on split, so manually re-add it
        levels.splice(0, 1);
        for (let level = 0; level < levels.length; level++){
            levels[level] = "Level-".concat(levels[level]);
        }
    }

    function loadLevel(levelNum){

        if (levelNum < levels.length){
            currentLevelNum = levelNum;
            console.log("loading level " + currentLevelNum);

            currentLevel = levels[levelNum];
        }
        else{
            currentLevelNum = levelNum;
            currentLevel = "<<DONE>>";
        }
        return currentLevel;
    }

    return {
        loadLevelFile: loadLevelFile,
        loadLevel: loadLevel,
        get currentLevelNum() { return currentLevelNum; },
        get currentLevel() { return currentLevel; }
    }

}());