MyGame.assets = {};

//------------------------------------------------------------------
//
// Purpose of this code is to bootstrap (maybe I should use that as the name)
// the rest of the application.  Only this file is specified in the index.html
// file, then the code in this file gets all the other code and assets
// loaded.
// Written by: Dean Mathias
//
//------------------------------------------------------------------
MyGame.loader = (function() {
    'use strict';
    let scriptOrder = [{
            scripts: ['screens/Manager'],
            message: 'Screen Manager loaded',
            onComplete: null
        }, {
            scripts: ['Input'],
            message: 'Input system loaded',
            onComplete: null
        }, {
            scripts: ['GameKeyboard'],
            message: 'Game controls loaded',
            onComplete: null
        }, {
            scripts: ['MenuKeyboard'],
            message: 'Menu controls loaded',
            onComplete: null
        }, {
            scripts: ['random'],
            message: 'Random number generator loaded',
            onComplete: null
        }, {
            scripts: ['level'],
            message: 'Level reader loaded',
            onComplete: null
        }, {
            scripts: ['music'],
            message: 'Music player loaded',
            onComplete: null
        }, {
            scripts: ['render/graphics'],
            message: 'Graphics renderer loaded',
            onComplete: null
        }, {
            scripts: ['render/texture'],
            message: 'Texture renderer loaded',
            onComplete: null
        }, {
            scripts: ['render/animatedTexture'],
            message: 'Animated texture renderer loaded',
            onComplete: null
        }, {
            scripts: ['render/particles'],
            message: 'Particle renderer loaded',
            onComplete: null
        }, {
            scripts: ['components/moveable'],
            message: 'Moveable component loaded',
            onComplete: null
        }, {
            scripts: ['components/position'],
            message: 'Position component loaded',
            onComplete: null
        }, {
            scripts: ['components/appearance'],
            message: 'Appearance component loaded',
            onComplete: null
        }, {
            scripts: ['components/stop'],
            message: 'Stop component loaded',
            onComplete: null
        }, {
            scripts: ['components/type'],
            message: 'Type component loaded',
            onComplete: null
        }, {
            scripts: ['components/win'],
            message: 'Win component loaded',
            onComplete: null
        }, {
            scripts: ['components/sinkable'],
            message: 'Sinkable component loaded',
            onComplete: null
        }, {
            scripts: ['components/killable'],
            message: 'Killable component loaded',
            onComplete: null
        }, {
            scripts: ['components/sink'],
            message: 'Sink component loaded',
            onComplete: null
        }, {
            scripts: ['components/kill'],
            message: 'Kill component loaded',
            onComplete: null
        }, {
            scripts: ['components/associatedBlock'],
            message: 'AssociatedBlock component loaded',
            onComplete: null
        }, {
            scripts: ['components/associatedEntity'],
            message: 'AssociatedEntity component loaded',
            onComplete: null
        }, {
            scripts: ['components/objectBlock'],
            message: 'objectBlock component loaded',
            onComplete: null
        }, {
            scripts: ['components/rule'],
            message: 'Rule component loaded',
            onComplete: null
        }, {
            scripts: ['components/pushable'],
            message: 'Pushable component loaded',
            onComplete: null
        }, {
            scripts: ['systems/movement'],
            message: 'Movement system loaded',
            onComplete: null
        }, {
            scripts: ['systems/render'],
            message: 'Render system loaded',
            onComplete: null
        }, {
            scripts: ['systems/winning'],
            message: 'Winning system loaded',
            onComplete: null
        }, {
            scripts: ['systems/sinking'],
            message: 'Sinking system loaded',
            onComplete: null
        }, {
            scripts: ['systems/kill'],
            message: 'Kill system loaded',
            onComplete: null
        }, {
            scripts: ['systems/rules'],
            message: 'Rules system loaded',
            onComplete: null
        }, {
            scripts: ['systems/particleSystem'],
            message: 'Particle system loaded',
            onComplete: null
        }, {
            scripts: ['entity'],
            message: 'Entity loaded',
            onComplete: null
        }, {
            scripts: ['defaultEntities'],
            message: 'Default entities loaded',
            onComplete: null
        }, {
            scripts: ['defaultParticles'],
            message: 'Default particles loaded',
            onComplete: null
        }, {
            scripts: ['GameModel'],
            message: 'Game model loaded',
            onComplete: null
        }, {
            scripts: ['screens/GamePlay'],
            message: 'Gameplay screen loaded',
            onComplete: null
        }, {
            scripts: ['screens/Credits'],
            message: 'Credits screen loaded',
            onComplete: null
        }, {
            scripts: ['screens/Controls'],
            message: 'Controls screen loaded',
            onComplete: null
        }, {
            scripts: ['screens/LevelSelect'],
            message: 'Level select menu loaded',
            onComplete: null
        }, {
            scripts: ['screens/MainMenu'],
            message: 'Main menu loaded',
            onComplete: null
        }];

    let assetOrder = [{
            key: 'levels',
            source: '/../levels-all.bbiy'
        },{
            key: 'cat',
            source: '/images/cat.png'
        }, {
            key: 'rocks',
            source: '/images/rocks.png'
        }, {
            key: 'wall',
            source: '/images/wall.png'
        }, {
            key: 'flag',
            source: '/images/flag.png'
        }, {
            key: 'floor',
            source: '/images/floor.png'
        }, {
            key: 'grass',
            source: '/images/grass.png'
        }, {
            key: 'water',
            source: '/images/water_color.png'
        }, {
            key: 'lava',
            source: '/images/Lava_color.png'
        }, {
            key: 'hedge',
            source: '/images/hedge.png'
        }, {
            key: 'wordIs',
            source: '/images/wordIs.png'
        }, {
            key: 'wordYou',
            source: '/images/wordYou.png'
        }, {
            key: 'wordStop',
            source: '/images/wordStop.png'
        }, {
            key: 'wordPush',
            source: '/images/wordPush.png'
        }, {
            key: 'wordWin',
            source: '/images/wordWin.png'
        }, {
            key: 'wordSink',
            source: '/images/wordSink.png'
        }, {
            key: 'wordKill',
            source: '/images/wordKill.png'
        }, {
            key: 'wordBaba',
            source: '/images/wordBaba.png'
        }, {
            key: 'wordWall',
            source: '/images/wordWall.png'
        }, {
            key: 'wordRock',
            source: '/images/wordRock.png'
        }, {
            key: 'wordFlag',
            source: '/images/wordFlag.png'
        }, {
            key: 'wordLava',
            source: '/images/wordLava.png'
        }, {
            key: 'wordWater',
            source: '/images/wordWater.png'
        }, {
            key: 'particle_win',
            source: '/images/particle_win.png'
        },{
            key: 'particle_newYou',
            source: '/images/particle_newYou.png'
        },{
            key: 'particle_death',
            source: '/images/particle_death.png'
        },
        // {
        //     key: 'move',
        //     source: '/sounds/move.mp3'
        // }, {
        //     key: 'music',
        //     source: '/sounds/music.mp3'
        // }, {
        //     key: 'newWin',
        //     source: '/sounds/newWin.mp3'
        // }, {
        //     key: 'newYou',
        //     source: '/sounds/newYou.mp3'
        // }, {
        //     key: 'win',
        //     source: '/sounds/win.mp3'
        // }
    ];

    //------------------------------------------------------------------
    //
    // Helper function used to load scripts in the order specified by the
    // 'scripts' parameter.  'scripts' expects an array of objects with
    // the following format...
    //    {
    //        scripts: [script1, script2, ...],
    //        message: 'Console message displayed after loading is complete',
    //        onComplete: function to call when loading is complete, may be null
    //    }
    //
    //------------------------------------------------------------------
    function loadScripts(scripts, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (scripts.length > 0) {
            let entry = scripts[0];
            require(entry.scripts, function() {
                console.log(entry.message);
                if (entry.onComplete) {
                    entry.onComplete();
                }
                scripts.shift();    // Alternatively: scripts.splice(0, 1);
                loadScripts(scripts, onComplete);
            });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // Helper function used to load assets in the order specified by the
    // 'assets' parameter.  'assets' expects an array of objects with
    // the following format...
    //    {
    //        key: 'asset-1',
    //        source: 'asset/.../asset.png'
    //    }
    //
    // onSuccess is invoked per asset as: onSuccess(key, asset)
    // onError is invoked per asset as: onError(error)
    // onComplete is invoked once per 'assets' array as: onComplete()
    //
    //------------------------------------------------------------------
    function loadAssets(assets, onSuccess, onError, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (assets.length > 0) {
            let entry = assets[0];
            loadAsset(entry.source,
                function(asset) {
                    onSuccess(entry, asset);
                    assets.shift();    // Alternatively: assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                },
                function(error) {
                    onError(error);
                    assets.shift();    // Alternatively: assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // This function is used to asynchronously load image and audio assets.
    // On success the asset is provided through the onSuccess callback.
    // Reference: http://www.html5rocks.com/en/tutorials/file/xhr2/
    //
    //------------------------------------------------------------------
    function loadAsset(source, onSuccess, onError) {
        let xhr = new XMLHttpRequest();
        let fileExtension = source.substr(source.lastIndexOf('.') + 1);    // Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

        if (fileExtension) {
            xhr.open('GET', source, true);
            xhr.responseType = (fileExtension === 'txt' || fileExtension === 'bbiy') ? 'text' : 'blob';

            xhr.onload = function() {
                let asset = null;
                if (xhr.status === 200) {
                    if (fileExtension === 'png' || fileExtension === 'jpg') {
                        asset = new Image();
                    } else if (fileExtension === 'mp3') {
                        asset = new Audio();
                    } else if (fileExtension === 'txt' || fileExtension === 'bbiy') {
                        if (onSuccess) { onSuccess(xhr.responseText); }
                    } else {
                        if (onError) { onError('Unknown file extension: ' + fileExtension); }
                    }
                    if (asset !== null){
                        asset.onload = function() {
                            window.URL.revokeObjectURL(asset.src);
                            if (onSuccess) { onSuccess(asset); }
                        };
                        asset.src = window.URL.createObjectURL(xhr.response);
                    }
                } else {
                    if (onError) { onError('Failed to retrieve: ' + source); }
                }
            };
        } else {
            if (onError) { onError('Unknown file extension: ' + fileExtension); }
        }

        xhr.send();
    }

    //------------------------------------------------------------------
    //
    // Called when all the scripts are loaded, it kicks off the demo app.
    //
    //------------------------------------------------------------------
    function mainComplete() {
        console.log('Game fully loaded');
        MyGame.manager.initialize();
    }

    //
    // Start with loading the assets, then the scripts.
    console.log('Starting to dynamically load project assets');
    loadAssets(assetOrder,
        function(source, asset) {    // Store it on success
            MyGame.assets[source.key] = asset;
        },
        function(error) {
            console.log(error);
        },
        function() {
            console.log('All game assets loaded');
            console.log('Starting to dynamically load project scripts');
            loadScripts(scriptOrder, mainComplete);
        }
    );

}());
