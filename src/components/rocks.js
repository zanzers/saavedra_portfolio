import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


class Rocks{
    constructor(scene){

        this.loader = new GLTFLoader();

        this.loader.load(
            '../assets/models/Rocks.glb',
            (gltf) => {
                const model = gltf.scene;

                model.position.set(0,0,3);
                model.scale.set(1,1,1);

                scene.add(gltf.scene);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            },
            (error) => {
                console.error("error occured", error);
            }
        )
    }
}


export default Rocks;