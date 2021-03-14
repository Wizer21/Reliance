<template>   
    <div id="main">
        <div id="scene_3d">
        </div>
        <div id="player">
            <h2>
                Reliance
            </h2>
            <div id="track">
                <p v-for="obj of track" :key="obj.name" @click="newTrack(obj)">
                    {{ obj.name }}
                </p>
            </div>
            <div id="audio_player">
                <div id="content">
                    <div id="player_header">
                        <h3>
                            {{ audio_player_data.track }}
                        </h3>
                        <img :src="pause_icon" alt="pause" @click="togglePause()" id="pause_button">
                        <div id="mute_button">
                            <img :src="mute_icon" alt="mute" @click="toggleMute()">
                            <div id="volume_container">
                                <input type="range" id="volume_slider" orient="vertical">
                            </div>
                        </div>
                    </div> 
                    <div id="player_body">
                        <input type="range" id="track_slider" @change="timeSliderUpdate()" @input="timeSliderUpdate()"> 
                        <p>
                            {{ track_duration }}
                        </p>    
                    </div>
                </div>
               
            </div>
        </div>
    </div>
</template>

<script>
import * as THREE from 'three';
import oc from 'three-orbit-controls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
export default {
    name: 'Album',
    data() {
        return {
            track: {
                citadel: {
                    name: "Citadel",
                    url: 'Citadel.mp3',
                    key: 'citadel'
                },
                glasscastle: {                    
                    name: "Glass Castle",
                    url: 'Glass Castle.mp3',
                    key: 'glasscastle'
                },
                fragileskin: {                    
                    name: "Fragile Skin",
                    url: 'Fragile Skin.mp3',
                    key: 'fragileskin'
                },
                lucid: {                    
                    name: "Lucid",
                    url: 'Lucid.mp3',
                    key: 'lucid'
                },
                banshee: {                    
                    name: "Banshee",
                    url: 'Banshee.mp3',
                    key: 'banshee'
                },
            },
            audio_player_data: {
                track: ""
            },
            player: new Audio(),            
            pause_icon: require('../assets/icon/pause-24px.svg'),
            playerPaused: false,    
            mute_icon: require('../assets/icon/volume_up-24px.svg'),
            playerMuted: false,
            track_duration: 0
        }
    },
    methods: {
        newTrack (track) {
            document.getElementById('content').style.top = "-100px"
            document.getElementById('content').style.opacity = "0"
            setTimeout(() => {   
                this.audio_player_data.track = track.name

                this.player.src = require(`../assets/audio/${track.url}`)
                this.player.play()

                this.pause_icon = require('../assets/icon/pause-24px.svg')
                this.player.play()
                this.mute_icon = require('../assets/icon/volume_up-24px.svg')
                this.player.muted = false
                
                document.getElementById('content').style.top = "0px"
                document.getElementById('content').style.opacity = "1"
            }, 400)            
        },
        togglePause() {
            if (this.playerPaused){
                this.playerPaused = false
                this.pause_icon = require('../assets/icon/pause-24px.svg')
                this.player.play()
            }
            else{
                this.playerPaused = true
                this.pause_icon = require('../assets/icon/play_arrow-24px.svg')
                this.player.pause()
            }
        },
        toggleMute() {
            if (this.playerMuted){
                this.playerMuted = false
                this.mute_icon = require('../assets/icon/volume_up-24px.svg')
                this.player.muted = false
            }
            else{
                this.playerMuted = true
                this.mute_icon = require('../assets/icon/volume_off-24px.svg')
                this.player.muted = true
            }
        },
        timeSliderUpdate() {
            this.player.currentTime = document.getElementById('track_slider').value
        }
    },
    mounted() {
        // --- THREE JS 3D SCENE ---
        const OrbitControls = oc(THREE)
        const three_scene = document.getElementById('scene_3d')
        let objects_list = []

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
        let cd
        loader.load("models/reliance_cd3.glb", function ( gltf ) {
            cd = scene.add( gltf.scene )       
            cd = cd.children[cd.children.length - 1]

            objects_list.push(cd) 
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

            if (objects_list){
                for (let obj of objects_list){
                    obj.rotation.y += 0.001
                }
            }
            renderer.render(scene, camera)
        }
        animate()

        // --- 3D END ---
        this.player.addEventListener('timeupdate', () => {
            let timer = this.player.currentTime
            document.getElementById('track_slider').value = timer


            let seconds = parseInt(timer)
            
            let minute = 0
            while(seconds >= 60){
                seconds -= 60
                minute += 1
            }
            if( seconds < 10){
                seconds = '0' + seconds
            }
            this.track_duration = `${minute}:${seconds}`            
        })
        this.player.addEventListener('loadedmetadata', () => {
            document.getElementById('track_slider').max = this.player.duration
            console.log('max : ', this.player.duration)
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
    position: relative;
    left: -25vw;
    height: 100vh;
    width: 50vw;
}
#player
{    
    position: relative;
    height: 100vh;
    width: 50vw;
    z-index: 3;

    display: flex;
    flex-direction: column;
    justify-content: center;
}
#player h2
{    
    color: rgb(255, 255, 255);
    font-size: 4em;
}
#track p
{
    color: rgb(255, 255, 255);
    font-size: 2em;
    margin: 1em;
    transition-duration: 400ms;
}
#track p:hover
{
    transition-duration: 400ms;
    transform: translate(40px, 0px);
}
#audio_player
{
    color: white;
    width: 80%;

    overflow: hidden;
}
#content
{
    position: relative;
    top: -100px;
    width: 100%;
    opacity: 0;

    transition-duration: 400ms;
    transition-timing-function: ease-out;
}
#player_header
{
    display: flex;
    flex-direction: row;
}
#player_header h3
{
    flex:2;
}
#player_body
{
    display: flex;
    flex-direction: row;
}
#player_body input
{
    width: 100%;
}
#mute_button
{
    display: flex;
    align-items: center;
    overflow: visible;
}
#mute_button img
{
    transition-duration: 300ms;
}
#mute_button:hover img
{
    transform: scale(1.2);
    transition-duration: 300ms;
}
#volume_container
{
    position: absolute;
    height: 25px;
    width: 25px;
    transition-duration: 300ms;

    overflow: visible;
    z-index: 5;
}
#volume_container:hover
{
    transform: translate(0px, -110px);
    height: 225px;
    transition-duration: 300ms;
}
/* #volume_container input
{
    position: relative;
    height: 0px;
    opacity: 0;
    transition-duration: 300ms;
    pointer-events: none;

    margin: 0px;
    padding: 4.5px;

}
#volume_container:hover input
{
    height: 100px;
    opacity: 1;
    transition-duration: 300ms;
    pointer-events: all;
} */
#pause_button
{
    margin-right: 10px;
    transition-duration: 300ms;
}
#pause_button:hover
{
    transform: scale(1.2);
    transition-duration: 300ms;
}

input[type=range][orient=vertical]
{
    writing-mode: bt-lr; /* IE */
    -webkit-appearance: slider-vertical; /* WebKit */
    width: 8px;
    height: 175px;
    padding: 0 5px;
}
</style>
