import * as THREE from 'three';
export function primitiv3(){
    THREE.Cache.enabled = true;


    function main() {

        const canvas = document.querySelector('#c');
        const renderer = new THREE.WebGLRenderer({canvas});

        const fov = 75;
        const aspect = 2;  // the canvas default
        const near = 0.1;
        const far = 500;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        camera.position.z = 15;

        const scene = new THREE.Scene();

        //cub
        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
        //куб с сегментами
        const width = 8;  // ui: width
        const height = 8;  // ui: height
        const depth = 8;  // ui: depth
        const widthSegments = 4;  // ui: widthSegments
        const heightSegments = 4;  // ui: heightSegments
        const depthSegments = 4;  // ui: depthSegments
        const geometry2 = new THREE.BoxGeometry(
        width, height, depth,
        widthSegments, heightSegments, depthSegments);
        //Плоский круг
        const radius = 3;  // ui: radius
        const segments = 24;  // ui: segments
        const geometry3 = new THREE.CircleGeometry(radius, segments);
        //Додекаэдр (12 сторон)
        const radius2 = 3;  // ui: radius
        const detail2 = 2;  // ui: detail
        const geometry4 = new THREE.DodecahedronGeometry(radius2, detail2);
        //создаем фигруску сердца
        const shape = new THREE.Shape();
        const x = -2.5;
        const y = -5;
        shape.moveTo(x + 2.5, y + 2.5);
        shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
        shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
        shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
        shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
        shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
        shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

        const extrudeSettings = {
        steps: 2,  // ui: steps
        depth: 2,  // ui: depth
        bevelEnabled: true,  // ui: bevelEnabled
        bevelThickness: 1,  // ui: bevelThickness
        bevelSize: 1,  // ui: bevelSize
        bevelSegments: 2,  // ui: bevelSegments
        };

        const geometry5 = new THREE.ExtrudeGeometry(shape, extrudeSettings);



        //изменяем материал, чтобы на него влиял источник света 
        //const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
        const material = new THREE.MeshPhongMaterial({color: 0x44aa88});
        const material2 = new THREE.MeshBasicMaterial({color: 0x8844aa});
        const material3 = new THREE.MeshPhongMaterial({color: 0xaa8844});

        const cube = new THREE.Mesh(geometry, material);
        const cube2 = new THREE.Mesh(geometry2, material);
        const flatСircle = new THREE.Mesh(geometry3, material2);
        const dodecahedron = new THREE.Mesh(geometry4, material3);
        const figur = new THREE.Mesh(geometry5, material3);

        
        scene.add(cube);
        scene.add(flatСircle);
        scene.add(dodecahedron);
        //scene.add(dodecahedron);
        scene.add(figur);
        //scene.add(cube2);

        cube.position.x = -7;
        cube.position.y = 3;
        cube.position.z = 0;
        flatСircle.position.x = 7;
        flatСircle.position.y = 3;


        

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


        // создание света
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 7);
        scene.add(light);

        function render(time) {
            time *= 0.001; 
            cube.rotation.x = time;
            cube.rotation.y = time;
            flatСircle.rotation.x = time;
            flatСircle.rotation.y = time;
            //dodecahedron.rotation.x = time;
            //dodecahedron.rotation.y = time;
            figur.rotation.x = time;
            figur.rotation.y = time;
            // cube2.rotation.x = time;
            // cube2.rotation.y = time;
            
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