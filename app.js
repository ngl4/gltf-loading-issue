//global vars
var camera, scene, renderer, object, controls;

//create a scene object
scene = new THREE.Scene();

//create camera 
camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 2000);

camera.position.z = 15;

scene.add(camera);

//create renderer

renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.gammaOutput = true;
document.body.appendChild(renderer.domElement);

//add orbit controls

controls = new THREE.OrbitControls(camera);
controls.target.set( 0, 0, 0 );
controls.update();

//add ambient light
var ambientLight = new THREE.AmbientLight(0xffffff, .2);
scene.add( ambientLight );

//add point light 
var pointLight = new THREE.PointLight( 0xffcc66, 0.6 );
camera.add( pointLight );

//create environemntal map 
var envMap = new THREE.CubeTextureLoader().setPath('assets/')
.load([
    "posx.jpg",
    "negx.jpg",
    "posy.jpg",
    "negy.jpg",
    "posz.jpg",
    "negz.jpg"
]);
//set as skybox
scene.background = envMap;

//load glTF model/scene 
var loader = new THREE.GLTFLoader();
loader.load('fish_hologram/scene.gltf', function(gltf){
    //handle load file here
    gltf.scene.traverse(function(child){
        if (child.isMesh){
            child.material.envMap = envMap;
        }
    });
    //adjust position and scale
    gltf.scene.scale.set( .005, .005, .005 );
    gltf.scene.position.y = -1;
    scene.add( gltf.scene );
})