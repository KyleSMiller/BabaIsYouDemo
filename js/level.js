MyGame.Level = (function(){

    let currentLevelNum = 0;
    let currentLevel = "";

    function loadLevel(levelNum){
        currentLevelNum = levelNum;
        console.log("loading level " + currentLevelNum);
        
        // temporary hardcoded level
        currentLevel = `Level-1
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
        return currentLevel;
    }

    return {
        loadLevel: loadLevel,
        get currentLevelNum() { return currentLevelNum; },
        get currentLevel() { return currentLevel; }
    }

}());