import * as THREE from 'three';
export function optimizacia(){
    THREE.Cache.enabled = true;


    function main() {

        const canvas = document.querySelector('#c');
        const renderer = new THREE.WebGLRenderer({canvas});

        const fov = 75;
        const aspect = 2;  // the canvas default
        const near = 0.1;
        const far = 5;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        camera.position.z = 3;

        const scene = new THREE.Scene();

        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        //изменяем материал, чтобы на него влиял источник света 
        //const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
        const material = new THREE.MeshPhongMaterial({color: 0x44aa88});

        //создание сразу трех кубов
        function makeInstance(geometry, color, x) {
            const material = new THREE.MeshPhongMaterial({color});
           
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
           
            cube.position.x = x;
           
            return cube;
          }
        //Делаем массив из функций
        //const cube = new THREE.Mesh(geometry, material);
        const cubes = [
            makeInstance(geometry, 0x44aa88,  0),
            makeInstance(geometry, 0x8844aa, -2),
            makeInstance(geometry, 0xaa8844,  2),
          ];
        //Добавления куба в сцену тоже убираем поскольку он уже добавляется в функции 
        //scene.add(cube);
        

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
        light.position.set(-1, 2, 4);
        scene.add(light);

        function render(time) {
            time *= 0.001; 
            
            //вызыываем функцию изменения отрисови и заодно проверяем, если отрисовка изменилась то задаем новые значения для конваза чтобы кубики не растягивались 
            if (resizeRendererToDisplaySize(renderer)) {
            //Убираем растягивание
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            }

            cubes.forEach((cube, ndx) => {
                const speed = 1 + ndx * .1;
                //alert("ndx " + ndx + "speed " + speed)
                const rot = time * speed;
                cube.rotation.x = rot;
                cube.rotation.y = rot;
              });
           
            renderer.render(scene, camera);
           
            requestAnimationFrame(render);
          }
          requestAnimationFrame(render);
    }

    main();
}