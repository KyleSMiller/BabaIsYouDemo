MyGame.Music = (function(){
    "use strict";

    let sound = new Audio();

    let shouldPlay = false;

    function play(){
        sound.addEventListener('canplay', function(){ this.play(); });
        sound.src = 'sounds/music.mp3';
        sound.play();
        sound.loop = true;
        sound.volume = 0.3;
    }

    function stop(){
        shouldPlay = false;
        sound.pause();
    }

    function isPlaying(){
        return sound.ended;
    }

    return {
        play: play,
        stop: stop,
        isPlaying: isPlaying,
        set shouldPlay(val) { shouldPlay = val; }
    }

}());