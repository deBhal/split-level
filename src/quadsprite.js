function QuadSprite( texture, tilesPerSide, width, height ) {
    this.texture = Assets.player.clone();
    this.tilesPerSide = tilesPerSide;
    this.tileSize = 1 / tilesPerSide;
    
    this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.repeat.set( this.tileSize, this.tileSize );
    this.texture.flipY = false;
    this.texture.needsUpdate = true;
    
    var material = new THREE.MeshBasicMaterial( {
        map: this.texture,
        side: THREE.DoubleSide,
        transparent: true,
    } );
    
    var geometry = new THREE.PlaneBufferGeometry( width, height, 1, 1 );
    this.mesh = new THREE.Mesh( geometry, material );
    
    this.setFrame( 0 );
}

QuadSprite.prototype.setFrame = function ( frameNo ) {
    if ( this.frame == frameNo )
        return;
    this.frame = frameNo;
    
    this.texture.offset.x = ( frameNo % this.tilesPerSide ) * this.tileSize;
    this.texture.offset.y = 1 - ( 1 + Math.floor( frameNo / this.tilesPerSide ) ) * this.tileSize;
    
    this.texture.needsUpdate = true;
};

module.exports = QuadSprite;

var THREE = require( '../js/three.min.js' );
var Assets = require( './assets.js' );