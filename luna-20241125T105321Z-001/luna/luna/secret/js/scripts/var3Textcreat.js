import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.139.0/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'https://unpkg.com/three@0.139.0/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://unpkg.com/three@0.139.0/examples/jsm/geometries/TextGeometry.js';
export function var3Textcreat(){

THREE.Cache.enabled = true;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry(7,2,1);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 50;

const loader = new FontLoader();

loader.load( 'https://unpkg.com/three@0.139.0/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {

	const geometry2 = new TextGeometry( 'Hello three.js!', {
		font: font,
		size: 5,
		height: 0.5,
		curveSegments: 12,
		bevelEnabled: /*true*/ false,
		bevelThickness: 0,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );
	var material2 = new THREE.MeshBasicMaterial ({color: 0x00ff00});

	var text = new THREE.Mesh (geometry2, material2);

	scene.add (text);
} );

function animate() {
	requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02;
	renderer.render( scene, camera );
}
animate();
}