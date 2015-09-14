// Player art temporarily borrowed from:
// - http://opengameart.org/content/platformer-animations

function Player( shard, x, y ) {
    this.x = x;
    this.y = y;
    this.width = 0.8;
    this.height = 1.5;

    var material = new THREE.MeshBasicMaterial( {
        color: 0xff00ff,
        side: THREE.DoubleSide,
    } );
    var geometry = new THREE.PlaneBufferGeometry( this.width, this.height );
    this.mesh = new THREE.Mesh( geometry, material );
}

Player.prototype.setPosition = function( x, y ) {
    this.x = x;
    this.y = y;
    this.mesh.position.set( x, y - ( this.height / 2 ), -1 );
};

Player.prototype.getMesh = function() {
    return this.mesh;
};

Player.prototype.update = function( elapsedTime ) {
};

module.exports = Player;

var QuadSprite = require( './quadsprite.js' );
var Assets = require( './assets.js' );
var THREE = require( 'three' );
