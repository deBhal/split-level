function World( width, height ) {
    this.width = width;
    this.height = height;
    
    this.mainShard = new Shard( this.width, this.height );
    this.shards = [];
}

World.prototype.createShard = function( w, h ) {
    var shard = new Shard( w, h );
    this.shards.push( shard );
    return shard;
};

World.prototype.update = function( elapsedTime ) {
    this.mainShard.update( elapsedTime );
    
    for ( var i = 0; i < this.shards.length; i++ ) {
        this.shards[ i ].update( elapsedTime );
    }
};

function createTestWorld() {
    var w = new World( 50, 50 );
    
    var s = w.createShard( 12, 9 );
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
    s.drop( w );
    
    return w;
}

//  Export static constructors.
module.exports = {
    createTestWorld: createTestWorld,
};

var Shard = require( './shard.js' );
