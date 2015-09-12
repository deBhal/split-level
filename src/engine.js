var THREE = require( '../js/three.min.js' );
var Assets = require( './assets.js' );
var Engine = {}; 

var mainDiv;

Engine.init = function() {
    mainDiv = document.getElementById( 'main-wrap' );
    mainDiv.innerHTML = 'Loading assets...';
    Assets.loadResources( Engine.onAssetsReady );
};

Engine.onAssetsReady = function() {
    Engine.createCanvas();
};

Engine.createCanvas = function() {
    Engine.renderer = new THREE.WebGLRenderer( { antialias: true } );
    mainDiv.innerHTML = '';
    mainDiv.appendChild( Engine.renderer.domElement );
};

module.exports = Engine;






/*
var Shard = {
	allLoaded: function() {
		Shard.showCanvas();
		Shard.setupRenderer();
		Shard.update();
	},
	
	showCanvas: function() {
		$( '#loading' ).hide();
		$( '#main' ).show();
	},
	
	setupRenderer: function() {
		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.scene = new THREE.Scene();
		this.atlasMaterial = new THREE.MeshPhongMaterial( { map: this.tiles, side: THREE.DoubleSide } );
		this.camera = new THREE.OrthographicCamera( -20, 20, -20, 20, 1, 1000 );
		
		var geometry = new THREE.PlaneBufferGeometry( 10, 10, 1, 1 );

		this.mesh = new THREE.Mesh( geometry, this.atlasMaterial );
		this.mesh.position.set( 0, 0, -10 );
		this.mesh.lookAt(this.camera.position);
		
		this.scene.add( this.mesh );
		
		this.renderer.setClearColor( 0x003333 );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );

		$( '#main' ).append( this.renderer.domElement );
	},
	
	update: function() {
//		requestAnimationFrame( Shard.update );
		Shard.render();
	},
	
	render: function() {
		this.renderer.render( this.scene, this.camera );
	}

};



Shard.init();


/*

renderer = new THREE.WebGLRenderer( { antialias: true } );

				camera = new THREE.PerspectiveCamera( 35, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 25000 );
				camera.position.z = 200;

				scene = new THREE.Scene();

				var light = new THREE.DirectionalLight( 0xffffff, 2 );
				light.position.set( 1, 1, 1 );
				scene.add( light );

				var loader = new THREE.TGALoader();

				// add box 1 - grey8 texture
				var texture1 = loader.load( 'textures/crate_grey8.tga' );
				var material1 = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture1 } );

				var geometry = new THREE.BoxGeometry( 50, 50, 50 );
				var mesh1 = new THREE.Mesh( geometry, material1 );
				mesh1.rotation.x = -Math.PI / 2;
				mesh1.position.x = - 50;

				scene.add( mesh1 );

				// add box 2 - tga texture
				var texture2 = loader.load( 'textures/crate_color8.tga' );
				var material2 = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture2 } );

				var mesh2 = new THREE.Mesh( geometry, material2 );
				mesh2.rotation.x = -Math.PI / 2;
				mesh2.position.x = 50;

				scene.add( mesh2 );

				// RENDERER

				renderer.setClearColor( 0xf2f7ff );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
				renderer.autoClear = false;

				renderer.domElement.style.position = "relative";
				container.appendChild( renderer.domElement );

				// STATS1
				stats = new Stats();
				container.appendChild( stats.domElement );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );

*/
