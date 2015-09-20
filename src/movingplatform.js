function MovingPlatform( shard, position, size ) {
    LiveObject.call( this, shard, position, size );
}

var LiveObject = require( './liveobject.js' );
MovingPlatform.prototype = LiveObject.prototype;

MovingPlatform.prototype.createMesh = function() {
    var material = new THREE.MeshBasicMaterial( {
        color: 0x00dd33,
        side: THREE.DoubleSide,
    } );
    var geometry = new THREE.PlaneBufferGeometry( this.size.x, this.size.y );
    return new THREE.Mesh( geometry, material );
};

MovingPlatform.prototype.update = function( elapsedTime ) {
    return;
};

module.exports = MovingPlatform;
var THREE = require( 'three' );
