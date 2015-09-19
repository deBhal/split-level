// Player art temporarily borrowed from:
// - http://opengameart.org/content/platformer-animations

function Player( shard, x, y ) {
    this.shard = shard;
    this.size = new THREE.Vector2( 0.8, 1.5 );
    this.velocity = new THREE.Vector2( 0, 0 );
    this.position = new THREE.Vector2( x, y );
    
    var material = new THREE.MeshBasicMaterial( {
        color: 0xff00ff,
        side: THREE.DoubleSide,
    } );
    var geometry = new THREE.PlaneBufferGeometry( this.size.x, this.size.y );
    this.mesh = new THREE.Mesh( geometry, material );
    
    this.setPosition( x, y - 3 );
}

Player.prototype.setPosition = function( x, y ) {
    this.position.x = x;
    this.position.y = y;
    this.mesh.position.set( x, y - ( this.size.y / 2 ), -1 );
};

Player.prototype.getMesh = function() {
    return this.mesh;
};

Player.prototype.update = function( elapsedTime ) {
    return;
    
    //  Figure out what (if anything) is under my feet. Fall if nothing.
    var underfoot = this.shard.getObstacleAtPoint( this.position.x, this.position.y + 0.01 );
    if ( ! underfoot )
        this.velocity.y += elapsedTime * 0.01;
    
    //  Apply terminal velocity to downwards momentum
    if ( this.velocity.y > 1.0 )
        this.velocity.y = 1.0;
    
    //  Move.
    /*var newPosition = */this.shard.rectCollide( this.position, this.size, this.velocity );
    //this.setPosition( newPosition.x, newPosition.y );
};

module.exports = Player;

var QuadSprite = require( './quadsprite.js' );
var Assets = require( './assets.js' );
var THREE = require( 'three' );
