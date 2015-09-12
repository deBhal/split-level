var THREE = require( '../js/three.min.js' );
var Assets = {}; 

var awaitingCompletion = 0; //  Promise me?
var loadManager = null;
var imageLoader = null;
var readyCallback = null;

Assets.loadResources = function( onReady ) {
    awaitingCompletion = [];
    readyCallback = onReady;
    loadManager = new THREE.LoadingManager();
    imageLoader = new THREE.ImageLoader();
    
    Assets.loadImage( 'tilemap', '/assets/tiles.png' );
};

Assets.loadImage = function( key, filename ) {
    awaitingCompletion++;
    
    imageLoader.load( filename, function( image ) {
        Assets[ key ] = image;
        Assets.checkIfFinished();
    } );
};

Assets.checkIfFinished = function() {
    awaitingCompletion--;
    
    if ( awaitingCompletion == 0 )
        readyCallback();
};

module.exports = Assets;
