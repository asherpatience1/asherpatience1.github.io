var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(72, window.innerWidth/window.innerHeight, 0.1, 10000);

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

camera.position.z = -10;
camera.position.y = 3;
camera.lookAt(new THREE.Vector3(0,-5,0));

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
    color: 0x0000ff,
    wireframe: true
});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

var tick = 0;
var xSize = 20;
var ySize = 20;
var startPos = [];
var targetPos = [];
var smoothRate = 0.05;
for (var x = 0;x < xSize;x++){

    for (var y = 0;y < ySize;y++){

        geometry.vertices.push(new THREE.Vector3((x)-(xSize/2),0,(y)-(ySize/2)));
        startPos.push(new THREE.Vector3((x)-(xSize/2),0,(y)-(ySize/2)));
        targetPos.push(new THREE.Vector3((x)-(xSize/2),0,(y)-(ySize/2)));
        geometry.vertices.push(new THREE.Vector3((x)-(xSize/2),0,(y)-(ySize/2)));
        startPos.push(new THREE.Vector3((x)-(xSize/2),0,(y+1)-(ySize/2)));
        targetPos.push(new THREE.Vector3((x)-(xSize/2),0,(y+1)-(ySize/2)));
        geometry.vertices.push(new THREE.Vector3((x)-(xSize/2),0,(y)-(ySize/2)));
        startPos.push(new THREE.Vector3((x+1)-(xSize/2),0,(y+1)-(ySize/2)));
        targetPos.push(new THREE.Vector3((x+1)-(xSize/2),0,(y+1)-(ySize/2)));
        geometry.faces.push(new THREE.Face3(tick, tick+1, tick+2));

        geometry.vertices.push(new THREE.Vector3((x)-(xSize/2),0,(y)-(ySize/2)));
        startPos.push(new THREE.Vector3((x)-(xSize/2),0,(y)-(ySize/2)));
        targetPos.push(new THREE.Vector3((x)-(xSize/2),0,(y)-(ySize/2)));
        geometry.vertices.push(new THREE.Vector3((x)-(xSize/2),0,(y)-(ySize/2)));
        startPos.push(new THREE.Vector3((x+1)-(xSize/2),0,(y+1)-(ySize/2)));
        targetPos.push(new THREE.Vector3((x+1)-(xSize/2),0,(y+1)-(ySize/2)));
        geometry.vertices.push(new THREE.Vector3((x)-(xSize/2),0,(y)-(ySize/2)));
        startPos.push(new THREE.Vector3((x+1)-(xSize/2),0,(y)-(ySize/2)));
        targetPos.push(new THREE.Vector3((x+1)-(xSize/2),0,(y)-(ySize/2)));
        geometry.faces.push(new THREE.Face3(tick+3, tick+4, tick+5));

        tick += 6;

    }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var ticker = 0;

var update = function(){

    ticker ++;
    if (ticker % 60 == 0){

        for (var x = 0;x < geometry.vertices.length;x++){

            targetPos[x] = new THREE.Vector3(startPos[x].x,startPos[x].y,startPos[x].z);
            targetPos[x].x += (Math.random()-0.5)*0.1;
            targetPos[x].y += (Math.random()-0.5)*0.1;
            targetPos[x].z += (Math.random()-0.5)*0.1;

        }

    }

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