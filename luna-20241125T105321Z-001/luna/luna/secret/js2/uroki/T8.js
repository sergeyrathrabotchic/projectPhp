export function T8(){
    function T8main() {
    const material4 = new THREE.MeshPhongMaterial({
        color: /*'#2ab305'*/'#d3caca',
        opacity: 0.5,
        transparent: true,
    });

    const material5 = new THREE.MeshPhongMaterial({
      color: '#1d719a',
      opacity: 0.7,
      transparent: true,
    });

    
     
    const cube4 = new THREE.Mesh(geometry4, material4);
    scene.add(cube4);
    cube4.position.set(14, 2, 0);

    const cube5 = new THREE.Mesh(geometry5, material4);
    scene.add(cube5); 
    cube5.position.set(12.35, 4.85, 0);

    const cube6 = new THREE.Mesh(geometry5, material4);
    cube6.position.set(15.65, 4.85, 0);
    scene.add(cube6);

    const cube7 = new THREE.Mesh(geometry6, material4);
    cube7.position.set(14, 4.85, -1.65);
    scene.add(cube7);

    const cube8 = new THREE.Mesh(geometry6, material4);
    cube8.position.set(14, 4.85, 1.65);
    scene.add(cube8);

    const cube9 = new THREE.Mesh(geometry7, material5);
    cube9.position.set(14, 2.35/*4.15*/, 0);
    scene.add(cube9);
    }
    T8main();
}