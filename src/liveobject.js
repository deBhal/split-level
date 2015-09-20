function LiveObject( shard, position, size ) {
    this.shard = shard;
    this.size = size;
    this.mesh = this.createMesh();
    
    this.setPosition( position );
}

LiveObject.prototype.setPosition = function( position ) {
    this.position = position;
    this.mesh.position.set( this.position.x, this.position.y, 0.001 );
};

module.exports = LiveObject;
