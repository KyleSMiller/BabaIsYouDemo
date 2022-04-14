MyGame.components.AssociatedEntity = function(spec) {
    'use strict';

    let api = {
        get name() { return "associatedEntity" },
        get entity() { return spec.entity }
    };

    return api;
};