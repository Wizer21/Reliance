<template>   
    <div id="main">
        <div id="scene_3d">
        </div>
        <div id="player" data-scroll data-scroll-speed="1" data-scroll-direction="vertical">
            <h2>
                Reliance
            </h2>
            <div id="track" data-scroll data-scroll-speed="1" data-scroll-direction="horizontal">
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
                                <input type="range" min="0" max="1" step="0.01" id="album_volume_slider" @change="updateVolume()" @input="updateVolume()">
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
            track_duration: 0,
            volume: 0.1
        }
    },
    methods: {
        newTrack (track) {
            let content = document.getElementById('content')
            content.style.top = "-100px"
            content.style.opacity = "0"

            let audio_player = document.getElementById('audio_player')
            audio_player.style.overflow = "hidden"


            setTimeout(() => {   
                this.audio_player_data.track = track.name

                this.player.src = require(`../assets/audio/${track.url}`)

                this.playerMuted = false
                this.playerPaused = false
                this.pause_icon = require('../assets/icon/pause-24px.svg')
                this.mute_icon = require('../assets/icon/volume_up-24px.svg')
                this.player.play()
                this.player.muted = false
                
                content.style.top = "0px"
                content.style.opacity = "1"

                setTimeout(() => {
                    audio_player.style.overflow = "visible"
                }, 400)
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
        },
        updateVolume() {      
            console.log('album_volume_slider', document.getElementById('album_volume_slider').value)      
            this.player.volume = document.getElementById('album_volume_slider').value
        },
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
        })

        document.getElementById('album_volume_slider').value = this.volume
        this.player.volume = this.volume
    }
}
</script>

<style lang="scss" scoped>
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
    height: 120vh;
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
    cursor: pointer;
}
#track p:hover
{
    transition-duration: 400ms;
    transform: translate(20px, 0px);
}
#track p:active
{
    transition-duration: 50ms;
    transform: translate(15px, 0px);
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
#player_body p
{
    margin: 10px;
}
#mute_button
{
    display: flex;
    align-items: center;
    padding-right: 10px;
    padding-left: 10px;
    cursor: pointer;
}
#volume_container
{    
    position: absolute;
    width: 30px;
    height: 120px;

    display: flex;
    justify-content: space-around;
    transition-duration: 300ms;
    transform: translate(-5px);
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
#volume_container input
{
    position: absolute;
    width: 5px;
    height: 80px;
    opacity: 0;    
    transition-duration: 300ms;
    //overflow: hidden;
    
    -webkit-appearance: slider-vertical; 
    
    &:focus {
        outline: none;
    }
    &::-webkit-slider-runnable-track {
        width: 5px;
        height: 80px;
        cursor: pointer;
        background-color: #1a1a1a;
    }
    &::-moz-range-track {
        width: 10px;
        height: 80px;
        cursor: pointer;
        background-color: #1a1a1a;
    }
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 0px;
        cursor: pointer;
        box-shadow: 0px 500px 0px 500px #ffffff;
        transform: translate(-10px, 0);
    }
    &::-moz-range-thumb{
        -webkit-appearance: none;
        height: 0px;
        cursor: pointer;
        box-shadow: 0px 500px 0px 500px #ffffff;
        transform: translate(-10px, 0);
    }
    &::-moz-focus-outer {
        border: 0;
        }
}
#mute_button:hover #volume_container
{
    transition-duration: 300ms;
    transform: translate(-5px, -60px);
}
#mute_button:hover #volume_container input
{
    opacity: 1;
    transition-duration: 300ms;
}
#pause_button
{
    padding-right: 10px;
    padding-left: 10px;
    transition-duration: 300ms;
    cursor: pointer;
}
#pause_button:hover
{
    transform: scale(1.2);
    transition-duration: 300ms;
}

input[type=range]
{
    transition-duration: 400ms;
    -webkit-appearance: none;
    width: 120px;
    height: 5px;
    overflow: hidden;
    
    &:focus {
        outline: none;
    }
    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        background-color: #1a1a1a;
    }
    &::-moz-range-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        background-color: #1a1a1a;
    }
    &::-webkit-slider-thumb {
        width: 0px;
        background: rgba(255,255,255,1);
        cursor: pointer;
        -webkit-appearance: none;
        box-shadow: -500px 0 0 500px #ffffff;
    }
    &::-moz-range-thumb{
        width: 0px;
        background: rgba(255,255,255,1);
        cursor: pointer;
        -webkit-appearance: none;
        box-shadow: -500px 0 0 500px #ffffff;
    }
    &::-moz-focus-outer {
        border: 0;
        }
}
</style>
