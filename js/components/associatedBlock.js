MyGame.components.AssociatedBlock = function(spec) {
    'use strict';

    let api = {
        get name() { return "associatedBlock" },
        get block() { return spec.block }
    };

    return api;
};