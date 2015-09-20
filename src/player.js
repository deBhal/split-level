// Player art temporarily borrowed from:
// - http://opengameart.org/content/platformer-animations

function Player( shard, position ) {
    LiveObject.call( this, shard, position, new THREE.Vector2( 0.8, 1.5 ) );
    this.velocity = new THREE.Vector2( 0, 0 );
}

var LiveObject = require( './liveobject.js' );
Player.prototype = Object.create( LiveObject.prototype );

Player.prototype.createMesh = function() {
    var material = new THREE.MeshBasicMaterial( {
        color: 0xff00ff,
        side: THREE.DoubleSide,
    } );
    var geometry = new THREE.PlaneBufferGeometry( this.size.x, this.size.y );
    return new THREE.Mesh( geometry, material );
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
    /*var newPosition = */ //this.shard.rectCollide( this.position, this.size, this.velocity );
    //this.setPosition( newPosition.x, newPosition.y );
};

module.exports = Player;

var QuadSprite = require( './quadsprite.js' );
var Assets = require( './assets.js' );
var THREE = require( 'three' );
