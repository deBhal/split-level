function Shard( width, height ) {
    this.width = width;
    this.height = height;
    this.tilemap = new Tilemap( width, height, Tile.NOTHING );
}

Shard.prototype.bake = function() {
    this.mesh = this.tilemap.generateMesh();
    Engine.scene.add( this.mesh );
};

Shard.prototype.move = function( x, y ) {
    this.mesh.position.set( x, y, 0 );
};

module.exports = Shard;

var Assets = require( './assets.js' );
var Engine = require( './engine.js' );
var Tilemap = require( './tilemap.js' );
var Tile = require( './tile.js' );