MyGame.components.Type = function(spec) {
    'use strict';

    let api = {
        get name() { return "type" },
        get type() { return spec.type; }
    };

    return api;
};