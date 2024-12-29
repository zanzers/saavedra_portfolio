import * as THREE from 'three';
import Rocks from './rocks';
import Stats from 'three/examples/jsm/libs/stats.module.js';

class SceneManager {
  constructor(container, gui) {
 
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 1.8, 5);

    if(gui){
        this.setupGui(gui);
    }

    this.stats = new Stats();
    container.appendChild(this.stats.dom);

    this.addHelpers();
    this.addLights();

    new Rocks(this.scene);

    window.addEventListener('resize', () => this.onWindowResize());
  }



  addHelpers() {
    const axesHelper = new THREE.AxesHelper(3);
    this.scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(30);
    this.scene.add(gridHelper);
  }
  setupGui(gui){
    const cameraFolder = gui.addFolder('Camera Position');
    cameraFolder.add(this.camera.position, 'x', -50, 50, 0.1).name('X Axis')
    cameraFolder.add(this.camera.position, 'y', -50, 50, 0.1).name('Y Axis')
    cameraFolder.add(this.camera.position, 'z', -50, 50, 0.1).name('Z Axis')
    cameraFolder.open();
}

  addLights() {
    const directionLight = new THREE.DirectionalLight(0xffffff, 1);
    directionLight.position.set(0, 5, 0);
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8); 
    this.scene.add(ambientLight);
    this.scene.add(directionLight);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {

    this.stats.update();
    this.renderer.render(this.scene, this.camera);
    this.renderer.setAnimationLoop(() => this.animate());
  }
}

export default SceneManager;
