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
    
    this.update();
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
    
    this.camera.position.set( 6, 9, -40 );
    this.camera.up = new THREE.Vector3( 0, -1, 0 );
    this.camera.lookAt( new THREE.Vector3( 6, 9, 0 ) );
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

Engine.update = function() {
    //  Before there's anything to animate, animating seems like a waste of battery.
    // window.requestAnimationFrame( Engine.update.bind( this ) );
    
    this.renderer.render( this.scene, this.camera );
};

module.exports = Engine;

var THREE = require( '../js/three.min.js' );
var Assets = require( './assets.js' );
var World = require( './world.js' );