MyGame.Level = (function(){

    let currentLevelNum = 0;
    let currentLevel = "";
    let levelFile = "";
    let levels = [];
    let levelTitles = [];

    function loadLevelFile(){
        levelFile = MyGame.assets.levels;
        readLevel(0);  // recursively read in all levels, starting with first level
    }

    function readLevel(offset){
        // Recursively read in the levels

        let fileLines = levelFile.split("\n");
        // javascript has no easy way to keep delimeter, so manually re-add it
        for (let i = 0; i < fileLines.length; i++){
            fileLines[i] = fileLines[i].concat("\n");
        }
        let curLevelNum = levelTitles.length;

        // reached end of file
        if (offset >= fileLines.length - 1){
            return;
        }

        // read the title
        levelTitles.push(fileLines[offset]);
        // read the dimensions
        let height = parseInt(fileLines[offset + 1].split("x")[1]) * 2 + 2;
        
        // read the level
        levels[curLevelNum] = "";
        
        for (let i = 0; i < height; i++){
            levels[curLevelNum] = levels[curLevelNum].concat(fileLines[offset]);
            offset += 1;
        }

        return readLevel(offset);
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
        get currentLevel() { return currentLevel; },
        get levelCount() { return levels.length; },
        get levelTitles() { return levelTitles; }
    }

}());