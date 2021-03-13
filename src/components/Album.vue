<template>   
    <div id="main">
        <div id="scene_3d">

        </div>
    </div>
</template>

<script>
import * as THREE from 'three';
import oc from 'three-orbit-controls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
export default {
    name: 'Album',
    mounted() {
        const OrbitControls = oc(THREE)
        const three_scene = document.getElementById('scene_3d')
        let mouse = new THREE.Vector2()
        let raycaster = new THREE.Raycaster()

        // THREE JS 3S SCENE
        let scene = new THREE.Scene()

        // Light
        let light = new THREE.HemisphereLight()
        light.intensity = 0.7
        scene.add(light)

        let light2 = new THREE.PointLight()
        light2.intensity = 2
        light2.position.set(0, 1, 3)
        scene.add(light2)

        // Load 3D elements
        const loader = new GLTFLoader() 
        let citadel
        loader.load("models/citadel.glb", function ( gltf ) {
            citadel = scene.add( gltf.scene )            
            citadel = citadel.children[citadel.children.length - 1]

            citadel.rotation.y = 3.15
            citadel.position.set(-0.05, 1.6, -0.2)
        })   
        
        let cd
        loader.load("models/reliance_cd3.glb", function ( gltf ) {
            cd = scene.add( gltf.scene )        
        }) 
        
        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        )
        camera.position.set(2, 1, 2)

        // Render
        let renderer = new THREE.WebGLRenderer({ alpha: true })
        renderer.setClearColor( 0x000000, 0 )
        three_scene.appendChild(renderer.domElement)

        renderer.setSize(window.innerWidth, window.innerHeight)
        // Camera Controler    
        let controls = new OrbitControls(camera, renderer.domElement)
        controls.minDistance = 2
        controls.maxDistance = 10
        controls.target.set(0, 1, 0)
        controls.enableZoom = false
        controls.update()

        // Animate
        const animate = function () {
            requestAnimationFrame(animate)
            if (cd){
                cd.rotation.y += 0.001
            }

            renderer.render(scene, camera)
        }
        animate()

        //Mouse Event
        three_scene.addEventListener("click", event=> {
            event.preventDefault();

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            console.log('mouse.x', mouse.x)
            console.log('mouse.y', mouse.y)
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);
            console.log('intersect before', intersects)

            for ( let i = 0; i < intersects.length; i ++ ) {
                console.log("intersect")
                intersects[ i ].object.material.color.set( Math.random() * 0xffffff )

            }

            // if (intersects.length > 0) {
                
            //         var object = intersects[0].object;

            //     object.material.color.set( Math.random() * 0xffffff )
            // }            

            renderer.render(scene, camera)
        })
    }
}
</script>

<style scoped>
#main
{
    display: flex;
    align-items: center;

    width: 100vw;
    background: #262626;
}
#scene_3d
{
    height: 100vh;
    width: 100vw;
}
</style>
