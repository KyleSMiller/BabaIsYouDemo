let Entity = (function(){
    "use strict";
    let nextId = 1;

    function createEntity(){
        let components = {};

        function addComponent(c){
            components[c.name] = c;
        }

        function removeComponent(c){
            delete components[c.name];
        }

        return {
            id: nextId++,
            addComponent: addComponent,
            removeComponent: removeComponent,
            get components() { return components; }
        };
    }

    return {
        get nextId() { return nextId; },
        createEntity: createEntity
    };
    
}());