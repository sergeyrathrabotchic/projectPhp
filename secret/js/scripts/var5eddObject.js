import * as THREE from 'three';
export function var5eddObject(){
THREE.Cache.enabled = true;
const MAX_POINTS = 500;

// geometry
THREE.Cache.enabled = true;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const geometry6 = new THREE.BoxGeometry(7,2,1);
const geometry = new THREE.BufferGeometry();


// attributes
const positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

// draw range
const drawCount = 2; // draw the first 2 points, only
geometry.setDrawRange( 0, drawCount );

// material
const material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );

// line
const line = new THREE.Line( geometry, material );
scene.add( line );
renderer.render( scene, camera );
}
// const positions2 = line.geometry.attributes.position.array;

// let x, y, z, index;
// x = y = z = index = 0;

// for ( let i = 0, l = MAX_POINTS; i < l; i ++ ) {

//     positions2[ index ++ ] = x;
//     positions2[ index ++ ] = y;
//     positions2[ index ++ ] = z;

//     x += ( Math.random() - 0.5 ) * 30;
//     y += ( Math.random() - 0.5 ) * 30;
//     z += ( Math.random() - 0.5 ) * 30;

// }