function Tilemap( width, height, defaultTile ) {
    this.width = width;
    this.height = height;

    //  Create and populate data as 1D array.
    var size = this.width * this.height;
    this.data = new Array( size );
    defaultTile = defaultTile || Tile.type.THE_VOID;
    while ( size-- ) {
        this.data[ size ] = Tile.new( defaultTile );
    }
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
            var type = Tile.symbolMap[ source[ y ][ x ] ] || Tile.type.NOTHING;
            var tile = Tile.new( type );
            
            this.set( x, y, tile );
        }
    }
};

Tilemap.prototype.blit = function( source, tx, ty ) {
    for ( sx = 0; sx < source.width; sx++ ) {
        for ( sy = 0; sy < source.height; sy++ ) {
            this.set( sx + tx, sy + ty, source.get( sx, sy ) );
        }
    }
};

Tilemap.prototype.areaIsVoid = function( x, y, width, height ) {
    for ( var cx = x; cx < x + width; cx++ ) {
        for ( var cy = y; cy < y + height; cy++ ) {
            if ( this.get( x, y ).type != Tile.type.THE_VOID )
                return false;
        }
    }
    
    return true;
};

Tilemap.prototype.generateMesh = function() {
    var geometry = new THREE.Geometry();
    var i = 0;
    var unit = 1 / 8; //  Size of a tile in the atlas
    var hp = 1 / 512; //  Half a pixel in the atlas

    for ( var y = 0; y < this.height; y++ ) {
        for ( var x = 0; x < this.width; x++ ) {
            var tile = this.get( x, y );
            var type = tile.type;
            
            if ( ! type.hasOwnProperty( 'uvx' ) ) {
                continue;
            }

            geometry.vertices.push(
                new THREE.Vector3( x, y, 0 ),
                new THREE.Vector3( x + 1, y, 0 ),
                new THREE.Vector3( x + 1, y + 1, 0 ),
                new THREE.Vector3( x, y + 1, 0 )
            );

            geometry.faces.push( new THREE.Face3( i + 0, i + 1, i + 2 ) );
            geometry.faces.push( new THREE.Face3( i + 0, i + 2, i + 3 ) );

            var uvx = type.uvx * unit;
            var uvy = type.uvy * unit;

            geometry.faceVertexUvs[ 0 ].push( [
                new THREE.Vector2( uvx + hp, 1 - uvy - hp ),
                new THREE.Vector2( uvx - hp + unit, 1 - uvy - hp ),
                new THREE.Vector2( uvx - hp + unit, 1 - uvy + hp - unit )
            ] );

            geometry.faceVertexUvs[ 0 ].push( [
                new THREE.Vector2( uvx + hp, 1 - uvy - hp ),
                new THREE.Vector2( uvx - hp + unit, 1 - uvy + hp - unit ),
                new THREE.Vector2( uvx + hp, 1 - uvy + hp - unit )
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

Tilemap.prototype.lineCollide = function( start, target ) {
    /*  //Calculate direction vector
        float dirX = (xto - xfrom);
        float dirY = (yto - yfrom);

        float length = (float) Math.sqrt(dirX * dirX + dirY * dirY);

        //Normalize direction vector
        dirX /= length;
        dirY /= length; */
    
    var vector = new THREE.Vector2( target.x - start.x, target.y - start.y );
    var length = vector.length();
    var dirX = vector.x / length;
    var dirY = vector.y / length;
    
    /*  //tDeltaX: distance in terms of vector(dirX,dirY) between two consecutive vertical lines
        tDeltaX = TILEWIDTH / Math.abs(dirX);
        tDeltaY = TILEHEIGHT / Math.abs(dirY);  */
    
    var tDeltaX = 1 / Math.abs( dirX );
    var tDeltaY = 1 / Math.abs( dirY );
    
    /*  //Determine cell where we originally are
        X = xfrom / TILEWIDTH;
        Y = yfrom / TILEHEIGHT;     */

    var X = Math.floor( start.x );
    var Y = Math.floor( start.y );
    
    /*  endX = xto / TILEWIDTH;
        endY = yto / TILEHEIGHT;    */
    
    var endX = Math.floor( target.x );
    var endY = Math.floor( target.y );
    
    /*  //stepX: Determine in what way do we move between cells
        //tMaxX: the distance in terms of vector(dirX,dirY) to the next vertical line
        if (xto > xfrom){
            blkX = 0;
            stepX = 1;
            tMaxX = ((X+1) * TILEWIDTH - xfrom) / dirX;
        }else{
            blkX = 1;
            stepX = -1;
            tMaxX = (X * TILEWIDTH - xfrom) / dirX;
        }   */
    
    if ( vector.x > 0 ) {
        var blkX = 0;
        var stepX = 1;
        var tMaxX = ( X + 1 - start.x ) / dirX;
    } else if ( vector.x < 0 ) {
        var blkX = 1;
        var stepX = -1;
        var tMaxX = ( X - start.x ) / dirX;
    } else {
        var blkX = 0;
        var stepX = 0;
        var tMaxX = 1000000000;
    }
    
    /*  if (yto > yfrom){
            blkY = 0;
            stepY = 1;
            tMaxY = ((Y+1) * TILEHEIGHT - yfrom) / dirY;
        }else{
            blkY = 1;
            stepY = -1;
            tMaxY = (Y * TILEHEIGHT - yfrom) / dirY;
        }   */
    
    if ( vector.y > 0 ) {
        var blkY = 0;
        var stepY = 1;
        var tMaxY = ( Y + 1 - start.y ) / dirY;
    } else if ( vector.y < 0 ) {
        var blkY = 1;
        var stepY = -1;
        var tMaxY = ( Y - start.y ) / dirY;
    } else {
        var blkY = 0;
        var stepY = 0;
        var tMaxY = 1000000000;
    }
    
    /*  if (isSolid(map[Y][X])) {
            //point already collides
            outCollisionPoint = new Point(xfrom, yfrom);
            return true;
        }   */
    
    var thisTile = this.get( X, Y );
    if ( thisTile.type.isWall )
        return new Collision( start, thisTile, Collision.dir.Both );
    
    /*  //Scan the cells along the line between 'from' and 'to'
        while (X != endX || Y !=endY){  */
    
    while ( X != endX || Y != endY ) {
        
        /*  if(tMaxX < tMaxY){
                tMaxX += tDeltaX;
                X += stepX;
                if (isSolid(map[Y][X])) {
                    collisionLength = ((X + blkX) * TILEWIDTH - xfrom) / dirX;
                    outCollisionPoint = new Point((int)(xfrom + dirX * collisionLength), (int)(yfrom + dirY * collisionLength));
                    return true;
                }
            } else ...  */
        
        if ( tMaxX < tMaxY ) {
            tMaxX += tDeltaX;
            X += stepX;
            thisTile = this.get( X, Y );
            if ( thisTile.type.isWall ) {
                var collisionLength = ( X + blkX - start.x ) / dirX;
                var point = new THREE.Vector2( start.x + dirX * collisionLength, start.y + dirY * collisionLength );
                return new Collision( point, thisTile, Collision.dir.Horizontal );
            }
        } else {
        
            /*  tMaxY += tDeltaY;
                Y += stepY; 
                if (isSolid(map[Y][X])) {           
                    collisionLength= ((Y  + blkY) * TILEHEIGHT - yfrom) / dirY;
                    outCollisionPoint = new Point((int)(xfrom + dirX * collisionLength), (int)(yfrom + dirY * collisionLength));
                    return true;
                }   */
            
            tMaxY += tDeltaY;
            Y += stepY;
            thisTile = this.get( X, Y );
            if ( thisTile.type.isWall ) {
                var collisionLength = ( Y + blkY - start.y ) / dirY;
                var point = new THREE.Vector2( start.x + dirX * collisionLength, start.y + dirY * collisionLength );
                return new Collision( point, thisTile, Collision.dir.Vertical );
            }
        }
        
    }
    
    return null;
};

//  Static method to convert from float-space to tile coords (just Math.flooring to give tile indices)
Tilemap.tileIndex = function( floatVector ) {
    return new THREE.Vector2( Math.floor( floatVector.x ), Math.floor( floatVector.y ) );
};

module.exports = Tilemap;

var THREE = require( 'three' );
var Assets = require( './assets.js' );
var Tile = require( './tile.js' );
var Collision = require( './collision.js' );
