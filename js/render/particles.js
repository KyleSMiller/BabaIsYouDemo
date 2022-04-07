MyGame.render.Particles = function(particles, graphics, image){
    "use strict";

    // let image = new Image();
    // let isReady = false;

    // image.onload = function(){
    //     isReady = true;
    // }
    // image.src = imageSrc;

    function render(){
        Object.getOwnPropertyNames(particles).forEach(function(value){
            let particle = particles[value];
            graphics.drawTexture({image: image, center: particle.center, rotation: particle.rotation, size: particle.size});
        });
    }

    return {
        render: render
    };

}