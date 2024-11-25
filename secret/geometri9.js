import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.139.0/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'https://unpkg.com/three@0.139.0/examples/jsm/libs/lil-gui.module.min.js';
import { OBJLoader } from 'https://unpkg.com/three@0.139.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://unpkg.com/three@0.139.0/examples/jsm/loaders/MTLLoader.js';


export function geometri9(){
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
        camera.position.set(0, 10, 25);
        /*camera.up.set(0, 0, 1);
        camera.lookAt(0, 0, 0);*/

        //camera.position.z = 15;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#8fc3c7');
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
        mesh.name = "основание";
        
        scene.add(mesh);
        //alert(mesh.name);
        //создаем куб
        {
          const cubeSize = 4;
          const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
          const cubeMat = new THREE.MeshPhongMaterial({color: '#8AC'});
          const mesh = new THREE.Mesh(cubeGeo, cubeMat);
          mesh.position.set(-10, cubeSize / 2, 0);
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
        //const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

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
        //const cubes = [];
        const materials2 = [
          new THREE.MeshPhongMaterial({map: loader.load('images/flower-1.jpg')}),
          new THREE.MeshPhongMaterial({map: loader.load('images/flower-2.jpg')}),
          new THREE.MeshPhongMaterial({map: loader.load('images/flower-3.jpg')}),
          new THREE.MeshPhongMaterial({map: loader.load('images/flower-4.jpg')}),
          new THREE.MeshPhongMaterial({map: loader.load('images/flower-5.jpg')}),
          new THREE.MeshPhongMaterial({map: loader.load('images/flower-6.jpg')}),
        ];

        //const cube = new THREE.Mesh(geometry, material);
        //cube.scale.set(1, 1, 1);
        //cube.position.set(1, 7, 0);
        //scene.add(cube);
        //const cube2 = new THREE.Mesh(geometry, materials2);
        //cube2.position.set(1, 4, 0);
        
        //scene.add(cube2);
        //cube2.scale.set(1, 1, 1.5);
        //буфер геометри
        const vertices = [
            // front
            // { pos: [-1, -1,  1], norm: [ 0,  0,  1], uv: [0, 0], },
            // { pos: [ 1, -1,  1], norm: [ 0,  0,  1], uv: [1, 0], },
            // { pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 1], },
           
            // /*{ pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 1], },*/
            // /*{ pos: [ 1, -1,  1], norm: [ 0,  0,  1], uv: [1, 0], },*/
            // { pos: [ 1,  1,  1], norm: [ 0,  0,  1], uv: [1, 1], },
            // // right
            // { pos: [ 1, -1,  1], norm: [ 1,  0,  0], uv: [0, 0], },
            // { pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 0], },
            // { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 1], },
           
            // { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 1], },
            // { pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 0], },
            // { pos: [ 1,  1, -1], norm: [ 1,  0,  0], uv: [1, 1], },
            // // back
            // { pos: [ 1, -1, -1], norm: [ 0,  0, -1], uv: [0, 0], },
            // { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 0], },
            // { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 1], },
           
            // { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 1], },
            // { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 0], },
            // { pos: [-1,  1, -1], norm: [ 0,  0, -1], uv: [1, 1], },
            // // left
            // { pos: [-1, -1, -1], norm: [-1,  0,  0], uv: [0, 0], },
            // { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 0], },
            // { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 1], },
           
            // { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 1], },
            // { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 0], },
            // { pos: [-1,  1,  1], norm: [-1,  0,  0], uv: [1, 1], },
            // // top
            // { pos: [ 1,  1, -1], norm: [ 0,  1,  0], uv: [0, 0], },
            // { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 0], },
            // { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 1], },
           
            // { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 1], },
            // { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 0], },
            // { pos: [-1,  1,  1], norm: [ 0,  1,  0], uv: [1, 1], },
            // // bottom
            // { pos: [ 1, -1,  1], norm: [ 0, -1,  0], uv: [0, 0], },
            // { pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 0], },
            // { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 1], },
           
            // { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 1], },
            // { pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 0], },
            // { pos: [-1, -1, -1], norm: [ 0, -1,  0], uv: [1, 1], },
            // front
            { pos: [-1, -1,  1], norm: [ 0,  0,  1], uv: [0, 0], }, // 0
            { pos: [ 1, -1,  1], norm: [ 0,  0,  1], uv: [1, 0], }, // 1
            { pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 1], }, // 2
            { pos: [ 1,  1,  1], norm: [ 0,  0,  1], uv: [1, 1], }, // 3
            // right
            { pos: [ 1, -1,  1], norm: [ 1,  0,  0], uv: [0, 0], }, // 4
            { pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 0], }, // 5
            { pos: [ 3,  3,  1], norm: [ 1,  0,  0], uv: [0, 1], }, // 6
            { pos: [ 1,  1, -1], norm: [ 1,  0,  0], uv: [1, 1], }, // 7
            // back
            { pos: [ 1, -1, -1], norm: [ 0,  0, -1], uv: [0, 0], }, // 8
            { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 0], }, // 9
            { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 1], }, // 10
            { pos: [-1,  1, -1], norm: [ 0,  0, -1], uv: [1, 1], }, // 11
            // left
            { pos: [-1, -1, -1], norm: [-1,  0,  0], uv: [0, 0], }, // 12
            { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 0], }, // 13
            { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 1], }, // 14
            { pos: [-1,  1,  1], norm: [-1,  0,  0], uv: [1, 1], }, // 15
            // top
            { pos: [ 1,  1, -1], norm: [ 0,  1,  0], uv: [0, 0], }, // 16
            { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 0], }, // 17
            { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 1], }, // 18
            { pos: [-1,  1,  1], norm: [ 0,  1,  0], uv: [1, 1], }, // 19
            // bottom
            { pos: [ 1, -1,  1], norm: [ 0, -1,  0], uv: [0, 0], }, // 20
            { pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 0], }, // 21
            { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 1], }, // 22
            { pos: [-1, -1, -1], norm: [ 0, -1,  0], uv: [1, 1], }, // 23
          ];

          const positions = [];
          const normals = [];
          const uvs = [];
          for (const vertex of vertices) {
            positions.push(...vertex.pos);
            normals.push(...vertex.norm);
            uvs.push(...vertex.uv);
          }

          const geometry = new THREE.BufferGeometry();
          const positionNumComponents = 3;
          const normalNumComponents = 3;
          const uvNumComponents = 2;
          geometry.setAttribute(
              'position',
              new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
          geometry.setAttribute(
              'normal',
              new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
          geometry.setAttribute(
              'uv',
              new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));

          geometry.setIndex([
                0,  1,  2,   2,  1,  3,
                4,  5,  6,   6,  5,  7,
                8,  9, 10,  10,  9, 11,
               12, 13, 14,  14, 13, 15,
               16, 17, 18,  18, 17, 19,
               20, 21, 22,  22, 21, 23,
             ]);

          const loader2 = new THREE.TextureLoader();
          const texture2 = loader2.load('https://threejs.org/manual/examples/resources/images/star.png');
          
          function makeInstance(geometry, color, x ,z, y) {
            const material = new THREE.MeshPhongMaterial({color, map: texture2});
              
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
              
            cube.position.x = x;
            cube.position.z = z;
            cube.position.y = y;
            return cube;
          }
            
          const cubes = [
            makeInstance(geometry, 0x88FF88,  0, 4, 3),
            makeInstance(geometry, 0x8888FF, -4, 4, 3),
            makeInstance(geometry, 0xFF8888,  4, 4, 3),
          ];

          const geometriP = new THREE.PlaneBufferGeometry(15, 6, 20, 20);

          const plane = new THREE.Mesh(geometriP, new THREE.MeshPhongMaterial({color: '#1d719a'}));

          plane.rotation.x = - Math.PI / 2;
          plane.position.y = 8;
          plane.position.x = 5;
          plane.receiveShadow = true;
          plane.castShadow = true;
          scene.add(plane);

          const count = geometriP.attributes.position.count;
          //alert(count);


          //выбор с помощью мышки

          class PickHelper {
            constructor() {
              this.raycaster = new THREE.Raycaster();
              this.pickedObject = null;
              this.pickedObjectSavedColor = 0;
            }
            pick(normalizedPosition, scene, camera, time) {
              // restore the color if there is a picked object
              if (this.pickedObject) {
                this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
                this.pickedObject = undefined;
              }
           
              // cast a ray through the frustum
              this.raycaster.setFromCamera(normalizedPosition, camera);
              // get the list of objects the ray intersected
              const intersectedObjects = this.raycaster.intersectObjects(scene.children);
              //alert(intersectedObjects.name);
              if (intersectedObjects.length) {
                // pick the first object. It's the closest one
                this.pickedObject = intersectedObjects[0].object;
                //if(this.pickedObject.name){
                 // alert(this.pickedObject.name);
                //}
                
                // save its color
                this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
                // set its emissive color to flashing red/yellow
                if(this.pickedObject.name == "основание"){
                  this.pickedObject.material.emissive.setHex(/*(time * 8) % 2 > 1 ? 0xFFFF00 :*/ 0xFF0000);
                }
              }
            }
          }

          const pickPosition = {x: 0, y: 0};
          const pickHelper = new PickHelper();
          clearPickPosition();
                  
        
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
            pickHelper.pick(pickPosition, scene, camera, time);

            const now = Date.now() / 300;
            
            //for(let i = 0;i < /*count*/;i = i +1 ){
              //alert(count);
              //const x = geometriP.attributes.position.getX(i);
              //console.log(x);
              //alert('x ' + x + 'now ' + now + 'now + x' + (x + now) + 'Math.sin(x + now)'+ Math.sin(x + now));
              
              //const xsin = Math.sin(x + now);
              //geometriP.attributes.position.setZ(i, xsin);


              //geometriP.attributes.position.setZ(1, 1);
              //geometriP.attributes.position.setZ(1, 1);
              geometriP.attributes.position.setY(0, 4);
              geometriP.attributes.position.setY(1, 4.5);
              geometriP.attributes.position.setY(2, 5);
              geometriP.attributes.position.setY(3, 5.5);
              geometriP.attributes.position.setY(4, 6);
              /*geometriP.attributes.position.setZ(5, 1);
              geometriP.attributes.position.setZ(1000, 1);
              geometriP.attributes.position.setZ(1001, 1);
              geometriP.attributes.position.setZ(1002, 1);
              geometriP.attributes.position.setZ(1004, 1);
              geometriP.attributes.position.setZ(999, 1);*/

            //}

            geometriP.attributes.position.needsUpdate = true;

            //cube.rotation.x = time;

            //cube2.rotation.x = time;
            cubes.forEach((cube, ndx) => {
                const speed = 1 + ndx * .1;
                /*alert('ndx'+ndx);
                alert('ndx * .1'+(ndx * .1));
                alert('speed'+speed);*/
                const rot = time * speed;
                //cube.rotation.x = rot;
                //cube.rotation.y = rot;
              });


            
            //вызыываем функцию изменения отрисови и заодно проверяем, если отрисовка изменилась то задаем новые значения для конваза чтобы кубики не растягивались 
            if (resizeRendererToDisplaySize(renderer)) {
            //Убираем растягивание
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            }
           
            renderer.render(scene, camera);
           
            requestAnimationFrame(render);
          }
          requestAnimationFrame(render);

          function getCanvasRelativePosition(event) {
            const rect = canvas.getBoundingClientRect();
            return {
              x: (event.clientX - rect.left) * canvas.width  / rect.width,
              y: (event.clientY - rect.top ) * canvas.height / rect.height,
            };
          }
           
          function setPickPosition(event) {
            const pos = getCanvasRelativePosition(event);
            pickPosition.x = (pos.x / canvas.width ) *  2 - 1;
            pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y
          }
           
          function clearPickPosition() {
            // unlike the mouse which always has a position
            // if the user stops touching the screen we want
            // to stop picking. For now we just pick a value
            // unlikely to pick something
            pickPosition.x = -100000;
            pickPosition.y = -100000;
          }
           
          window.addEventListener('mousemove', setPickPosition);
          window.addEventListener('mouseout', clearPickPosition);
          window.addEventListener('mouseleave', clearPickPosition);

          window.addEventListener('touchstart', (event) => {
            // prevent the window from scrolling
            event.preventDefault();
            setPickPosition(event.touches[0]);
          }, {passive: false});
           
          window.addEventListener('touchmove', (event) => {
            setPickPosition(event.touches[0]);
          });
           
          window.addEventListener('touchend', clearPickPosition);
    }

    main();
}