MyGame.render.Particles = function(particles, graphics, imageSrc){
    "use strict";

    let image = new Image();
    let isReady = false;

    image.onload = function(){
        isReady = true;
    }
    image.src = imageSrc;

    function render(){
        if (isReady){
            Object.getOwnPropertyNames(particles).forEach(function(value){
                let particle = particles[value];
                graphics.drawTexture({image: image, center: particle.center, rotation: particle.rotation, size: particle.size});
            });
        }
    }

    return {
        render: render
    };

}