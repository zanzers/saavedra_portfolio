import * as THREE from 'three';
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
    this.camera.position.set(0, 2, 5);

    if(gui){
        this.setupGui(gui);
    }

    this.stats = new Stats();
    container.appendChild(this.stats.dom);

    this.addHelpers();
    this.addObjects();
    this.addLights();

    window.addEventListener('resize', () => this.onWindowResize());
  }



  addHelpers() {
    const axesHelper = new THREE.AxesHelper(3);
    this.scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(30);
    this.scene.add(gridHelper);
  }

  addObjects() {
    const boxGeo = new THREE.BoxGeometry();
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 'pink' });
    const box = new THREE.Mesh(boxGeo, boxMaterial);
    box.position.set(1, 1, 1);
    this.scene.add(box);

    const planeGeo = new THREE.PlaneGeometry(30, 30);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff });
    const plane = new THREE.Mesh(planeGeo, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    this.scene.add(plane);
  }

  setupGui(gui){
    const cameraFolder = gui.addFolder('Camera Position');
    cameraFolder.add(this.camera.position, 'x', -50, 50, 0.1).name('X Axis')
    cameraFolder.add(this.camera.position, 'y', -50, 50, 0.1).name('Y Axis')
    cameraFolder.add(this.camera.position, 'z', -50, 50, 0.1).name('Z Axis')
    cameraFolder.open();
}

  addLights() {
    const directionLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionLight.position.set(30, 50, 0);
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
