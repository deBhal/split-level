var Engine = {};

var mainDiv;

Engine.init = function() {
    mainDiv = document.getElementById( 'main-wrap' );
    mainDiv.innerHTML = 'Loading assets...';
    Assets.loadResources( Engine.onAssetsReady.bind( this ) );
};

Engine.onAssetsReady = function() {
    this.createCanvas();
    this.updateDisplaySize();
    
    this.scene = new THREE.Scene();
    this.world = World.createTestWorld();
    
    this.startMainLoop();
};

Engine.createCanvas = function() {
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setClearColor( 0x002233 );
    
    mainDiv.innerHTML = '';
    mainDiv.appendChild( this.renderer.domElement );
};

Engine.updateDisplaySize = function() {
    this.displayWidth = window.innerWidth;
    this.displayHeight = window.innerHeight;
    
    this.renderer.setSize( this.displayWidth, this.displayHeight );
    
    var aspectRatio = this.displayWidth / this.displayHeight;
    this.camera = new THREE.PerspectiveCamera( 45, aspectRatio, 1, 1000 );
    
    this.camera.position.set( 0, 0, -20 );
    this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
    
    this.camera.position.set( 6, 2, -20 );
    this.camera.up = new THREE.Vector3( 0, -1, 0 );
    this.camera.lookAt( new THREE.Vector3( 6, 2, 0 ) );
};

Engine.createTestGeometry = function() {
    this.tilemapMaterial = new THREE.MeshBasicMaterial( {
        map: Assets.tilemap, 
        side: THREE.DoubleSide,
    } );
    
    this.geometry = new THREE.PlaneBufferGeometry( 2, 2, 1, 1 );
    
    this.mesh = new THREE.Mesh( this.geometry, this.tilemapMaterial );
    this.mesh.position.set( 0, 0, 0 );
    
    this.scene.add( this.mesh );
};

Engine.startMainLoop = function() {
    this.lastFrame = new Date().getTime();
    this.running = true;
    window.requestAnimationFrame( Engine.update.bind( this ) );
};

Engine.update = function() {
    if ( ! this.running )
        return;
    
    window.requestAnimationFrame( Engine.update.bind( this ) );
    
    var time = new Date().getTime();
    var elapsed = time - this.lastFrame;
    this.lastFrame = elapsed;
    
    if ( elapsed > 300 )
        elapsed = 300;
    
    this.world.update( elapsed );
    this.renderer.render( this.scene, this.camera );
};

window.stopGame = function() {
    Engine.running = false;
};

module.exports = Engine;

var THREE = require( '../js/three.min.js' );
var Assets = require( './assets.js' );
var World = require( './world.js' );