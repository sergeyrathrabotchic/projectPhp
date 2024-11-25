import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.139.0/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'https://unpkg.com/three@0.139.0/examples/jsm/libs/lil-gui.module.min.js';
import { OBJLoader } from 'https://unpkg.com/three@0.139.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://unpkg.com/three@0.139.0/examples/jsm/loaders/MTLLoader.js';


export function Transparency8(){
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
        scene.add(mesh);
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
        //cube.scale.set(1, 1, 1);
        cube.position.set(1, 7, 0);
        scene.add(cube);
        const cube2 = new THREE.Mesh(geometry, materials2);
        cube2.position.set(1, 4, 0);
        
        scene.add(cube2);
        cube2.scale.set(1, 1, 1.5);
        
        //загружаем Obj 
        {
            const mtlLoader = new MTLLoader();
            const objLoader = new OBJLoader();
            mtlLoader.load('obj/alonge.mtl', (mtl) => {
              mtl.preload();
              objLoader.setMaterials(mtl);
              objLoader.load('obj/alonge.obj', (root) => {
                root.position.set(1, 4, -7);
                root.scale.set(25, 25, 25);
                scene.add(root);
            });
            });
            const mtlLoader2 = new MTLLoader();
            const objLoader2 = new OBJLoader();
            mtlLoader2.load('obj/alonge.mtl', (mtl2) => {
              mtl2.preload();
              objLoader2.setMaterials(mtl2);
              objLoader2.load('obj/alonge.obj', (root2) => {
                root2.position.set(-5, 4, -7);
                root2.scale.set(25, 25, 25);
                scene.add(root2);
            });
            });
            const mtlLoader3 = new MTLLoader();
            const objLoader3 = new OBJLoader();
            mtlLoader3.load('obj/chromo_box.mtl', (mtl3) => {
              mtl3.preload();
              objLoader3.setMaterials(mtl3);
              objLoader3.load('obj/chromo_box.obj', (root3) => {
                root3.position.set(-10, 4, -7);
                root3.scale.set(25, 25, 25);
                scene.add(root3);
            });
            });
            const mtlLoader4 = new MTLLoader();
            const objLoader4 = new OBJLoader();
            mtlLoader4.load('obj/lighter.mtl', (mtl4) => {
              mtl4.preload();
              objLoader4.setMaterials(mtl4);
              objLoader4.load('obj/lighter.obj', (root4) => {
                root4.position.set(10, 4, -10);
                root4.scale.set(25, 25, 25);
                scene.add(root4);
            });
            });
            const mtlLoader5 = new MTLLoader();
            const objLoader5 = new OBJLoader();
            mtlLoader5.load('obj/hydrometer.mtl', (mtl5) => {
              mtl5.preload();
              objLoader5.setMaterials(mtl5);
              objLoader5.load('obj/hydrometer.obj', (root5) => {
                root5.position.set(-10, 4, -10);
                root5.scale.set(25, 25, 25);
                scene.add(root5);
            });
            });
            const mtlLoader6 = new MTLLoader();
            const objLoader6 = new OBJLoader();
            mtlLoader6.load('obj/parasaurolophus.mtl', (mtl6) => {
              mtl6.preload();
              objLoader6.setMaterials(mtl6);
              objLoader6.load('obj/parasaurolophus.obj', (root6) => {
                root6.position.set(-10, 4, -10);
                //root6.scale.set(25, 25, 25);
                scene.add(root6);
            });
            });
        }


        //функция создания прозрачного куба
        const boxWidth4 = 3;
        const boxHeight4 = 0.3;
        const boxDepth4 = 3;
        const geometry4 = new THREE.BoxGeometry(boxWidth4, boxHeight4, boxDepth4);
        const boxWidth5 = 0.3;
        const boxHeight5 = 6;
        const boxDepth5 = 3.6;
        const geometry5 = new THREE.BoxGeometry(boxWidth5, boxHeight5, boxDepth5);
        const boxWidth6 = 3;
        const boxHeight6 = 6;
        const boxDepth6 = 0.3;
        const geometry6 = new THREE.BoxGeometry(boxWidth6, boxHeight6, boxDepth6);
        const boxWidth7 = 3;
        const boxHeight7 = /*4*/0.5;
        const boxDepth7 = 3;
        const geometry7 = new THREE.BoxGeometry(boxWidth7, boxHeight7, boxDepth7);
        const cubeMat2 = new THREE.MeshPhongMaterial({color: '#8AC'});
        const geometry8 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        
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
        

        const material6 = new THREE.MeshPhongMaterial({
          color: '#1d719a',
          opacity: 0.7,
          transparent: true,
        });

        const material7 = new THREE.MeshPhongMaterial({
          color: '#1d719a',
          opacity: 0.7,
          transparent: true,
        });

        const geometriFirstStokan = new THREE.PlaneBufferGeometry(3, 3, 80, 80);
        const planeFirstStokan = new THREE.Mesh(geometriFirstStokan, material7);
        planeFirstStokan.material.opacity = 0; 
        planeFirstStokan.rotation.x = - Math.PI / 2;
        planeFirstStokan.receiveShadow = true;
        planeFirstStokan.castShadow = true;
        //plane.widthCh = 3;
        planeFirstStokan.position.set(14, 2.5, 0);
        scene.add(planeFirstStokan);

        const count = geometriFirstStokan.attributes.position.count;
         
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
        cube9.position.set(14, /*2.85*/2.35, 0);
        cube9.material.opacity = 0; 
        scene.add(cube9);

        //добавлем маассив в котором будух хранится объекты второго стакана которые будем менять
        const objects = [];

        //добавлем пустой обьект где будет хранится земля и солнце
        //const sosudSystem = new THREE.Object3D();
        const cell = new THREE.Object3D();/*new THREE.Mesh(geometry8, cubeMat2);*/
        cell.position.set(7, 4.85, 0);
        scene.add(cell);
        //sosudRotation.add(cube10);

        const sosudOrbit = new THREE.Object3D();
        sosudOrbit.position.x = 0;
        sosudOrbit.position.y = 0;
        cell.add(sosudOrbit);

        const sosudRotation = new THREE.Object3D();

        const vodaOrbit = new THREE.Object3D();
        //sphereMa материал
        //const cube16 =  new THREE.Mesh(geometry8, cubeMat2);
        //cube16.position.x = -1.5;
        /*vodaOrbit.position.y = 0.5;*/
        sosudRotation.add(vodaOrbit);

        const voda = new THREE.Object3D();
        vodaOrbit.add(voda);

        objects.push(sosudRotation);

        const geometriP = new THREE.PlaneBufferGeometry(3, 0, 5, 5);

        const plane = new THREE.Mesh(geometriP, new THREE.MeshPhongMaterial({color: '#1d719a'}));
        plane.position.x = -1.5;
        plane.width = 3;
        plane.rotation.x = - Math.PI / 2;
        plane.rotation.z = - Math.PI / 2;
        plane.receiveShadow = true;
        plane.castShadow = true;
        //plane.widthCh = 3;
        voda.add(plane);
        const geometriFront = new THREE.PlaneBufferGeometry(3, 2.7, 5, 5);
        const geometriTest = new THREE.PlaneBufferGeometry(3, 0, 1, 2);
        const planeFront = new THREE.Mesh(geometriTest, new THREE.MeshPhongMaterial({color: '#1d719a'}));
        /*plane.position.x = -1.5;
        plane.width = 3;
        plane.rotation.x = - Math.PI / 2;
        plane.rotation.z = - Math.PI / 2;*/
        planeFront.receiveShadow = true;
        planeFront.castShadow = true;
        //plane.widthCh = 3;
        planeFront.position.set(0, -2.70, 1.5);
        sosudRotation.add(planeFront);

        const planeBeck = new THREE.Mesh(geometriFront, new THREE.MeshPhongMaterial({color: '#1d719a'}));
        planeBeck.receiveShadow = true;
        planeBeck.castShadow = true;
        //planeBeck.rotation.y = - Math.PI / 2;
        planeBeck.rotation.y = - Math.PI /*/ 4*/;
        planeBeck.position.set(0, -1.35, -1.5);
        sosudRotation.add(planeBeck);
        const planeRigth = new THREE.Mesh(geometriFront, new THREE.MeshPhongMaterial({color: '#1d719a'}));
        planeRigth.receiveShadow = true;
        planeRigth.castShadow = true;
        //planeBeck.rotation.y = - Math.PI / 2;
        planeRigth.rotation.y = - Math.PI/2 /*/ 4*/;
        planeRigth.position.set(-1.5, -1.35, 0);
        sosudRotation.add(planeRigth);
        const planeLeft = new THREE.Mesh(geometriFront, new THREE.MeshPhongMaterial({color: '#1d719a'}));
        planeLeft.receiveShadow = true;
        planeLeft.castShadow = true;
        //planeBeck.rotation.y = - Math.PI / 2;
        planeLeft.rotation.y = Math.PI/2 /*/ 4*/;
        planeLeft.position.set(1.5, -1.35, 0);
        sosudRotation.add(planeLeft);



        const cube10 = new THREE.Mesh(geometry4, material4);
        cube10.position.set(0, -2.85, 0);
        sosudRotation.add(cube10);

        const cube11 = new THREE.Mesh(geometry5, material4);
        cube11.position.set(-1.65, 0, 0);
        sosudRotation.add(cube11);

        const cube12 = new THREE.Mesh(geometry5, material4);
        cube12.position.set(1.65, 0, 0);
        sosudRotation.add(cube12);
        

        const cube13 = new THREE.Mesh(geometry6, material4);
        cube13.position.set(0,0, -1.65);
        sosudRotation.add(cube13);


        const cube14 = new THREE.Mesh(geometry6, material4);
        cube14.position.set(0, 0, 1.65);
        sosudRotation.add(cube14);

        sosudOrbit.add(sosudRotation);
        //sosudOrbit.add(cube16); 
        
        //sosudSystem.position.set(0, 0, 0);
        //sosudRotation.position.set(0, 0, 0);

        // const cube15 = new THREE.Mesh(geometry7, material5);
        // cube15.position.set(14, 2.35/*4.15*/, 0);
        // scene.add(cube15);

         























        
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
          

        var height = 1;
        var height2 = 0.3;
        var sosudSystemUp = 0;
        var sosudSystemRigthProcerka = 0;
        var sosudSystemRigth = 0;
        var sosudSystemRotationProcerka = 0;
        var sosudSystemRotation = 0;
        var fillingWithWater = 0;
        var sosudSystemRotationDegrees = 0;
        var sosudSystemRotationDegrees2 = 0;
        var sosudV = 1;
        var sosudSystemProportionFill = 1;
        var proverka = 0 ;
        var positionX = 0;
        var angle = 0;
        var proportion = 0;
        //cube15.scale.set(1.016, 1, 1);

        function render(time) {

          

          if(proverka == 0){
            geometriP.attributes.position.setY(0, 3);
            geometriP.attributes.position.setY(1, 3);
            geometriP.attributes.position.setY(2, 3);
            geometriP.attributes.position.setY(3, 3);
            geometriP.attributes.position.setY(4, 3);
            geometriP.attributes.position.setY(5, 3);
            geometriP.attributes.position.needsUpdate = true;
            geometriTest.attributes.position.setY(0, 2.7);
            geometriTest.attributes.position.setY(1, 2.7);
            geometriTest.attributes.position.needsUpdate = true;
            proverka = 1;
          }
          

            time *= 0.001;
            if(height < 5.5 && fillingWithWater == 1) {
            cube9.material.opacity = 0.7;
            planeFirstStokan.material.opacity = 0.7;  
            height += 0.0070; 
            height2 += 0.00175; 
              cube9.scale.set(1, height, 1);
              cube9.position.set(14, 2.35 + height2, 0);
              planeFirstStokan.position.set(14, 2.35 + height2 + height2, 0);
              const now = Date.now() / 1100;
              for(let i = 0;i < count;i = i +1 ){
                //alert(count);
                const x = geometriFirstStokan.attributes.position.getX(i);
                const y = geometriFirstStokan.attributes.position.getY(i);
              // console.log(x);
                //alert('x ' + x + 'now ' + now + 'now + x' + (x + now) + 'Math.sin(x + now)'+ Math.sin(x + now));
                
                const xsin = Math.sin(8*(x + now) );
                const ycos = Math.sin(8*(y + now) );
                //console.log(xsin);
                geometriFirstStokan.attributes.position.setZ(i, xsin/11 + ycos/11);
              }
              geometriFirstStokan.attributes.position.needsUpdate = true;

            }
            if(height >= 5.5){
              planeFirstStokan.material.opacity = 0;
            }
            

            if(sosudSystemUp < 5.3){
              sosudSystemUp += 0.0045;
              cell.position.set(7, 4.85 + sosudSystemUp, 0);    
            } 

            if(sosudSystemUp >= 5.3){
              sosudSystemRigthProcerka = 1;
            }

            if(sosudSystemRigthProcerka == 1 && sosudSystemRigth < 3.2){
              if(sosudSystemRigth<2){
                sosudSystemRigth += 0.0045;
                cell.position.set(7 + sosudSystemRigth ,  4.85 + sosudSystemUp , 0 );
              } else {
                sosudSystemRigth += 0.0022;
                cell.position.set(7 + sosudSystemRigth ,  4.85 + sosudSystemUp , 0 );
              }
              
            }

            if(sosudSystemRigth >= 1.5){
              sosudSystemRotationProcerka = 1;
            }

            if(sosudSystemRotationProcerka == 1 && sosudSystemRotation < 0.9/*1*//*0.4*//*0.8*//*1.6 /*((sosudSystemRotation * 57.3) < 75)*/){

              sosudSystemRotation += 0.001;

              sosudV += 0.0016
              sosudSystemRotationDegrees = sosudSystemRotationDegrees +  0.001 * 57.3 ;
                 proportion = 1 + sosudSystemRotationDegrees/90;
              if(sosudSystemRotation * 57,3 < 75){
              sosudSystemRotationDegrees2 = 0.001 * 57.3  / 2 /** 1.1*//*/ 2  2*/;
             
              //console.log(sosudSystemRotationDegrees2  + "   Math.cos(sosudSystemRotationDegrees2)  " + ( Math.cos(sosudSystemRotationDegrees2))) ;
              var width = plane.width;
              var widthOld = width;
              width = width + (1 - Math.cos(sosudSystemRotationDegrees2)) * 5.7 ;
              //console.log("(sosudSystemRotation * 57,3) " + (sosudSystemRotation * 57.3) +"    " + ((sosudSystemRotation * 57.3) >15   && (sosudSystemRotation * 57.3) < 40));
              // /*alert((6 * Math.sin(sosudSystemRotationDegrees2)) * 2);
              // alert(width2);*/
              plane.width = width;
              positionX = positionX + (width - widthOld) / 2 ;
              /*console.log(width2);*/
              }
              if((sosudSystemRotation * 57.3) >10   && (sosudSystemRotation * 57.3) < 30 ){

              geometriP.attributes.position.setY(0,  /*3 * proportion*/ width *0.95);
              geometriP.attributes.position.setY(1,  width *0.95);
              geometriP.attributes.position.setY(2,  width *0.95);
              geometriP.attributes.position.setY(3,  width *0.95);
              geometriP.attributes.position.setY(4,  width *0.95);
              geometriP.attributes.position.setY(5,  width *0.95);
              } else if ((sosudSystemRotation * 57.3) >30   && (sosudSystemRotation * 57.3) < 50 ) {
                geometriP.attributes.position.setY(0,  /*3 * proportion*/ width *0.95);
                geometriP.attributes.position.setY(1,  width *0.93);
                geometriP.attributes.position.setY(2,  width *0.93);
                geometriP.attributes.position.setY(3,  width *0.93);
                geometriP.attributes.position.setY(4,  width *0.93);
                geometriP.attributes.position.setY(5,  width *0.93);
              } else if ((sosudSystemRotation * 57.3) >50   && (sosudSystemRotation * 57.3) < 60 ) {
                geometriP.attributes.position.setY(0,  /*3 * proportion*/ width *0.97);
                geometriP.attributes.position.setY(1,  width *0.97);
                geometriP.attributes.position.setY(2,  width *0.97);
                geometriP.attributes.position.setY(3,  width *0.97);
                geometriP.attributes.position.setY(4,  width *0.97);
                geometriP.attributes.position.setY(5,  width *0.97);
              } else {
                geometriP.attributes.position.setY(0,  /*3 * proportion*/ width );
                geometriP.attributes.position.setY(1,  width );
                geometriP.attributes.position.setY(2,  width );
                geometriP.attributes.position.setY(3,  width );
                geometriP.attributes.position.setY(4,  width );
                geometriP.attributes.position.setY(5,  width );
              }
              geometriP.attributes.position.needsUpdate = true;

              if((sosudSystemRotation * 57.3) >15   && (sosudSystemRotation * 57.3) < 40 ){
                 plane.position.set(-1.5 -  /*(3 * proportion - 3)/2*/positionX*0.93/*-10*/,  0 , 0 );
              } else if((sosudSystemRotation * 57.3) >30   && (sosudSystemRotation * 57.3) < 50 ){
                plane.position.set(-1.5 -  /*(3 * proportion - 3)/2*/positionX*0.95/*-10*/,  0 , 0 );
              } else if ((sosudSystemRotation * 57.3) >50   && (sosudSystemRotation * 57.3) < 60 ){
                plane.position.set(-1.5 -  /*(3 * proportion - 3)/2*/positionX*0.97/*-10*/,  0 , 0 );
              } 
              else {
                plane.position.set(-1.5 -  /*(3 * proportion - 3)/2*/positionX/*-10*/,  0 , 0 );
              }
              if(sosudSystemRotation < 0.45){
                angle = angle + /*0.0021*/0.0017;
              } 
              if (sosudSystemRotation > 0.45 && sosudSystemRotation < 0.9){
                angle = angle + /*0.0021*/0.00235;
              }
              
              if(/*sosudSystemRotation < 0.9*/sosudSystemRotation < 0.45){
                  /*angle = angle + 0.5;
                  console.log('+' + angle);*/
                  geometriTest.attributes.position.setY(0, 2.77 - angle );
                  /*angle = angle - 0.5;
                  console.log('-' + angle);*/
                  geometriTest.attributes.position.setY(1, 2.77 + angle );
                  geometriTest.attributes.position.needsUpdate = true;
              }
              if(/*sosudSystemRotation < 0.9*/sosudSystemRotation > 0.45 && sosudSystemRotation < 0.9){
                geometriTest.attributes.position.setY(0, 2.77 - angle );
                geometriTest.attributes.position.setY(1, 2.77 + angle );
                geometriTest.attributes.position.needsUpdate = true;
            }

                
              sosudRotation.rotation.z = -sosudSystemRotation;
              voda.rotation.z = sosudSystemRotation;
            }

            if(sosudSystemRotation >= 0.8 ){
              fillingWithWater = 1;
            }
            cube.rotation.x = time;
             /*objects.forEach((obj) => {
                    obj.rotation.x = time;
             });*/
            //sosudRotation.rotation.z = -(time/2);
            // cube.rotation.x = time;
            // cube.rotation.y = time;
            cube2.rotation.x = time;
            //geometry7.set(1, 1, height);
            //cube2.scale.set(1, 1, height);

            
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