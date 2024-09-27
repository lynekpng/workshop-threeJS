import * as THREE from "three";
import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// Canvas
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();
// Sizes

const sizes = {
  width: 800,
  height: 600,
};

const fontLoader = new FontLoader();
const font = fontLoader.parse(typefaceFont);

// geometry

const textGeometry = new TextGeometry("Hello, my name is Lyne :)", {
  font: font,
  size: 0.5,
  depth: 0.2,
  curveSegments: 12,
  bevelEnabled: true,
  bevelThickness: 0.03,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 5,
});
textGeometry.center();

// texture
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('./8.png')
matcapTexture.encoding = THREE.sRGBEncoding;

const Material = new THREE.MeshMatcapMaterial({
  matcap: matcapTexture
})
const text = new THREE.Mesh(textGeometry, Material);
scene.add(text);


// torus background
const donutGeometry = new THREE.TorusGeometry(0.3,0.2,32,100)

	

for( let i = 0; i<80; i++){
	const donut = new THREE.Mesh(donutGeometry, Material)
	scene.add(donut)


donut.position.x = (Math.random() - 0.5) * 10
donut.position.y = (Math.random() - 0.5) * 10
donut.position.z = (Math.random() - 0.5) * 10
donut.rotation.x = Math.random() * Math.PI
donut.rotation.y = Math.random() * Math.PI

const scale = Math.random()
donut.scale.set(scale, scale, scale) 

}








// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 7;

scene.add(camera);

//renderer

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();

