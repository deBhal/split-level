function Shard( width, height ) {
    this.width = width;
    this.height = height;
    this.tilemap = new Tilemap( width, height, Tile.THE_VOID );
    
    this.x = 0;
    this.y = 0;
    
    this.world = null;
    this.liveObjects = [];
}

Shard.prototype.bake = function() {
    this.mesh = this.tilemap.generateMesh();
    
    for ( var i = 0; i < this.liveObjects.length; i++ )
        this.mesh.add( this.liveObjects[i].getMesh() );
    
    Engine.scene.add( this.mesh );
};

Shard.prototype.move = function( x, y ) {
    this.mesh.position.set( x, y, 0 );
};

Shard.prototype.drop = function( world ) {
    this.lift();
    
    //  Lock into an exact tile-aligned spot...
    this.x = Math.round( this.x );
    this.y = Math.round( this.y );
    
    var mainShard = world.mainShard;
    var mainTilemap = mainShard.tilemap;
    
    //  Make sure we don't overwrite anything...
    if ( ! mainTilemap.areaIsVoid( this.x, this.y, this.width, this.height ) )
        return false;
    
    //  Write my tile data in place...
    mainTilemap.blit( this.tilemap, this.x, this.y );
    
    //  Move my live objects across...
    for ( var i = 0; i < this.liveObjects.length; i++ ) {
        var obj = this.liveObjects[ i ];
        obj.setPosition( obj.x + this.x, obj.y + this.y );
        mainShard.liveObjects.push( obj );
    }
    this.liveObjects = [];
    
    this.world = world;
};

Shard.prototype.lift = function() {
    if ( ! this.world )
        return;
    
    //  Todo.
    
    this.world = null;
};

Shard.prototype.getTile = function( x, y ) {
    if ( x >= 0 && x < this.width && y >= 0 && y < this.width )
        return this.tilemap.get( x, y );
    
    if ( world )
        return world.getTile( x + this.x, y + this.y );
    
    return Tile.THE_VOID;
};

Shard.prototype.setTile = function( x, y ) {
    return this.tilemap.set( x, y );
};

Shard.prototype.populateFromArray = function( data ) {
    this.tilemap.populateFromArray( data );
    
    for ( var x = 0; x < this.width; x++ ) {
        for ( var y = 0; y < this.height; y++ ) {
            var symbol = data[y][x];
            
            if ( 'P' == symbol )  //  Player.
                this.liveObjects.push( new Player( this, x + 0.5, y + 1.0 ) );
        }
    }
};

Shard.prototype.update = function( elapsedTime ) {
    if ( this.world )
        return; //  Don't update shards that are in the main world shard; they'll get updated already.
    
    for ( var i = 0; i < this.liveObjects.length; i++ ) {
        this.liveObjects[ i ].update( elapsedTime );
    }
};

module.exports = Shard;

var Assets = require( './assets.js' );
var Engine = require( './engine.js' );
var Tilemap = require( './tilemap.js' );
var Tile = require( './tile.js' );
var Player = require( './player.js' );