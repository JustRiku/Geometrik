import * as THREE from './three.module.js';

//Añadir el render

let renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('level2'), antialias: true, alpha: true });
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
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

//Función para el reescalado del objeto 3D segun el tamaño de la ventana

window.addEventListener('resize', function () {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})

//Creación de los objetos 3D

let geometry = new THREE.SphereGeometry(0.5, 32, 60);
let geometry2 = new THREE.CylinderGeometry(0.5, 0.5, 1, 60);
let geometry3 = new THREE.ConeGeometry(0.5, 1, 60);
let material = new THREE.MeshLambertMaterial({ color: 0x04a1a1 });
let cubeA = new THREE.Mesh(geometry, material);
cubeA.position.set(-2, 0, 0);

let cubeB = new THREE.Mesh(geometry2, material);
cubeB.position.set(0, 0, 0);

let cubeC = new THREE.Mesh(geometry3, material);
cubeB.position.set(2, 0, 0);

let group = new THREE.Group();
group.add(cubeA);
group.add(cubeB);
group.add(cubeC);

scene.add(group);

camera.position.z = 5;

//Luces para el objeto 3D

let light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
let light2 = new THREE.PointLight(0xffffff, 1, 100);
light2.position.set(10, 10, 10);
scene.add(light2);

//Animación de rotación simple para el objeto 3D

let animate = () => {
    requestAnimationFrame(animate);

    cubeA.rotation.x += 0.01;
    cubeA.rotation.y += 0.01;

    // cubeB.rotation.x -= 0.01;
    cubeB.rotation.z -= 0.01;
    cubeB.rotation.y -= 0.01;

    // cubeC.rotation.x += 0.01;
    cubeC.rotation.y -= 0.01;
    cubeC.rotation.z += 0.01;
    // controls.update();

    renderer.render(scene, camera);
}

animate()

let score = 0;

/* const geometry = new THREE.ConeGeometry( 0.5, 2, 60 );
const geometry = new THREE.ConeGeometry( 0.5, 2, 3 );
const geometry = new THREE.ConeGeometry( 0.5, 2, 4 );
const geometry = new THREE.ConeGeometry( 0.5, 2, 5 );
const geometry = new THREE.CylinderGeometry( 0.5, 0.5, 2, 60 );
const geometry = new THREE.CylinderGeometry( 0.5, 0.5, 2, 3 );
const geometry = new THREE.CylinderGeometry( 0.5, 0.5, 2, 4 );
const geometry = new THREE.CylinderGeometry( 0.5, 0.5, 2, 5 );
geometry = new THREE.DodecahedronGeometry(0.5);
geometry = new THREE.TetrahedronGeometry(1);
geometry = new THREE.IcosahedronGeometry(0.5);
geometry = new THREE.OctahedronGeometry(0.5);
const geometry = new THREE.SphereGeometry( 0.5, 32, 60 );
const geometry = new THREE.TorusGeometry( 0.5, 0.2, 30, 100 );
const geometry = new THREE.TorusGeometry( 0.5, 0.2, 30, 3 );
const geometry = new THREE.TorusGeometry( 0.5, 0.2, 30, 4 );
const geometry = new THREE.TorusKnotGeometry( 0.5, 0.2, 180, 20 );*/
let points = document.querySelector('#points');
let total = 0;
let datos;
let i = 0;
let name;
fetch('../../assets/data/level2.json')
    .then(res => res.json())
    .then(data => {
        datos = data;
        let opt = document.querySelector('.options');
        let elem = `<div id=${i} class="opt">${data[i].opt1}</div>
        <div id=${i + 1} class="opt">${data[i].opt2}</div>
        <div id=${i + 2} class="opt">${data[i].opt3}</div>
        <div id=${i + 3} class="opt">${data[i].opt4}</div>`;
        opt.innerHTML += elem;
        name = `${data[i].name}`;
    })
    .then(() => {
        let elems = document.querySelectorAll('.opt');
        elems.forEach((elem) => {
            elem.addEventListener('click', checkOpt, true);
        });
    });

