MyGame.systems.ParticleSystem = function(spec){
    "use strict";

    let nextName = 1;
    let particles = {};
    let systemLifetime = 0;
    let timeSinceLastParticle = 0;
    let renderer = MyGame.render.Particles(particles, MyGame.graphics, spec.image);

    function create(){
        let size = Random.nextGaussian(spec.size.mean, spec.size.stdev);

        let placeAt = { x: Math.random() * (spec.range.x1 - spec.range.x2) + spec.range.x2,
                        y: Math.random() * (spec.range.y2 - spec.range.y1) + spec.range.y1 };

        let p = {
            center: placeAt,
            size: { width: size, height: size },
            direction: Random.nextCircleVector(),
            speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev),
            rotation: 0,
            lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev),
            alive: 0
        };
        return p;
    }

    function update(elapsedTime){
        let toRemove = [];

        elapsedTime = elapsedTime / 1000;
        systemLifetime += elapsedTime;
        timeSinceLastParticle += elapsedTime;

        Object.getOwnPropertyNames(particles).forEach(function(value, index, array){
            let particle = particles[value];
            
            // update particle's lifetime
            particle.alive += elapsedTime;

            // move the particle
            particle.center.x += (elapsedTime * particle.speed * particle.direction.x);
            particle.center.y += (elapsedTime * particle.speed * particle.direction.y);

            particle.rotation += particle.speed / 500;

            if (particle.alive > particle.lifetime){
                toRemove.push(value);
            }
        });

        // remove expired particles
        for (let particle = 0; particle < toRemove.length; particle++){
            delete particles[toRemove[particle]];
        }
        toRemove.length = 0;

        // generate new particles
        if (systemLifetime <= spec.duration && timeSinceLastParticle > 0.1){
            timeSinceLastParticle = 0;
            for (let particle = 0; particle < 1; particle++){
                particles[nextName++] = create();
            }
        }
        
        // render the particles
        renderer.render()

    }

    return {
        update: update,
        get particles() { return particles; }
    };
}