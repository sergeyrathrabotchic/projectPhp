const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();
//материал
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
//геоимертия объекта
const points = [];
points.push( new THREE.Vector3( - 20, 0, 10 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
points.push( new THREE.Vector3( 10, 10, 0 ) );
points.push( new THREE.Vector3( 10, 30, 0 ) );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
//соединяекм геометрию и материал
const line = new THREE.Line( geometry, material );

//добавление в сцену линии и отрисовка в рендаре
scene.add( line );

// const loader = new FontLoader();

// loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

// 	const geometry = new TextGeometry( 'Hello three.js!', {
// 		font: font,
// 		size: 80,
// 		height: 5,
// 		curveSegments: 12,
// 		bevelEnabled: true,
// 		bevelThickness: 10,
// 		bevelSize: 8,
// 		bevelOffset: 0,
// 		bevelSegments: 5
// 	} );
// } );
renderer.render( scene, camera );
function animate() {
	requestAnimationFrame( animate );
    line.rotation.x += 0.01;
    line.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();

