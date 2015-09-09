
document.write( "It works." );
console.log( 'entry.js' );
require( './cube.js' );
var timer = 0;
function ticker() {
	document.title = timer++ + " It works, until you open the browser ";
	setTimeout( ticker, 1000 );
}

ticker();