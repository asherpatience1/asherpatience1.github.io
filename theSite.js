const canvas = document.querySelector('#c');

const scene = new THREE.Scene();
// {
//   const color = 0x3876E8;
//   const near = 10;
//   const far = 50;
//   scene.fog = new THREE.Fog(color, near, far);
// }
var camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 10000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.autoClear = false;
composer = new THREE.EffectComposer(renderer);
var sunRenderModel = new THREE.RenderPass(scene, camera);
var effectBloom = new THREE.BloomPass(1.25, 17.5, 10);
var sceneRenderModel = new THREE.RenderPass(scene, camera);
var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
effectCopy.renderToScreen = true;
composer.addPass(sunRenderModel);
composer.addPass(effectBloom);
composer.addPass(effectCopy);

// var bokehPass = new THREE.BokehPass( scene, camera, {
//     focus: 4,
//     aperture:	2.2,
//     maxblur:	1,
//     width: window.innerWidth,
//     height: window.innerHeight
// } );
// composer.addPass(bokehPass);

window.addEventListener("resize", function (){

    var width = window.innerWidth;
    var height = window.innerHeight;

    renderer.setSize(width, height);

    camera.aspect = width/height;
    camera.updateProjectionMatrix();

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

camera.position.z = 10;
camera.position.y = 5;
camera.position.x = 3.5;
camera.lookAt(new THREE.Vector3(10,0,0));

// var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
// scene.add(ambientLight);

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

var geo1 = new THREE.SphereGeometry(0.1, 9, 9);
var geoMat = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    wireframe: false
});
var sphere1 = new THREE.Mesh(geo1, geoMat);
sphere1.position.set(10,10,10);
scene.add(sphere1);

var geometry = new THREE.Geometry();
material = new THREE.MeshBasicMaterial({
    color: 0x3C5A98,
    wireframe: true
});

//3876E8

var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

var tick = 0;
var xSize = 40;
var ySize = 70;
var startPos = [];
var targetPos = [];
var smoothRate = 0.025;
var meshSmoothRate = 0.015;
var scaler = 0.5;
var meshTarget = new THREE.Vector3(10,0,10);
var meshCurr = new THREE.Vector3(10,0,10);
var camOffset = new THREE.Vector3(0,3,3);
var camFollowRate = 0.02;
var sphereRate = 0.015;
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

var plnGeo = new THREE.PlaneGeometry(0.9,0.3,2,2);
const loader = new THREE.TextureLoader();
const plnMat = new THREE.MeshBasicMaterial({map: loader.load('logo.png'),});
plnMat.transparent = true;
var pln = new THREE.Mesh(plnGeo, plnMat);
// scene.add(pln);
pln.parent = camera;

pln.position.x = 0;
pln.position.y = 0.7;
pln.position.z = -2;
pln.rotation.x = 0;
pln.rotation.y = 0;
pln.rotation.z = 0;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var ticker = 0;
var update = function(){

    var castPos = new THREE.Vector3(sphere1.position.x,sphere1.position.y-0.2,sphere1.position.z);    
    var raycaster = new THREE.Raycaster(castPos, new THREE.Vector3(0,-1,0), 0, 100);
    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0){

        sphere1.position.y = intersects[0].point.y + 0.3;

    }

    camera.position.x = camera.position.x+(((meshTarget.x+camOffset.x)-camera.position.x)*camFollowRate),
    camera.position.y = camera.position.y+(((meshTarget.y+camOffset.y)-camera.position.y)*camFollowRate),
    camera.position.z = camera.position.z+(((meshTarget.z+camOffset.z)-camera.position.z)*camFollowRate)

    camera.lookAt(new THREE.Vector3(
        meshCurr.x,
        meshCurr.y+1.75,
        meshCurr.z
    ));

    meshCurr = new THREE.Vector3(
        meshCurr.x+((meshTarget.x-meshCurr.x)*meshSmoothRate),
        0,
        meshCurr.z+((meshTarget.z-meshCurr.z)*meshSmoothRate)
    );

    // UPDATE TARGETS
    for (var x = 0;x < geometry.vertices.length;x++){

        targetPos[x] = new THREE.Vector3(startPos[x].x,startPos[x].y,startPos[x].z);
        // targetPos[x].x += (Math.random()-0.5)*0.2;
        // targetPos[x].y += (Math.random()-0.5)*0.2;
        // targetPos[x].z += (Math.random()-0.5)*0.2;

        var totalDist = startPos[x].distanceTo(new THREE.Vector3(meshCurr.x,0,meshCurr.z));

        var newPos = 1.5-totalDist;
        // newPos *= 2;
        if (newPos < 0){newPos = 0;}

        targetPos[x].y += newPos;

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

    ticker ++;
    if (ticker > 200){

        camOffset.x = (Math.random()*6)-3;

        meshTarget = new THREE.Vector3(
            (Math.random()*16)+2,
            0,
            (Math.random()*16)+2
        );

        ticker -= 200;

    }

}

var render = function(){

    renderer.render(scene, camera);

}

var GameLoop = function (){

    update();

    requestAnimationFrame(GameLoop);

    composer.render(1.0);

}

GameLoop();