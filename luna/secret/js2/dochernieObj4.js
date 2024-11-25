import * as THREE from 'three';
import { GUI } from 'https://unpkg.com/three@0.139.0/examples/jsm/libs/lil-gui.module.min.js';

export function dochernieObj4(){
    THREE.Cache.enabled = true;


    function main() {

        const canvas = document.querySelector('#c');
        const renderer = new THREE.WebGLRenderer({canvas});
        const gui = new GUI();

        const fov = 40;
        const aspect = 2;  // the canvas default
        const near = 0.1;
        const far = 1000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 50, 0);
        camera.up.set(0, 0, 1);
        camera.lookAt(0, 0, 0);

        //camera.position.z = 15;

        const scene = new THREE.Scene();


        //создание света      
        {
            const color = 0xFFFFFF;
            const intensity = 3;
            const light = new THREE.PointLight(color, intensity);
            scene.add(light);
        }


        //добавлем маассив в котором будух хранится объекты которые будем менять
        const objects = [];

        //добавлем пустой обьект где будет хранится земля и солнце
        const solarSystem = new THREE.Object3D();
        scene.add(solarSystem);
        objects.push(solarSystem);

        //добавлем солнце
        const radius = 1;
        const widthSegments = 6;
        const heightSegments = 6;
        const sphereGeometry = new THREE.SphereGeometry(
            radius, widthSegments, heightSegments);
        
        const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
        const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
        //увелициваем солнце
        sunMesh.scale.set(5, 5, 5);
        //Убираем добавления солнца в сцену и добавляем за место этого в пустой объект  
        //scene.add(sunMesh);
        solarSystem.add(sunMesh);
        objects.push(sunMesh);

        //добавлем пустой трехмерный обьект арбита земли 
        const earthOrbit = new THREE.Object3D();
        earthOrbit.position.x = 10;
        solarSystem.add(earthOrbit);
        objects.push(earthOrbit);

        //добавлем землю
        const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
        const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
        //earthMesh.position.x = 10; позиция теперь не нужна она используется в Арбите
        //Делаем землю ребенком солнца
        //scene.add(earthMesh);
        //sunMesh.add(earthMesh);
        //Отменяем родетельский обьект солнце, за место этого родительский обькт будет пустым три3 объектом
        //solarSystem.add(earthMesh);
        //Теперь добавляем землю не в пустой обьект а в объект земная арбита
        earthOrbit.add(earthMesh);
        objects.push(earthMesh);

        //изменяем материал, чтобы на него влиял источник света 
        //const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
        const material = new THREE.MeshPhongMaterial({color: 0x44aa88});
        const material2 = new THREE.MeshBasicMaterial({color: 0x8844aa});
        const material3 = new THREE.MeshPhongMaterial({color: 0xaa8844});

        //создаем луну
        const moonOrbit = new THREE.Object3D();
        moonOrbit.position.x = 2;
        earthOrbit.add(moonOrbit);
        
        const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
        const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
        moonMesh.scale.set(.5, .5, .5);
        moonOrbit.add(moonMesh);
        objects.push(moonMesh);

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
          //Добавление хнлпера показывающий координаты
          /*objects.forEach((node) => {
            const axes = new THREE.AxesHelper();
            axes.material.depthTest = false;
            axes.renderOrder = 1;
            node.add(axes);
          });*/
          //Добавляем хелпер Axis и Grid через функцию и класс
          class AxisGridHelper {
            constructor(node, units = 10) {
              const axes = new THREE.AxesHelper();
              axes.material.depthTest = false;
              axes.renderOrder = 2;  // after the grid
              node.add(axes);
        
              const grid = new THREE.GridHelper(units, units);
              grid.material.depthTest = false;
              grid.renderOrder = 1;
              node.add(grid);
        
              this.grid = grid;
              this.axes = axes;
              this.visible = false;
            }
            get visible() {
              return this._visible;
            }
            set visible(v) {
              this._visible = v;
              this.grid.visible = v;
              this.axes.visible = v;
            }
          }

          function makeAxisGrid(node, label, units) {
            const helper = new AxisGridHelper(node, units);
            gui.add(helper, 'visible').name(label);
          }
           
          makeAxisGrid(solarSystem, 'solarSystem', 25);
          makeAxisGrid(sunMesh, 'sunMesh');
          makeAxisGrid(earthOrbit, 'earthOrbit');
          makeAxisGrid(earthMesh, 'earthMesh');
          makeAxisGrid(moonOrbit, 'moonOrbit');
          makeAxisGrid(moonMesh, 'moonMesh');


        function render(time) {
            time *= 0.001; 
            // cube.rotation.x = time;
            // cube.rotation.y = time;
            objects.forEach((obj) => {
                obj.rotation.y = time;
              });
            
            //вызыываем функцию изменения отрисови и заодно проверяем, если отрисовка изменилась то задаем новые значения для конваза чтобы кубики не растягивались 
            if (resizeRendererToDisplaySize(renderer)) {
            //Убираем растягивание
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            }

            // cubes.forEach((cube, ndx) => {
            //     const speed = 1 + ndx * .1;
            //     //alert("ndx " + ndx + "speed " + speed)
            //     const rot = time * speed;
            //     cube.rotation.x = rot;
            //     cube.rotation.y = rot;
            //   });
           
            renderer.render(scene, camera);
           
            requestAnimationFrame(render);
          }
          requestAnimationFrame(render);
    }

    main();
}