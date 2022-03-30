MyGame.Level = (function(){

    let currentLevelNum = 0;
    let currentLevel = "";
    let levelFile = "";
    let levels = [];

    function loadFile(file){       
        // temporary hardcoded levels
levelFile = `Level-1
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
                    
                    
                    
                    
                    
                    
Level-2
20 x 20
hhhhhhhhhhhhhhhhhhhh
h                  h
h     g            h
h                  h
h  g            g  h
h  g             g h
h                  h
h                  h
h                  h
h                  h
h                  h
h                  h
h                  h
h                  h
h                  h
h g              g h
h               g  h
h  g           gg  h
h                  h
hhhhhhhhhhhhhhhhhhhh
                    
                    
                    
                    
        wwwwwwww    
        w      w    
        w I    w    
    wwwww    X w    
    w          w    
    w F    f b w    
    w          w    
    wwwwwwwwwwww    
                    
     B  W           
     I  I           
     Y  S           
                    
                    
                    
                    
Level-3
20 x 20
hhhhhhhhhhhhhhhhhhhh
h                  h
h g       g        h
h      g         g h
h                  h
h   g  g        gg h
h  g            g  h
h  g               h
h                  h
h                  h
h                g h
h                  h
h                 gh
h                  h
h gg               h
h                  h
h  g               h
h               gg h
h                  h
hhhhhhhhhhhhhhhhhhhh
                    
                    
                    
            FIX     
           wwwww    
           w   w    
           w f w    
           w   w    
     wwwwwwwwwww    
     w         w    
     w WIS     w    
     w         w    
     w         w    
     w b       w    
     w         w    
     w         w    
     wwwwwwwwwww    
      BIY           
                    
                    
Level-4
20 x 20
hhhhhhhhhhhhhhhhhhhh
h                  h
h              g   h
h              g  gh
h                  h
h   g            g h
h                  h
h gg               h
h                  h
h                  h
h                  h
h                  h
h                  h
h                g h
h                  h
hg                 h
h                  h
h    g  ggg        h
h         g      g h
hhhhhhhhhhhhhhhhhhhh
                    
 BWw                
 IIw    AIN         
 YSw  wwwwwwww      
 www  w      w      
      w  RIP w      
      w      w      
      w b rr w      
      w      w      
   wwwwwaaaawwwww   
   w            w   
   w            w   
   w            w   
   waaa         w   
   waaa     FIX w   
   wfaa         w   
   wwwwwwwwwwwwww   
                    
                    
                    
Level-5
20 x 20
hhhhhhhhhhhhhhhhhhhh
h                  h
h    g        g    h
h             gg   h
h  g               h
h                  h
h                  h
h           ggg    h
h           g g    h
h       g   ggg    h
h                g h
h                  h
h                  h
h           gg   g h
h                  h
h                  h
h  g           g   h
h    g             h
h                  h
hhhhhhhhhhhhhhhhhhhh
                    
                    
                r   
    r   r           
          r       W 
                  I 
  wwwww    vvvvv  S 
  w   w    v   v    
  w b r    v f v    
  w   w    v   v    
  wwwww    vvvvv    
                    
                    
  wBIYw        r    
                  F 
          RIP     I 
                  X 
                    
  VIK               
                    
`

        levels = levelFile.split("Level-");
        // javascript doesn't have an easy way to keep the delimeter on split, so manually re-add it
        levels.splice(0, 1);
        for (let level = 0; level < levels.length; level++){
            levels[level] = "Level-".concat(levels[level]);
        }
    }

    function loadLevel(levelNum){
        currentLevelNum = levelNum;
        console.log("loading level " + currentLevelNum);

        currentLevel = levels[levelNum];
        return currentLevel;
    }

    return {
        loadFile: loadFile,
        loadLevel: loadLevel,
        get currentLevelNum() { return currentLevelNum; },
        get currentLevel() { return currentLevel; }
    }

}());