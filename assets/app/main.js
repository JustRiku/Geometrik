import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

//Añadir el render

let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias: true, alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x000000, 0);

//Crear una escena para el objeto 3D y hacerlo transparente

let scene = new THREE.Scene();
scene.background = null;

//Crear una cámara para el obejto 3D

let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

//Función para el reescalado del objeto 3D segun el tamaño de la ventana

window.addEventListener('resize', function(){
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})

//Controles para el movimiento del objeto 3D

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.enableDamping = true;
controls.update();

//Creación del objeto 3D

let geometry = new THREE.BoxGeometry(3,3,3);
let material = new THREE.MeshLambertMaterial( { color: 0x04a1a1 } );
let cube = new THREE.Mesh(geometry, material);

scene.add(cube);

camera.position.z = 5;

//Luces para el objeto 3D

let light = new THREE.AmbientLight( 0x404040); // soft white light
scene.add( light );
let light2 = new THREE.PointLight( 0xffffff, 1, 100);
light2.position.set(10,10,10);
scene.add( light2 );

//Animación de rotación simple para el objeto 3D

let animate = () => {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate()

let mainOpt = document.querySelector('.options-in');

let displayOpt = () => {
    mainOpt.style.opacity = 1;
}

setInterval(displayOpt, 5000);