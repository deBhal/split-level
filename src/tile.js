function Tile( type ) {
    this.type = type;
};

//  Tile type data. Keys:
//  - symbol: character used when populating a tilemap from an array of string.
//  - uvx, uvy: position in the tile atlas to draw
//  - isDeadly: if true, anything that touches this dies.
//  - isWall: if true, this cell is impassable.

var type = {};

type.NOTHING = {
    symbol: ' ',
};

type.THE_VOID = {
    isDeadly: true,
};

type.PURPLE = {
    uvx: 0,
    uvy: 0,
    symbol: 'p',
    isWall: true,
};
    
type.GREEN = {
    uvx: 1,
    uvy: 0,
    symbol: 'g',
    isWall: true,
};

type.BRICK = {
    uvx: 2,
    uvy: 0,
    symbol: '#',
    isWall: true,
};

var symbolMap = {};
for ( var i in type ) {
    //  Quick lookup from symbol to tile type.
    if ( type[ i ].hasOwnProperty( 'symbol' ) ) {
        symbolMap[ type[ i ].symbol ] = type[ i ];
    }
    
    //  Tiles without a specialized subclass can share an instance.
    if ( ! type[ i ].hasOwnProperty( 'sub' ) ) {
        type[ i ].inst = new Tile( type[ i ] );
    }
}

//  Export a static interface, not the class itself.
module.exports = {
    
    type: type,
    symbolMap: symbolMap,
    new: function( type ) {
        if ( type.inst )
            return type.inst;
        
        return new Tile( type );
    },
    
};
