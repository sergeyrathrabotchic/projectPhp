import * as THREE from 'three';
import { GUI } from 'https://unpkg.com/three@0.139.0/examples/jsm/libs/lil-gui.module.min.js';

export function textur5(){
    THREE.Cache.enabled = true;


    function main() {

        const canvas = document.querySelector('#c');
        const renderer = new THREE.WebGLRenderer({canvas});
        //const gui = new GUI();

        const fov = 75;
        const aspect = 2;  // the canvas default
        const near = 0.1;
        const far = 1000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 10;
        camera.position.set(0, 0, 5);
        /*camera.up.set(0, 0, 1);
        camera.lookAt(0, 0, 0);*/

        //camera.position.z = 15;

        const scene = new THREE.Scene();


        //создание света      
        {
            const color = 0xFFFFFF;
            const intensity = 1;
            const light = new THREE.PointLight(color, intensity);
            light.position.set(-1, 2,7);
            scene.add(light);
            
        }

        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        //лоад для текстур
        const loader = new THREE.TextureLoader();
        //изменяем материал, чтобы на него влиял источник света 
        //const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
        const material = new THREE.MeshPhongMaterial({/*color: 0x44aa88*/
            map: loader.load('images/wall.jpg'),
        });
        //лоад для множества текстур на кубе
        const loadManager = new THREE.LoadingManager();
        //собираем материал из изображений
        const cubes = [];
        const materials2 = [
          new THREE.MeshPhongMaterial({map: loader.load('images/flower-1.jpg')}),
          new THREE.MeshPhongMaterial({map: loader.load('images/flower-2.jpg')}),
          new THREE.MeshPhongMaterial({map: loader.load('images/flower-3.jpg')}),
          new THREE.MeshPhongMaterial({map: loader.load('images/flower-4.jpg')}),
          new THREE.MeshPhongMaterial({map: loader.load('images/flower-5.jpg')}),
          new THREE.MeshPhongMaterial({map: loader.load('images/flower-6.jpg')}),
        ];

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 2, 0);
        scene.add(cube);
        const cube2 = new THREE.Mesh(geometry, materials2);
        scene.add(cube2);

        
        // С помощью этой функции проверяем изменилась ли значение конваза если да то меняем размер отрисовки 
        function resizeRendererToDisplaySize(renderer) {
            const canvas = renderer.domElement;
            //pixelRatio увеличиваем качество изображения
            const pixelRatio = window.devicePixelRatio;
            const width = canvas.clientWidth * pixelRatio | 0;
            const height = canvas.clientHeight * pixelRatio | 0;
            const needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
              renderer.setSize(width, height, false);
            }
            return needResize;
          }
          


        function render(time) {
            time *= 0.001; 
            cube.rotation.x = time;
            // cube.rotation.x = time;
            // cube.rotation.y = time;
            cube2.rotation.x = time;

            
            //вызыываем функцию изменения отрисови и заодно проверяем, если отрисовка изменилась то задаем новые значения для конваза чтобы кубики не растягивались 
            if (resizeRendererToDisplaySize(renderer)) {
            //Убираем растягивание
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            }

            /*cubes.forEach((cube, ndx) => {
                const speed = 1 + ndx * .1;
                //alert("ndx " + ndx + "speed " + speed)
                const rot = time * speed;
                cube.rotation.x = rot;
                cube.rotation.y = rot;
              });*/
           
            renderer.render(scene, camera);
           
            requestAnimationFrame(render);
          }
          requestAnimationFrame(render);
    }

    main();
}