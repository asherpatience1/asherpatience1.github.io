const canvas = document.querySelector('#c');
var infoImage = document.getElementById( 'infoImage' );
infoImage.src = "PANEL.png";

var btn1 = document.getElementById('btn1');
btn1.addEventListener('click', function(ev) {
    camOffset.x = (Math.random()*6)-3;
    meshTarget = aboutPos;
});
var btn2 = document.getElementById('btn2');
btn2.addEventListener('click', function(ev) {
    camOffset.x = (Math.random()*6)-3;
    meshTarget = contactPos;
});
var btn3 = document.getElementById('btn3');
btn3.addEventListener('click', function(ev) {
    camOffset.x = (Math.random()*6)-3;
    meshTarget = industriesPos;
});
var btn4 = document.getElementById('btn4');
btn4.addEventListener('click', function(ev) {
    camOffset.x = (Math.random()*6)-3;
    meshTarget = servicesPos;
});

var textBox = document.getElementById("textBox");
textBox.setAttribute('style', 'white-space: pre;');

const scene = new THREE.Scene();
// {
//   const color = 0x3876E8;
//   const near = 10;
//   const far = 50;
//   scene.fog = new THREE.Fog(color, near, far);
// }
var camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 10000);

var ptexture = new THREE.TextureLoader().load( "overlay.png" );
var pgeometry = new THREE.PlaneGeometry( 55, 55, 8 );
var pmaterial = new THREE.MeshBasicMaterial( {map: ptexture} );
pmaterial.transparent = true;
pmaterial.opacity = 1;
var plane = new THREE.Mesh( pgeometry, pmaterial );
scene.add( plane );
plane.lookAt(new THREE.Vector3(0, 100,0));
plane.position.y = 0.05;

window.addEventListener( 'mousedown', onMouseMove, false );
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var aboutPos = new THREE.Vector3(6,1,6);
var contactPos = new THREE.Vector3(14,1,14);
var servicesPos = new THREE.Vector3(14,1,6);
var industriesPos = new THREE.Vector3(6,1,14);

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children );

    for ( var i = 0; i < intersects.length; i++ ) {

        // raycast input

	}

}

