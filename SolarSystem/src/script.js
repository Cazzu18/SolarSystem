import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { degToRad } from 'three/src/math/MathUtils.js';
import {Pane} from "tweakpane";


//pane
const pane = new Pane();

//scene
const scene = new THREE.Scene();

//texture Loader
const textureLoader = new THREE.TextureLoader();

//textures
const sunTexture = textureLoader.load('/textures/2k_sun.jpg');
const earthTexture = textureLoader.load('/textures/2k_earth_daymap.jpg');
const marsTexture = textureLoader.load('/textures/2k_mars.jpg');
const mercuryTexture = textureLoader.load('/textures/2k_mercury.jpg');
const moonTexture = textureLoader.load('/textures/2k_moon.jpg');
const venusTexture = textureLoader.load('/textures/2k_venus_surface.jpg');


//background
const backgroundLoader = new THREE.CubeTextureLoader().setPath('textures/cubeMap/');
const cubeTexture = await backgroundLoader.loadAsync( [
	'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'
] );
scene.background = cubeTexture;


//sphere geometry
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);//radius, width segments, height segments

//materials
const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture
});
const sun = new THREE.Mesh(sphereGeometry, sunMaterial)
sun.scale.setScalar(5);
scene.add(sun)

const mercuryMaterial = new THREE.MeshStandardMaterial({
    map: mercuryTexture
});

const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture
});

const marsMaterial = new THREE.MeshStandardMaterial({
    map: marsTexture
});

const moonMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture
});

const venusMaterial = new THREE.MeshStandardMaterial({
    map: venusTexture
});

const planets = [
  {
    name: "Mercury",
    radius: 0.38,
    distance: 7.74,
    speed: 0.0207,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.95,
    distance: 14.46,
    speed: 0.00813,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.53,
    distance: 30.48,
    speed: 0.00266,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
];

const createPlanet = (planet) => {
    //create Mesh and add to scene
    const planetMesh = new THREE.Mesh(
        sphereGeometry,
        planet.material
    )

    planetMesh.scale.setScalar(planet.radius);
    planetMesh.position.x = planet.distance
    return planetMesh
}

const createMoon = (moon) => {
    //create Mesh and add to scene
    const moonMesh = new THREE.Mesh(
        sphereGeometry,
        moonMaterial
    );

    moonMesh.scale.setScalar(moon.radius);
    moonMesh.position.x = moon.distance;

    return moonMesh
}

const planetMeshes = planets.map((planet) => {
    const planetMesh = createPlanet(planet)
    //add it to our scene
    scene.add(planetMesh)

    //loop through each moon and create it
    planet.moons.forEach((moon) => {
        const moonMesh = createMoon(moon);
        planetMesh.add(moonMesh); //adding moon to planet
    });

    return planetMesh
});

//ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(ambientLight)

//point lights
const pointLight = new THREE.PointLight(0xffffff, 1500);
scene.add(pointLight)

//camera
const perspectiveCamera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth/window.innerHeight, //aspectratio
    0.1,
    400,
)

perspectiveCamera.position.z = 100;
perspectiveCamera.position.y = 5;

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

const renderLoop = () => {
    planetMeshes.forEach((planet, planetIndex) => {
        planet.rotation.y += planets[planetIndex].speed
        planet.position.x = Math.sin(planet.rotation.y) * planets[planetIndex].distance;
        planet.position.z = Math.cos(planet.rotation.y) * planets[planetIndex].distance;

        planet.children.forEach((moon, moonIndex) => {
            moon.rotation.y += planets[planetIndex].moons[moonIndex].speed;
            moon.position.x = Math.sin(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance;
            moon.position.z = Math.cos(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance;
        });
    })

    controls.update();//because enableDamping or autoRotate enabled
    renderer.render(scene, perspectiveCamera)
    window.requestAnimationFrame(renderLoop);//request renderLoop callback before the next repaint
}

renderLoop();


