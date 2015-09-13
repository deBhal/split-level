// Player art temporarily borrowed from:
// - http://opengameart.org/content/platformer-animations

function Player( shard, x, y ) {
    this.x = x;
    this.y = y;
    
    this.quad = new QuadSprite( Assets.tilemap, 4, 1, 1 );
    this.quad.setFrame( 4 );
    this.quad.mesh.position.set( 0, 0, -1 );
    
    this.runFrame = 0;
}

Player.prototype.getMesh = function() {
    return this.quad.mesh;
};

Player.prototype.update = function( elapsedTime ) {
    this.runFrame += ( elapsedTime / 1000 );
    while( this.runFrame > 8 )
        this.runFrame -= 8;
    this.quad.setFrame( Math.floor( this.runFrame ) + 4 );
};

module.exports = Player;

var QuadSprite = require( './quadsprite.js' );
var Assets = require( './assets.js' );