function SphereCasts(){

    var castPos = new THREE.Vector3(aboutSphere.position.x,aboutSphere.position.y-0.1,aboutSphere.position.z);    
    var raycaster = new THREE.Raycaster(castPos, new THREE.Vector3(0,-1,0), 0, 100);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0){
        aboutSphere.position.y = intersects[0].point.y + 0.7;
    }

    var castPos = new THREE.Vector3(contactSphere.position.x,contactSphere.position.y-0.1,contactSphere.position.z);    
    var raycaster = new THREE.Raycaster(castPos, new THREE.Vector3(0,-1,0), 0, 100);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0){
        contactSphere.position.y = intersects[0].point.y + 0.7;
    }

    var castPos = new THREE.Vector3(servicesSphere.position.x,servicesSphere.position.y-0.1,servicesSphere.position.z);    
    var raycaster = new THREE.Raycaster(castPos, new THREE.Vector3(0,-1,0), 0, 100);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0){
        servicesSphere.position.y = intersects[0].point.y + 0.7;
    }

    var castPos = new THREE.Vector3(industriesSphere.position.x,industriesSphere.position.y-0.1,industriesSphere.position.z);    
    var raycaster = new THREE.Raycaster(castPos, new THREE.Vector3(0,-1,0), 0, 100);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0){
        industriesSphere.position.y = intersects[0].point.y + 0.7;
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
    color: 0x3b5998,
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
var smoothRate = 0.1;
var meshSmoothRate = 0.015;
var scaler = 0.5;
var meshTarget = aboutPos;
var meshCurr = new THREE.Vector3(10,0,10);
var camOffset = new THREE.Vector3(0,3,5);
var camFollowRate = 0.01;
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

var nearImage = false;

function CompSphereDistances(){

    var sphere1Dist = meshCurr.distanceTo(aboutPos);
    var sphere2Dist = meshCurr.distanceTo(contactPos);
    var sphere3Dist = meshCurr.distanceTo(servicesPos);
    var sphere4Dist = meshCurr.distanceTo(industriesPos);

    var farAway = true;

    if (sphere1Dist < 2){

        farAway = false;

        if (!nearImage){

            currContent = "";
            nextContent = content1;
            textBox.textContent = "";

        }

        nearImage = true;

        var opac = (1.9-sphere1Dist);
        // opac *= 0.25;
        // infoImage.src = "TEXTABOUT.png";
        infoImage.style.opacity = opac.toString();
        textBox.style.opacity = opac.toString();

    }
    if (sphere2Dist < 2){

        farAway = false;

        if (!nearImage){

            currContent = "";
            nextContent = content2;
            textBox.textContent = "";

        }

        nearImage = true;

        var opac = (1.9-sphere2Dist);
        // opac *= 0.25;
        // infoImage.src = "TEXTCONTACT.png";
        infoImage.style.opacity = opac.toString();
        textBox.style.opacity = opac.toString();

    }
    if (sphere3Dist < 2){

        farAway = false;

        if (!nearImage){

            currContent = "";
            nextContent = content3;
            textBox.textContent = "";

        }

        nearImage = true;

        var opac = (1.9-sphere3Dist);
        // opac *= 0.25;
        // infoImage.src = "TEXTSERVICES.png";
        infoImage.style.opacity = opac.toString();
        textBox.style.opacity = opac.toString();

    }
    if (sphere4Dist < 2){

        farAway = false;

        if (!nearImage){

            currContent = "";
            nextContent = content4;
            textBox.textContent = "";

        }

        nearImage = true;

        var opac = (1.9-sphere4Dist);
        // opac *= 0.25;
        // infoImage.src = "TEXTINDUSTRIES.png";
        infoImage.style.opacity = opac.toString();
        textBox.style.opacity = opac.toString();

    }

    if (farAway){

        nearImage = false;

        infoImage.style.opacity = "0";
        textBox.style.opacity = "0";

    }

}

var ticker = 0;
var loopTimer = 25;
var nextContent = "";
var currContent = "";
var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()[];',./<>?:{}";

var content1 = "ABOUT\r\n\r\nNAME        > ASHER PATIENCE\r\nAGE         > 35\r\nNATIONALITY > AUSTRALIAN\r\nLOCATION    > OCEANIA + ASIA\r\nOCCUPATION  > SOFTWARE DEVELOPER\r\n\r\nINTERESTS\r\n    > PROGRAMMING\r\n    > FUTURE TECH\r\n    > GAME DEVELOPMENT\r\n    > SPATIAL DATA\r\n    > MARTIAL ARTS"; 
var content2 = "SKILLS\r\n\r\n* SPATIAL DATA\r\n    > POINT CLOUDS\r\n    > LASER SCANNING\r\n    > PHOTOGRAMMETRY\r\n    > PROCEDURAL GEOMETRY\r\n* PROGRAMMING\r\n    > C#\r\n    > JS\r\n* FRAMEWORKS & ENGINES\r\n    > UNITY3D\r\n    > .NET\r\n    > MONO\r\n    > NODEJS\r\n    > WEBGL\r\n    > THREEJS"; 
var content3 = "// THIS WILL EVENTUALLY BE FOR DEMOS\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nWORKING ON IT..."; 
var content4 = "CONTACT\r\n\r\nEMAIL   >>  ASHERPATIENCE1@GMAIL.COM\r\nCOMPANY >>  WWW.DIOVEC.COM"; 

setTimeout("ContentLoop()", loopTimer); 

function ContentLoop(){

    textBox.style.fontSize = "24";

    if (nextContent.length > 0){

        currContent = currContent +  nextContent.charAt(0);

        nextContent = nextContent.substring(1);

        textBox.textContent = currContent + characters.charAt(Math.floor(Math.random()*characters.length))+
        characters.charAt(Math.floor(Math.random()*characters.length))+
        characters.charAt(Math.floor(Math.random()*characters.length));

        if (nextContent.length < 1){

            textBox.textContent = textBox.textContent.substring(0,textBox.textContent.length-3);

        }

    }

    setTimeout("ContentLoop()", loopTimer); 

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var update = function(){

    plane.position.x = meshCurr.x;
    plane.position.z = meshCurr.z;

    CompSphereDistances();

    SphereCasts();

    camera.position.x = camera.position.x+(((meshCurr.x+camOffset.x)-camera.position.x)*camFollowRate);
    camera.position.y = camera.position.y+(((meshCurr.y+camOffset.y)-camera.position.y)*camFollowRate);
    camera.position.z = camera.position.z+(((meshCurr.z+camOffset.z)-camera.position.z)*camFollowRate);

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