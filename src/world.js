//  Note: Width, height are in *shards*.
function World( width, height, shardWidth, shardHeight ) {
    this.width = width;
    this.height = height;
    this.shardWidth = shardWidth;
    this.shardHeight = shardHeight;
    
    this.tileWidth = width * shardWidth;
    this.tileHeight = height * shardHeight;

    this.shardMap = new Array( width * height );
    this.shards = [];
}

World.prototype.createShard = function() {
    var shard = new Shard( this.shardWidth, this.shardHeight );
    this.shards.push( shard );
    return shard;
};

World.prototype.getShard = function( shardX, shardY ) {
    if ( shardX >= 0 && shardX < this.width && shardY >= 0 && shardY < this.height )
        return this.shardMap[ shardY * this.width + shardX ];
    return null;
};

World.prototype.setShard = function( shardX, shardY, shard ) {
    this.shardMap[ shardY * this.width + shardX ] = shard;
};

World.prototype.getTile = function( tileX, tileY ) {
    var shardX = Math.floor( tileX / this.shardWidth );
    var shardY = Math.floor( tileY / this.shardHeight );
    var shard = this.getShard( shardX, shardY );
    
    if ( ! shard )
        return Tile.THE_VOID;
    
    return shard.getTile( tileX % this.shardWidth, tileY % this.shardHeight );
};

World.prototype.update = function( elapsedTime ) {
    for ( var i = 0; i < this.shards.length; i++ ) {
        this.shards[ i ].update( elapsedTime );
    }
};

function createTestWorld() {
    var w = new World( 5, 5, 12, 9 );
    
    var s = w.createShard();
    s.populateFromArray( [
        'pppppppppppp',
        'p          p',
        'p  g    g  p',
        'p          p',
        'p          p',
        'p g      g p',
        'p  gggggg  p',
        'p          p',
        'pppppppppppp',
    ] );
    s.bake();
    s.move( 0, -10 );

    var s = w.createShard();
    s.populateFromArray( [
        '############',
        '#          #',
        '#          #',
        '#  ##      #',
        '#       ####',
        '#   pp    ##',
        '# P      ###',
        '###     ####',
        '############',
    ] );
    s.bake();
    s.drop();
    
    return w;
}

//  Export static constructors.
module.exports = {
    createTestWorld: createTestWorld,
};

var Shard = require( './shard.js' );
