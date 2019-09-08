var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 10000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", function (){

    var width = window.innerWidth;
    var height = window.innerHeight;

    renderer.setSize(width, height);

    camera.aspect = width/height;
    camera.updateProjectionMatrix();

});

// Mouse
window.addEventListener( 'mousemove', onMouseMove, false );
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

camera.position.z = 36;
camera.position.y = 6;
camera.position.x = 10;
camera.lookAt(new THREE.Vector3(10,-12,0));

var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add(ambientLight);

// var loader = new THREE.OBJLoader();
// var theGrid;
// loader.load("grid.obj", function(object){

//     theGrid = object;
//     scene.add(object);

// });

var texLoader = new THREE.TextureLoader();
texLoader.load("back.jpg", function(texture){

             scene.background = texture;  

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var geometry = new THREE.Geometry();
material = new THREE.MeshBasicMaterial({
    color: 0x33ccff,
    wireframe: true
});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

var tick = 0;
var xSize = 40;
var ySize = 70;
var startPos = [];
var targetPos = [];
var smoothRate = 0.05;
var scaler = 0.5;
for (var x = 0;x < xSize;x++){

    for (var y = 0;y < ySize;y++){

        geometry.vertices.push(new THREE.Vector3((x*scaler),0,(y*scaler)));
        startPos.push(new THREE.Vector3((x*scaler),0,(y*scaler)));
        targetPos.push(new THREE.Vector3((x*scaler),0,(y*scaler)));
        geometry.vertices.push(new THREE.Vector3((x*scaler),0,(y*scaler)));
        startPos.push(new THREE.Vector3((x*scaler),0,(y*scaler+1)));
        targetPos.push(new THREE.Vector3((x*scaler),0,(y*scaler+1)));
        geometry.vertices.push(new THREE.Vector3((x*scaler),0,(y*scaler)));
        startPos.push(new THREE.Vector3((x*scaler+1),0,(y*scaler+1)));
        targetPos.push(new THREE.Vector3((x*scaler+1),0,(y*scaler+1)));
        geometry.faces.push(new THREE.Face3(tick, tick+1, tick+2));

        geometry.vertices.push(new THREE.Vector3((x*scaler),0,(y*scaler)));
        startPos.push(new THREE.Vector3((x*scaler),0,(y*scaler)));
        targetPos.push(new THREE.Vector3((x*scaler),0,(y*scaler)));
        geometry.vertices.push(new THREE.Vector3((x*scaler),0,(y*scaler)));
        startPos.push(new THREE.Vector3((x*scaler+1),0,(y*scaler+1)));
        targetPos.push(new THREE.Vector3((x*scaler+1),0,(y*scaler+1)));
        geometry.vertices.push(new THREE.Vector3((x*scaler),0,(y*scaler)));
        startPos.push(new THREE.Vector3((x*scaler+1),0,(y*scaler)));
        targetPos.push(new THREE.Vector3((x*scaler+1),0,(y*scaler)));
        geometry.faces.push(new THREE.Face3(tick+3, tick+4, tick+5));

        tick += 6;

    }

}

var raycaster = new THREE.Raycaster();
var rayPos = new THREE.Vector2();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var ticker = 0;

var update = function(){

    // RAY
    raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children );

	for ( var i = 0; i < intersects.length; i++ ) {

		rayPos.x = intersects[i].point.x;
        rayPos.y = intersects[i].point.z;

        console.log(rayPos.x+" - "+rayPos.y);

    }
    
    // UPDATE TARGETS
    ticker ++;
    if (ticker % 1 == 0){

        for (var x = 0;x < geometry.vertices.length;x++){

            targetPos[x] = new THREE.Vector3(startPos[x].x,startPos[x].y,startPos[x].z);
            targetPos[x].x += (Math.random()-0.5)*0.2;
            targetPos[x].y += (Math.random()-0.5)*0.2;
            targetPos[x].z += (Math.random()-0.5)*0.2;

            var totalDist = startPos[x].distanceTo(new THREE.Vector3(rayPos.x,0,rayPos.y));

            var newPos = 3-totalDist;
            // newPos *= 2;
            if (newPos < 0){newPos = 0;}

            targetPos[x].y += newPos;

        }

    }

    // SMOOTH MOVEMENT
    for (var x = 0;x < ((xSize*ySize)*6);x++){

        var currPos = geometry.vertices[x];
        var targPos = targetPos[x];

        geometry.vertices[x].set(
            currPos.x+((targPos.x-currPos.x)*smoothRate),
            currPos.y+((targPos.y-currPos.y)*smoothRate),
            currPos.z+((targPos.z-currPos.z)*smoothRate)
        );

    }

    geometry.verticesNeedUpdate = true;

}

var render = function(){

    renderer.render(scene, camera);

}

var GameLoop = function (){

    requestAnimationFrame(GameLoop);

    update();

    render();

}

GameLoop();