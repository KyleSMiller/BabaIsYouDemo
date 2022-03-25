MyGame.manager = (function(screens) {
    "use strict";

    // keep track of what order screens were opened in
    // pressing escape sends you back one layer
    let mainMenu = 'main-menu-screen'
    let screenLayers = [mainMenu];
    
    // change active screen
    function showScreen(id) {
        
        // only one active screen
        let activeScreens = document.getElementsByClassName('active');
        for (let screen = 0; screen < activeScreens.length; screen++){
            activeScreens[screen].classList.remove('active');
        }
        
        screens[id].run();
        document.getElementById(id).classList.add('active');
    }

    function openScreen(id){
        screenLayers.push(id);
        showScreen(id);
    }

    function returnFromScreen(){
        if (screenLayers.length > 1){ // main menu is always bottom screen layer
            screenLayers.splice(screenLayers.length - 1, 1);
        }
        showScreen(screenLayers[screenLayers.length - 1]);
    }

    function initialize() {
        let screen = null;

        // initialize each screen
        for (screen in screens) {
            if (screens.hasOwnProperty(screen)){
                screens[screen].initialize();
            }
        }

        // main menu on startup
        showScreen(mainMenu);
    }

    return {
        initialize : initialize,
        openScreen : openScreen,
        returnFromScreen: returnFromScreen
    };

}(MyGame.screens));