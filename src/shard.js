function Shard( width, height ) {
    this.width = width;
    this.height = height;
    this.tilemap = new Tilemap( width, height, Tile.NOTHING );
}

Shard.prototype.bake = function() {
    Engine.scene.add( this.tilemap.generateMesh() );
};

module.exports = Shard;

var Assets = require( './assets.js' );
var Engine = require( './engine.js' );
var Tilemap = require( './tilemap.js' );
var Tile = require( './tile.js' );