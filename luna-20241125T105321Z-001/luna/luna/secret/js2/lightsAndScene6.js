import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.139.0/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'https://unpkg.com/three@0.139.0/examples/jsm/libs/lil-gui.module.min.js';


export function lightsAndScene6(){
    THREE.Cache.enabled = true;


    function main() {

        const canvas = document.querySelector('#c');
        const renderer = new THREE.WebGLRenderer({canvas});
        const gui = new GUI();

        const fov = 45;
        const aspect = 2;  // the canvas default
        const near = 0.1;
        const far = 200;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 10;
        camera.position.set(0, 10, 20);
        /*camera.up.set(0, 0, 1);
        camera.lookAt(0, 0, 0);*/

        //camera.position.z = 15;

        const scene = new THREE.Scene();
        //Создаем контроллер для камеры
        const controls = new OrbitControls(camera, canvas);
        controls.target.set(0, 5, 0);
        controls.update();


        //создание света      
        // {
        //     const color = 0xFFFFFF;
        //     const intensity = 1;
        //     const light = new THREE.PointLight(color, intensity);
        //     light.position.set(-1, 2,7);
        //     scene.add(light);
            
        // }

        const planeSize = 60;
        
        const loader = new THREE.TextureLoader();
        const texture = loader.load('images/checker.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);
        //Добавлеяема плоскость сцену
        const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * -.5;
        scene.add(mesh);
        //создаем куб
        {
          const cubeSize = 4;
          const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
          const cubeMat = new THREE.MeshPhongMaterial({color: '#8AC'});
          const mesh = new THREE.Mesh(cubeGeo, cubeMat);
          mesh.position.set(-8, cubeSize / 2, 0);
          scene.add(mesh);
        }
        //создаем сферу
        {
          const sphereRadius = 3;
          const sphereWidthDivisions = 32;
          const sphereHeightDivisions = 16;
          const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
          const sphereMat = new THREE.MeshPhongMaterial({color: '#CA8'});
          const mesh = new THREE.Mesh(sphereGeo, sphereMat);
          mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
          scene.add(mesh);
        }
        //
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.AmbientLight(color, intensity);
        scene.add(light);
        //Добавляем помощьник  GUI() для регулирования света
        class ColorGUIHelper {
          constructor(object, prop) {
            this.object = object;
            this.prop = prop;
          }
          get value() {
            return `#${this.object[this.prop].getHexString()}`;
          }
          set value(hexString) {
            this.object[this.prop].set(hexString);
          }
        }

        gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
        gui.add(light, 'intensity', 0, 2, 0.01);

        const boxWidth = 2;
        const boxHeight = 2;
        const boxDepth = 2;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        //лоад для текстур
        //const loader = new THREE.TextureLoader();
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
        cube.position.set(1, 7, 0);
        scene.add(cube);
        const cube2 = new THREE.Mesh(geometry, materials2);
        cube2.position.set(1, 4, 0);
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