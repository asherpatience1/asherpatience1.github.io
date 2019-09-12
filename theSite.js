const canvas = document.querySelector('#c');

const scene = new THREE.Scene();
// {
//   const color = 0x3876E8;
//   const near = 10;
//   const far = 50;
//   scene.fog = new THREE.Fog(color, near, far);
// }
var camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 10000);

window.addEventListener( 'mousedown', onMouseMove, false );
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();


var aboutPos = new THREE.Vector3(5,1,5);
var contactPos = new THREE.Vector3(14,1,12);
var servicesPos = new THREE.Vector3(16,1,7);
var industriesPos = new THREE.Vector3(6,1,18);

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children );

    for ( var i = 0; i < intersects.length; i++ ) {

        if (intersects[i].object == plnAbout){

            camOffset.x = (Math.random()*6)-3;
            meshTarget = aboutPos;

        }

        if (intersects[i].object == plnContact){

            camOffset.x = (Math.random()*6)-3;
            meshTarget = contactPos;

        }

        if (intersects[i].object == plnServices){

            camOffset.x = (Math.random()*6)-3;
            meshTarget = servicesPos;

        }

        if (intersects[i].object == plnIndustries){

            camOffset.x = (Math.random()*6)-3;
            meshTarget = industriesPos;

        }

	}

}

function SphereCasts(){

    var castPos = new THREE.Vector3(aboutSphere.position.x,aboutSphere.position.y-0.1,aboutSphere.position.z);    
    var raycaster = new THREE.Raycaster(castPos, new THREE.Vector3(0,-1,0), 0, 100);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0){
        aboutSphere.position.y = intersects[0].point.y + 0.3;
    }

    var castPos = new THREE.Vector3(contactSphere.position.x,contactSphere.position.y-0.1,contactSphere.position.z);    
    var raycaster = new THREE.Raycaster(castPos, new THREE.Vector3(0,-1,0), 0, 100);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0){
        contactSphere.position.y = intersects[0].point.y + 0.3;
    }

    var castPos = new THREE.Vector3(servicesSphere.position.x,servicesSphere.position.y-0.1,servicesSphere.position.z);    
    var raycaster = new THREE.Raycaster(castPos, new THREE.Vector3(0,-1,0), 0, 100);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0){
        servicesSphere.position.y = intersects[0].point.y + 0.3;
    }

    var castPos = new THREE.Vector3(industriesSphere.position.x,industriesSphere.position.y-0.1,industriesSphere.position.z);    
    var raycaster = new THREE.Raycaster(castPos, new THREE.Vector3(0,-1,0), 0, 100);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0){
        industriesSphere.position.y = intersects[0].point.y + 0.3;
    }

}

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.autoClear = false;
composer = new THREE.EffectComposer(renderer);
var sunRenderModel = new THREE.RenderPass(scene, camera);
var effectBloom = new THREE.BloomPass(1, 17.5, 10);
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

var aboutSphereGeo = new THREE.SphereGeometry(0.05, 9, 9);
var aboutSphereMat = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: false});
var aboutSphere = new THREE.Mesh(aboutSphereGeo, aboutSphereMat);
aboutSphere.position.set(aboutPos.x,aboutPos.y,aboutPos.z);
scene.add(aboutSphere);

var contactSphereGeo = new THREE.SphereGeometry(0.05, 9, 9);
var contactSphereMat = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: false});
var contactSphere = new THREE.Mesh(contactSphereGeo, contactSphereMat);
contactSphere.position.set(contactPos.x,contactPos.y,contactPos.z);
scene.add(contactSphere);

var servicesSphereGeo = new THREE.SphereGeometry(0.05, 9, 9);
var servicesSphereMat = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: false});
var servicesSphere = new THREE.Mesh(servicesSphereGeo, servicesSphereMat);
servicesSphere.position.set(servicesPos.x,servicesPos.y,servicesPos.z);
scene.add(servicesSphere);

var industriesSphereGeo = new THREE.SphereGeometry(0.05, 9, 9);
var industriesSphereMat = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: false});
var industriesSphere = new THREE.Mesh(industriesSphereGeo, industriesSphereMat);
industriesSphere.position.set(industriesPos.x,industriesPos.y,industriesPos.z);
scene.add(industriesSphere);

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
var meshTarget = aboutPos;
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

var plnGeo = new THREE.PlaneGeometry(0.15,0.15,2,2);
var loader = new THREE.TextureLoader();
var plnMat = new THREE.MeshBasicMaterial({map: loader.load('ICONABOUT.png'),});
plnMat.transparent = true;
var plnAbout = new THREE.Mesh(plnGeo, plnMat);
scene.add(plnAbout);
plnAbout.parent = camera;

plnAbout.position.x = -0.15;
plnAbout.position.y = 0.4;
plnAbout.position.z = -2;
plnAbout.rotation.x = 0;
plnAbout.rotation.y = 0;
plnAbout.rotation.z = 0;

plnGeo = new THREE.PlaneGeometry(0.15,0.15,2,2);
plnMat = new THREE.MeshBasicMaterial({map: loader.load('ICONINDUSTRIES.png'),});
plnMat.transparent = true;
var plnIndustries = new THREE.Mesh(plnGeo, plnMat);
scene.add(plnIndustries);
plnIndustries.parent = camera;

plnIndustries.position.x = 0.05;
plnIndustries.position.y = 0.4;
plnIndustries.position.z = -2;
plnIndustries.rotation.x = 0;
plnIndustries.rotation.y = 0;
plnIndustries.rotation.z = 0;

plnGeo = new THREE.PlaneGeometry(0.15,0.15,2,2);
plnMat = new THREE.MeshBasicMaterial({map: loader.load('ICONCONTACT.png'),});
plnMat.transparent = true;
var plnContact = new THREE.Mesh(plnGeo, plnMat);
scene.add(plnContact);
plnContact.parent = camera;

plnContact.position.x = 0.15;
plnContact.position.y = 0.2;
plnContact.position.z = -2;
plnContact.rotation.x = 0;
plnContact.rotation.y = 0;
plnContact.rotation.z = 0;

plnGeo = new THREE.PlaneGeometry(0.15,0.15,2,2);
plnMat = new THREE.MeshBasicMaterial({map: loader.load('ICONSERVICES.png'),});
plnMat.transparent = true;
var plnServices = new THREE.Mesh(plnGeo, plnMat);
scene.add(plnServices);
plnServices.parent = camera;

plnServices.position.x = -0.05;
plnServices.position.y = 0.2;
plnServices.position.z = -2;
plnServices.rotation.x = 0;
plnServices.rotation.y = 0;
plnServices.rotation.z = 0;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var ticker = 0;
var update = function(){

    SphereCasts();

    camera.position.x = camera.position.x+(((meshTarget.x+camOffset.x)-camera.position.x)*camFollowRate),
    camera.position.y = camera.position.y+(((meshTarget.y+camOffset.y)-camera.position.y)*camFollowRate),
    camera.position.z = camera.position.z+(((meshTarget.z+camOffset.z)-camera.position.z)*camFollowRate)

    camera.lookAt(new THREE.Vector3(
        meshCurr.x,
        meshCurr.y+1.75,
        meshCurr.z
    ));

    // camera.lookAt(new THREE.Vector3(10,2,10));

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