let checkOpt = (e) => {
    let opt = document.querySelector('.options');
    let optSel = e.currentTarget.innerText;
    if (optSel == name) {
        total += 500;
        scene.remove(group);
        opt.innerHTML = '';
        e.currentTarget.classList.add('correct');
        i++;
        fetch('../../assets/data/level2.json')
            .then(res => res.json())
            .then(data => {
                datos = data;
                let opt = document.querySelector('.options');
                let elem = `<div id=${i} class="opt">${data[i].opt1}</div>
            <div id=${i + 1} class="opt">${data[i].opt2}</div>
            <div id=${i + 2} class="opt">${data[i].opt3}</div>
            <div id=${i + 3} class="opt">${data[i].opt4}</div>`;
                opt.innerHTML += elem;
                name = `${data[i].name}`;
                switch (i) {
                    case 1:
                        geometry = new THREE.DodecahedronGeometry(0.5);
                        geometry2 = new THREE.TetrahedronGeometry(1);
                        geometry3 = new THREE.BoxGeometry(1,1,1);
                        cubeA = new THREE.Mesh(geometry, material);
                        cubeA.position.set(-2, 0, 0);
                        cubeB = new THREE.Mesh(geometry2, material);
                        cubeB.position.set(0, 0, 0);
                        cubeC = new THREE.Mesh(geometry3, material);
                        cubeB.position.set(2, 0, 0);
                        group = new THREE.Group();
                        group.add(cubeA);
                        group.add(cubeB);
                        group.add(cubeC);
                        scene.add(group);
                        break;
                    case 2:
                        geometry = new THREE.DodecahedronGeometry(0.5);
                        geometry2 = new THREE.TetrahedronGeometry(1);
                        geometry3 = new THREE.CylinderGeometry( 0.5, 0.5, 2, 4 );
                        cubeA = new THREE.Mesh(geometry, material);
                        cubeA.position.set(-2, 0, 0);
                        cubeB = new THREE.Mesh(geometry2, material);
                        cubeB.position.set(0, 0, 0);
                        cubeC = new THREE.Mesh(geometry3, material);
                        cubeB.position.set(2, 0, 0);
                        group = new THREE.Group();
                        group.add(cubeA);
                        group.add(cubeB);
                        group.add(cubeC);
                        scene.add(group);
                        break;
                    case 3:
                        geometry = new THREE.OctahedronGeometry(0.5);
                        geometry2 = new THREE.BoxGeometry(1,1,1);
                        geometry3 = new THREE.TorusGeometry( 0.5, 0.2, 30, 100 );
                        cubeA = new THREE.Mesh(geometry, material);
                        cubeA.position.set(-2, 0, 0);
                        cubeB = new THREE.Mesh(geometry2, material);
                        cubeB.position.set(0, 0, 0);
                        cubeC = new THREE.Mesh(geometry3, material);
                        cubeB.position.set(2, 0, 0);
                        group = new THREE.Group();
                        group.add(cubeA);
                        group.add(cubeB);
                        group.add(cubeC);
                        scene.add(group);
                        break;
                    case 4:
                        geometry = new THREE.IcosahedronGeometry(0.5);
                        geometry2 = new THREE.TorusKnotGeometry( 0.5, 0.2, 180, 20 );
                        geometry3 = new THREE.SphereGeometry( 0.5, 32, 60 );
                        cubeA = new THREE.Mesh(geometry, material);
                        cubeA.position.set(-2, 0, 0);
                        cubeB = new THREE.Mesh(geometry2, material);
                        cubeB.position.set(0, 0, 0);
                        cubeC = new THREE.Mesh(geometry3, material);
                        cubeB.position.set(2, 0, 0);
                        group = new THREE.Group();
                        group.add(cubeA);
                        group.add(cubeB);
                        group.add(cubeC);
                        scene.add(group);
                        break;
                    case 5:
                        geometry = new THREE.OctahedronGeometry(0.5);
                        geometry2 = new THREE.BoxGeometry(1,1,1);
                        geometry3 = new THREE.IcosahedronGeometry(0.5);
                        cubeA = new THREE.Mesh(geometry, material);
                        cubeA.position.set(-2, 0, 0);
                        cubeB = new THREE.Mesh(geometry2, material);
                        cubeB.position.set(0, 0, 0);
                        cubeC = new THREE.Mesh(geometry3, material);
                        cubeB.position.set(2, 0, 0);
                        group = new THREE.Group();
                        group.add(cubeA);
                        group.add(cubeB);
                        group.add(cubeC);
                        scene.add(group);
                        break;
                    case 6:
                        geometry = new THREE.DodecahedronGeometry(0.5);
                        geometry2 = new THREE.OctahedronGeometry(0.5);
                        geometry3 = new THREE.TetrahedronGeometry(1);
                        cubeA = new THREE.Mesh(geometry, material);
                        cubeA.position.set(-2, 0, 0);
                        cubeB = new THREE.Mesh(geometry2, material);
                        cubeB.position.set(0, 0, 0);
                        cubeC = new THREE.Mesh(geometry3, material);
                        cubeB.position.set(2, 0, 0);
                        group = new THREE.Group();
                        group.add(cubeA);
                        group.add(cubeB);
                        group.add(cubeC);
                        scene.add(group);
                        break;
                    case 7:
                        geometry = new THREE.BoxGeometry(1,1,1);
                        geometry2 = new THREE.DodecahedronGeometry(0.5);
                        geometry3 = new THREE.SphereGeometry( 0.5, 32, 60 );
                        cubeA = new THREE.Mesh(geometry, material);
                        cubeA.position.set(-2, 0, 0);
                        cubeB = new THREE.Mesh(geometry2, material);
                        cubeB.position.set(0, 0, 0);
                        cubeC = new THREE.Mesh(geometry3, material);
                        cubeB.position.set(2, 0, 0);
                        group = new THREE.Group();
                        group.add(cubeA);
                        group.add(cubeB);
                        group.add(cubeC);
                        scene.add(group);
                        break;
                    case 8:
                        geometry = new THREE.SphereGeometry( 0.5, 32, 60 );
                        geometry2 = new THREE.OctahedronGeometry(0.5);
                        geometry3 = new THREE.CylinderGeometry( 0.5, 0.5, 2, 4 );
                        cubeA = new THREE.Mesh(geometry, material);
                        cubeA.position.set(-2, 0, 0);
                        cubeB = new THREE.Mesh(geometry2, material);
                        cubeB.position.set(0, 0, 0);
                        cubeC = new THREE.Mesh(geometry3, material);
                        cubeB.position.set(2, 0, 0);
                        group = new THREE.Group();
                        group.add(cubeA);
                        group.add(cubeB);
                        group.add(cubeC);
                        scene.add(group);
                        break;
                    case 9:
                        geometry = new THREE.IcosahedronGeometry(0.5);
                        geometry2 = new THREE.ConeGeometry( 0.5, 2, 5 );
                        geometry3 = new THREE.DodecahedronGeometry(0.5);
                        cubeA = new THREE.Mesh(geometry, material);
                        cubeA.position.set(-2, 0, 0);
                        cubeB = new THREE.Mesh(geometry2, material);
                        cubeB.position.set(0, 0, 0);
                        cubeC = new THREE.Mesh(geometry3, material);
                        cubeB.position.set(2, 0, 0);
                        group = new THREE.Group();
                        group.add(cubeA);
                        group.add(cubeB);
                        group.add(cubeC);
                        scene.add(group);
                        break;
                    case 10:
                        geometry = new THREE.ConeGeometry( 0.5, 2, 3 );
                        geometry2 = new THREE.BoxGeometry(1,1,1);
                        geometry3 = new THREE.ConeGeometry( 0.5, 2, 60 );
                        cubeA = new THREE.Mesh(geometry, material);
                        cubeA.position.set(-2, 0, 0);
                        cubeB = new THREE.Mesh(geometry2, material);
                        cubeB.position.set(0, 0, 0);
                        cubeC = new THREE.Mesh(geometry3, material);
                        cubeB.position.set(2, 0, 0);
                        group = new THREE.Group();
                        group.add(cubeA);
                        group.add(cubeB);
                        group.add(cubeC);
                        scene.add(group);
                        break;
                    case 11:
                        geometry = new THREE.DodecahedronGeometry(0.5);
                        geometry2 = new THREE.TetrahedronGeometry(1);
                        geometry3 = new THREE.SphereGeometry( 0.5, 32, 60 );
                        cubeA = new THREE.Mesh(geometry, material);
                        cubeA.position.set(-2, 0, 0);
                        cubeB = new THREE.Mesh(geometry2, material);
                        cubeB.position.set(0, 0, 0);
                        cubeC = new THREE.Mesh(geometry3, material);
                        cubeB.position.set(2, 0, 0);
                        group = new THREE.Group();
                        group.add(cubeA);
                        group.add(cubeB);
                        group.add(cubeC);
                        scene.add(group);
                        break;
                    case 12:
                        geometry = new THREE.BoxGeometry(1,1,1);
                        geometry2 = new THREE.DodecahedronGeometry(0.5);
                        geometry3 = new THREE.TorusGeometry( 0.5, 0.2, 30, 3 );
                        cubeA = new THREE.Mesh(geometry, material);
                        cubeA.position.set(-2, 0, 0);
                        cubeB = new THREE.Mesh(geometry2, material);
                        cubeB.position.set(0, 0, 0);
                        cubeC = new THREE.Mesh(geometry3, material);
                        cubeB.position.set(2, 0, 0);
                        group = new THREE.Group();
                        group.add(cubeA);
                        group.add(cubeB);
                        group.add(cubeC);
                        scene.add(group);
                        break;
                    case 13:
                        geometry = new THREE.OctahedronGeometry(0.5);
                        geometry2 = new THREE.TorusGeometry( 0.5, 0.2, 30, 4 );
                        geometry3 = new THREE.CylinderGeometry( 0.5, 0.5, 2, 5 );
                        cubeA = new THREE.Mesh(geometry, material);
                        cubeA.position.set(-2, 0, 0);
                        cubeB = new THREE.Mesh(geometry2, material);
                        cubeB.position.set(0, 0, 0);
                        cubeC = new THREE.Mesh(geometry3, material);
                        cubeB.position.set(2, 0, 0);
                        group = new THREE.Group();
                        group.add(cubeA);
                        group.add(cubeB);
                        group.add(cubeC);
                        scene.add(group);
                        break;
                    case 14:
                        geometry = new THREE.DodecahedronGeometry(0.5);
                        geometry2 = new THREE.TorusKnotGeometry( 0.5, 0.2, 180, 20 );
                        geometry3 = new THREE.SphereGeometry( 0.5, 32, 60 );
                        cubeA = new THREE.Mesh(geometry, material);
                        cubeA.position.set(-2, 0, 0);
                        cubeB = new THREE.Mesh(geometry2, material);
                        cubeB.position.set(0, 0, 0);
                        cubeC = new THREE.Mesh(geometry3, material);
                        cubeB.position.set(2, 0, 0);
                        group = new THREE.Group();
                        group.add(cubeA);
                        group.add(cubeB);
                        group.add(cubeC);
                        scene.add(group);
                        break;

                }
            })
            .then(() => {
                let elems = document.querySelectorAll('.opt');
                elems.forEach((elem) => {
                    elem.addEventListener('click', checkOpt, true);
                });
            });
    } else {
        e.currentTarget.classList.add('wrong');
        total -= 250;
    }
    points.innerText = total;
    if (i == 15) {
        scene.remove(group);
        let l2Tit = document.getElementById('levels-title');
        l2Tit.innerText = '';
        let l2clear = document.querySelector('.level-clear');
        l2clear.innerHTML = `!!!Enhorabuena!!! <br> has completado el nivel 2, tu puntuación final ha sido de: ${points.innerText}, si quieres volver a intentarlo, recarga la página o pulsa en este cuadro`;
        l2clear.style.display = 'block';
    }
}