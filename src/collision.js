function Collision( position, subject, direction ) {
    this.position = position;
    this.subject = subject;
    this.direction = direction;
};

Collision.dir = {
    Vertical: 0x01,
    Horizontal: 0x02,
    Both: 0x03
};

//  Liang-barksy line clipping algorithm, adapted to find collisions with axis-aligned rectangles.
Collision.line_through_rectangle = function( obj, left, top, right, bottom, start, target ) {    
    if ( start.x >= left && start.x <= right && start.y >= top && start.y <= bottom )
        return new Collision( start, obj, Collision.dir.Both );
    
    var dx = target.x - start.x;
    var dy = target.y - start.y;
    
    var tMinimum = 0;
    var tMaximum = 1;
    
    function pqClip( directedProjection, directedDistance ) {
        if ( directedProjection == 0 ) {
            if ( directedDistance < 0 )
                return false;
        } else {
            var amount = directedDistance / directedProjection;
            if ( directedProjection < 0 ) {
                if ( amount > tMaximum )
                    return false;
                else if ( amount > tMinimum )
                    tMinimum = amount;
            } else {
                if ( amount < tMinimum )
                    return false;
                else if ( amount < tMaximum )
                    tMaximum = amount;
            }
            
            return true;
        }
    }
    
    if ( pqClip( -dx, start.x - left ) ) {
        if ( pqClip( dx, right - start.x ) ) {
            if ( pqClip( -dy, start.y - top ) ) {
                if ( pqClip( dy, bottom - start.y ) ) {
                    if ( tMinimum > 0 ) {
                        //  Hit!
                        return new Collision( new THREE.Vector2( start.x + tMinimum * dx, start.y + tMinimum * dy ) );
                    }
                }
            }
        }
    }
    
    return null;
};

window.Collision = Collision;

module.exports = Collision;
