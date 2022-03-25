MyGame.components.Position = function(spec) {
    'use strict';

    let api = {
        get name() { return 'position'; },
        get x() { return spec.x; },
        set x(newX) { spec.x = newX; },
        get y() { return spec.y; },
        set y(newY) { spec.y = newY; }
    };

    return api;
};
