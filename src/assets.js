var Assets = {}; 

var awaitingCompletion = 0; //  Promise me?
var loadManager = null;
var textureLoader = null;
var readyCallback = null;

Assets.loadResources = function( onReady ) {
    awaitingCompletion = [];
    readyCallback = onReady;
    loadManager = new THREE.LoadingManager();
    textureLoader = new THREE.TextureLoader();
    
    Assets.loadTexture( 'tilemap', '/assets/tiles.png' );
    Assets.loadTexture( 'player', '/assets/player.png' );
};

Assets.loadTexture = function( key, filename ) {
    awaitingCompletion++;
    
    textureLoader.load( filename, function( texture ) {
        texture.magFilter = THREE.NearestFilter;
        
        Assets[ key ] = texture;
        Assets.checkIfFinished();
    } );
};

Assets.checkIfFinished = function() {
    awaitingCompletion--;
    
    if ( awaitingCompletion == 0 )
        readyCallback();
};

module.exports = Assets;
var THREE = require( '../js/three.min.js' );
