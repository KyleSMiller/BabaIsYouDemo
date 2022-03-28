MyGame.components.Rule = function(spec) {
    'use strict';

    let api = {
        get name() { return "rule" },
        get rule() { return spec.rule }
    };

    return api;
};