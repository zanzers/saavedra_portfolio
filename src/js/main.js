import * as dat from 'dat.gui';
import SceneManager from '../components/Scene';



const Main = (() => {
    const gui = new dat.GUI();

    const container = document.body;
    const sceneManager = new SceneManager(container,gui);

    sceneManager.animate();
})();
