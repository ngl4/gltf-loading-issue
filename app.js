if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
  }
  //global vars
  var camera, scene, renderer, object, controls;

  //create a scene object
  var scene = new THREE.Scene();

  //create camera
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.25,
    20
  );

  camera.position.set(-1.8, 0.9, 2.7);

  scene.add(camera);

  //add orbit controls

  controls = new THREE.OrbitControls(camera);
  controls.target.set(0, -0.2, -0.2);
  controls.update();

  //add ambient light
  var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  //add point light
  var pointLight = new THREE.PointLight(0xffcc66, 0.6);
  camera.add(pointLight);

  //create environemntal map
  var envMap = new THREE.CubeTextureLoader()
      .setPath("assets/")
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
  loader.load("fish_hologram/scene.gltf", function(gltf) {
      console.log(gltf);
    //handle load file here
    gltf.scene.traverse(function(child) {
        console.log(child);
      if (child.isMesh) {
        // child.material.envMap = envMap;
      }
    });
    //adjust position and scale
    gltf.scene.scale.set(0.005, 0.005, 0.005);
    gltf.scene.position.y = -1;
    scene.add(gltf.scene);

    //create renderer

    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaOutput = true;
    document.body.appendChild(renderer.domElement);

    var animate = function() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  });