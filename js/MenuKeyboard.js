MyGame.MenuKeyboard = (function(input) {
    let that = {
        myKeyboard: input.Keyboard(),
        menuButtons: {},
        activeButton: 0,
        pressButton: pressButton
    };

    function arrowDown(){
        if (that.activeButton < Object.keys(that.menuButtons).length - 1){
            that.activeButton += 1;
        }
    }

    function arrowUp(){
        if (that.activeButton > 0){
            that.activeButton -= 1;
        }
    }

    function pressButton(){
        // abstract function
        console.log("You need to implement the pressButton function for each menu");
    }

    that.registerPressButton = function(func){
        that.myKeyboard.register("Enter", func, "press");
    }

    function goBack(){
        // abstract function
        console.log("You need to implement the goBack function for each menu");
    }

    that.registerGoBack = function(func){
        that.myKeyboard.register("Escape", func, "press");
    }

    // --- set up menu navigation controls ---
    that.myKeyboard.register("ArrowDown", arrowDown, "press");
    that.myKeyboard.register("ArrowUp", arrowUp, "press");
    that.myKeyboard.register("Enter", pressButton, "press");
    that.myKeyboard.register("Escape", goBack, "press");


    return that;

}(MyGame.input));