function MovingPlatform( shard, position, size ) {
    this.shard = shard;
    this.size = size;
    
    var material = new THREE.MeshBasicMaterial( {
        color: 0x00dd33,
        side: THREE.DoubleSide,
    } );
    console.log( this.size.x );
    var geometry = new THREE.PlaneBufferGeometry( this.size.x, this.size.y );
    this.mesh = new THREE.Mesh( geometry, material );
    
    this.setPosition( position );
}

MovingPlatform.prototype.setPosition = function( position ) {
    this.position = position;
    console.log( position );
    this.mesh.position.set( position.x + ( this.size.x / 2 ), position.y + ( this.size.y / 2 ), -0.002 );
};

MovingPlatform.prototype.getMesh = function() {
    return this.mesh;
};

MovingPlatform.prototype.update = function( elapsedTime ) {
    return;
}

module.exports = MovingPlatform;
var THREE = require( 'three' );
