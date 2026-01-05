import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { degToRad } from 'three/src/math/MathUtils.js';
import {Pane} from "tweakpane";


//pane
const pane = new Pane()

//scene
const scene = new THREE.Scene();

//camera
const perspectiveCamera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth/window.innerHeight, //aspectratio
    0.1,
    400,
)

//renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer(
    {
        canvas: canvas,
        antialias: true,
    }
)

renderer.setSize(window.innerWidth, window.innerHeight)

const maxPixelRatio =  Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);

const controls = new OrbitControls(perspectiveCamera, canvas);
controls.enableDamping = true;

//handle window resize
window.addEventListener('resize', () => {
    perspectiveCamera.aspect = window.innerWidth/window.innerHeight;
    perspectiveCamera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
});

//clock

const clock = new THREE.Clock()

let previousTime = 0;

const renderLoop = () => {
    const currentTime = (clock.getElapsedTime());
    const delta = currentTime - previousTime;

    previousTime = currentTime

    controls.update();//because enableDamping or autoRotate enabled
    renderer.render(scene, perspectiveCamera)
    window.requestAnimationFrame(renderLoop);//request renderLoop callback before the next repaint
}

renderLoop();


