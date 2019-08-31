var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var geo1 = new THREE.BoxGeometry( 1, 1, 1 );
var mat1 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geo1, mat1 );
scene.add( cube );

var geo2 = new THREE.Geometry();
for (var x = 0;x < 1000;x++){

    geo2.vertices.push(new THREE.Vector3(Math.random()*10-5,Math.random()*10-5,Math.random()*10-5));

}
var mat2 = new THREE.LineBasicMaterial({color: 0x0000ff });
var line = new THREE.Line(geo2, mat2);
line.position = new THREE.Vector3(0,0,30);
scene.add(line);

camera.position.z = -10;

var light = new THREE.DirectionalLight(0xffeedd);
light.position = new THREE.Vector3(0,1000,0);   
scene.add(light); 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// var loader = new THREE.ObjectLoader();

// loader.load(
// 	// resource URL
// 	"bunny.obj",

// 	// onLoad callback
// 	// Here the loaded data is assumed to be an object
// 	function ( obj ) {
// 		// Add the loaded object to the scene
// 		scene.add( obj );
// 	},

// 	// onProgress callback
// 	function ( xhr ) {
// 		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
// 	},

// 	// onError callback
// 	function ( err ) {
// 		console.error( 'An error happened' );
// 	}
// );


// // Alternatively, to parse a previously loaded JSON structure
// var bunny = loader.parse( a_json_object );

// scene.add( bunny );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var animate = function () {

    cube.rotation.x = 45;
    cube.rotation.y += 0.1;
    line.position.z = 5;

    light.rotation.x += 0.1;
    light.rotation.y += 0.1;

    bunny.position.z += 0.01;
    cube.position.z += 0.01;

    camera.lookAt(new THREE.Vector3(0, 0, 20));

    requestAnimationFrame( animate );

    renderer.render( scene, camera );

};

animate();