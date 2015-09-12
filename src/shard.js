function Shard( width, height ) {
    this.width = width;
    this.height = height;
}

Shard.prototype.bake = function() {
    Engine.scene.add( this.generateMesh() );
};

Shard.prototype.generateMesh = function() {
    var geometry = new THREE.Geometry();
    var i = 0;
    var unit = 1 / 8;
    for ( var y = 0; y < this.height; y++ ) {
        for ( var x = 0; x < this.width; x++ ) {
            geometry.vertices.push(
                new THREE.Vector3( x    , y    , 0 ),
                new THREE.Vector3( x + 1, y    , 0 ),
                new THREE.Vector3( x + 1, y + 1, 0 ),
                new THREE.Vector3( x    , y + 1, 0 )
            );
                
            geometry.faces.push( new THREE.Face3( i + 0, i + 1, i + 2 ) );
            geometry.faces.push( new THREE.Face3( i + 0, i + 2, i + 3 ) );
            
            //  Alternate between tile 0 and 1.
            var offset = ( ( x + y ) % 2 ) * unit;
            
            geometry.faceVertexUvs[0].push( [
                new THREE.Vector2( 0 + offset,    1        ),
                new THREE.Vector2( unit + offset, 1        ),
                new THREE.Vector2( unit + offset, 1 - unit )
            ] );
            
            geometry.faceVertexUvs[0].push( [
                new THREE.Vector2( 0 + offset,    1        ),
                new THREE.Vector2( unit + offset, 1 - unit ),
                new THREE.Vector2( 0 + offset,    1 - unit )
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

module.exports = Shard;

var THREE = require( '../js/three.min.js' );
var Assets = require( './assets.js' );
var Engine = require( './engine.js' );