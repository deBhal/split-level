function World( width, height, shardWidth, shardHeight ) {
    if ( width % shardWidth != 0 || height % shardHeight != 0 )
        console.log( 'Warning: World size is not a multiple of shard size!' );
    
    this.width = width;
    this.height = height;
    this.shardWidth = shardWidth;
    this.shardHeight = shardHeight;
    
    this.shards = [];
}

World.prototype.createShard = function() {
    var shard = new Shard( this.shardWidth, this.shardHeight );
    this.shards.push( shard );
    return shard;
};

function createTestWorld() {
    var w = new World( 120, 90, 12, 9 );
    
    var s = w.createShard();
    s.tilemap.populateFromArray( [
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
    
    var s = w.createShard();
    s.tilemap.populateFromArray( [
        'pppppppppppp',
        'p          p',
        'p          p',
        'p  g    g  p',
        'p          p',
        'p  gggggg  p',
        'p g      g p',
        'p          p',
        'pppppppppppp',
    ] );
    s.bake();
    s.move( 0, 10 );
    
    return w;
}

//  Export static constructors.
module.exports = {
    createTestWorld: createTestWorld,
};

var Shard = require( './shard.js' );
