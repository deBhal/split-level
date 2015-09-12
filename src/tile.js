Tile = {};

//  Keys:
//  - symbol: character used when populating a tilemap from an array of string.
//  - uvx, uvy: position in the tile atlas to draw
//  - isDeadly: if true, anything that touches this dies.
//  - isWall: if true, this cell is impassable.

Tile.NOTHING = {
    symbol: ' ',
};

Tile.THE_VOID = {
    isDeadly: true,
};

Tile.PURPLE = {
    uvx: 0,
    uvy: 0,
    symbol: 'p',
    isWall: true,
};
    
Tile.GREEN = {
    uvx: 1,
    uvy: 0,
    symbol: 'g',
    isWall: true,
};

Tile.BRICK = {
    uvx: 2,
    uvy: 0,
    symbol: '#',
    isWall: true,
};

Tile.symbolMap = {};
for ( var i in Tile ) {
    if ( Tile[ i ].hasOwnProperty( 'symbol' ) ) {
        Tile.symbolMap[ Tile[ i ].symbol ] = Tile[ i ];
    }
}

module.exports = Tile;
