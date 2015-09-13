function Tilemap( width, height, defaultTile ) {
    this.width = width;
    this.height = height;
    
    //  Create and populate data as 1D array.
    var size = this.width * this.height;
    this.data = new Array( size );
    defaultTile = defaultTile || Tile.NOTHING;
    while ( size-- )
        this.data[size] = defaultTile;
}

Tilemap.prototype.get = function( x, y ) {
    return this.data[ y * this.width + x ];
};

Tilemap.prototype.set = function( x, y, tile ) {
    this.data[ y * this.width + x ] = tile;
};

Tilemap.prototype.populateFromArray = function( source ) {
    for ( var y = 0; y < this.height; y++ ) {
        for ( var x = 0; x < this.width; x++ ) {
            var tile = Tile.symbolMap[ source[y][x] ];
            if ( ! tile )
                tile = Tile.NOTHING;
            
            this.set( x, y, tile );
        }
    }
};

Tilemap.prototype.generateMesh = function() {
    var geometry = new THREE.Geometry();
    var i = 0;
    var unit = 1 / 8;   //  Size of a tile in the atlas
    var hp = 1 / 512;   //  Half a pixel in the atlas
    
    for ( var y = 0; y < this.height; y++ ) {
        for ( var x = 0; x < this.width; x++ ) {
            var tile = this.get( x, y );
            
            if ( ! tile.hasOwnProperty( 'uvx' ) )
                continue;
            
            geometry.vertices.push(
                new THREE.Vector3( x    , y    , 0 ),
                new THREE.Vector3( x + 1, y    , 0 ),
                new THREE.Vector3( x + 1, y + 1, 0 ),
                new THREE.Vector3( x    , y + 1, 0 )
            );
                
            geometry.faces.push( new THREE.Face3( i + 0, i + 1, i + 2 ) );
            geometry.faces.push( new THREE.Face3( i + 0, i + 2, i + 3 ) );
            
            var uvx = tile.uvx * unit;
            var uvy = tile.uvy * unit;
            
            geometry.faceVertexUvs[0].push( [
                new THREE.Vector2( uvx + hp,        1 - uvy - hp        ),
                new THREE.Vector2( uvx - hp + unit, 1 - uvy - hp        ),
                new THREE.Vector2( uvx - hp + unit, 1 - uvy + hp - unit )
            ] );
            
            geometry.faceVertexUvs[0].push( [
                new THREE.Vector2( uvx + hp,        1 - uvy - hp        ),
                new THREE.Vector2( uvx - hp + unit, 1 - uvy + hp - unit ),
                new THREE.Vector2( uvx + hp,        1 - uvy + hp - unit )
            ] );
            
            i += 4;
        }
    }
    
    geometry.verticesNeedUpdate = true;
    geometry.elementsNeedUpdate = true;
    geometry.uvsNeedUpdate = true;
    
    var tilemapMaterial = new THREE.MeshBasicMaterial( {
        map: Assets.tilemap, 
        side: THREE.DoubleSide,
    } );
    
    var mesh = new THREE.Mesh( geometry, tilemapMaterial );
    mesh.position.set( 0, 0, 0 );
    
    return mesh;
};


module.exports = Tilemap;

var THREE = require( 'three' );
var Assets = require( './assets.js' );
var Tile = require( './tile.js' );
