<template>
    <div>
        <span id="cursor_header">
            
        </span>
        <video id="video_container">
            <source src="../assets/video/lucid.webm" type="video/webm">
        </video>
        <div id="screen_filter">
        </div>      
        <div id="controller">
            <div @click="togglePause" class="control_button">
                <img :src="pause_icon" alt="P">
            </div>   
            <div @click="toggleMute" class="control_button">
                <img :src="mute_icon" alt="M">
            </div>            
            <input type="range" min="0" max="0.1" step="0.001" id="volume_slider" @change="sliderUpdate()" @input="sliderUpdate()"> 
        </div>  
        <h1 id="glitch" data-text="Reliance">
                Reliance
        </h1>
        <span class="sub">EFFECT</span>
    </div>
</template>

<script>
export default {
        name: 'Hero',
        data() {
            return {
                videoRunning: true,
                videoMute: false,
                volume: 0.02,
                mouse_in: true,
                mute_icon: require('../assets/icon/volume_up-24px.svg'),
                pause_icon: require('../assets/icon/pause-24px.svg')
            }
        },
        methods: {
            sliderUpdate() {
                this.volume = document.getElementById('volume_slider').value
                document.getElementById("video_container").volume = this.volume
            },            
            toggleMute() {
                if (this.videoMute){
                    this.videoMute = false
                    document.getElementById("video_container").muted = false
                    this.mute_icon = require('../assets/icon/volume_up-24px.svg')
                }
                else{
                    this.videoMute = true
                    document.getElementById("video_container").muted = true
                    this.mute_icon = require('../assets/icon/volume_off-24px.svg')
                }
            },
            togglePause() {
                if (this.videoRunning){
                    this.videoRunning = false
                    document.getElementById("video_container").pause()
                    this.pause_icon = require('../assets/icon/play_arrow-24px.svg')
                }
                else{
                    this.videoRunning = true
                    document.getElementById("video_container").play()
                    this.pause_icon = require('../assets/icon/pause-24px.svg')
                }
            },
            startAudio(){
                setTimeout(() => {
                    const video = document.getElementById("video_container")
                    video.volume += 0.005
                    
                    if (this.volume > video.volume && this.mouse_in) {
                        this.startAudio()
                    }
                }, 250)               
            },
            cutAudio(){
               setTimeout(() => {
                    const video = document.getElementById("video_container")
                    video.volume -= 0.002

                    if(video.volume < 0.002) {
                        video.volume = parseInt(0)
                    }
                    else if (video.volume > 0 && !this.mouse_in) {
                        this.cutAudio()
                    }
                }, 100) 
            }
        },
        mounted() { 
            document.getElementById("video_container").volume = 0

            // Bind animaitions
            let glitch = document.getElementById('glitch')
            glitch.style.setProperty('--glitch-skew', this.$style["glitch-skew"])
            glitch.style.setProperty('--glitch-anim', this.$style["glitch-anim"])
            glitch.style.setProperty('--glitch-anim2', this.$style["glitch-anim2"])
            
            const hero = document.getElementById('hero')
            hero.addEventListener('mouseenter', () => {
                this.mouse_in = true
                cursor_header.style.opacity = 1
                this.startAudio()
            })
            hero.addEventListener('mouseleave', () =>{
                this.mouse_in = false
                cursor_header.style.opacity = 0
                this.cutAudio()
            })        
            
            let cursor_header = document.getElementById('cursor_header')
            hero.addEventListener('mousemove', event => {
                cursor_header.style.top = `${event.offsetY - 10}px`
                cursor_header.style.left = `${event.offsetX - 10}px`
            })    
            hero.addEventListener('wheel', event => {
                cursor_header.style.top = `${event.offsetY - 10}px`
                cursor_header.style.left = `${event.offsetX - 10}px`
            })
            
            let controller = document.getElementById('controller')
            controller.addEventListener('mouseenter', () => {
                cursor_header.style.opacity = 0
            })
            controller.addEventListener('mouseleave', () =>{
                cursor_header.style.opacity = 1
            })        

            //document.getElementById("video_container").play()
            this.startAudio()
            document.getElementById('volume_slider').value = this.volume
        }
    }
</script>

<style lang="scss" scoped>
#hero
{
    height: 100vh;
    width: 100vw;    

    display: flex;
    align-items: center;
    cursor: none;
}
#video_container
{
    position: absolute;
    top: 0px;
    left: 0px;
    
    height: 100vh;
    width: 100vw;    

    object-fit: cover;
}
#controller
{	
    position: relative;
    display: flex;
    align-items: center;

    margin: 2em;
    margin-top: auto;
    margin-right: auto;

    z-index: 3;
    height: 40px;
    width: 44px;

    overflow: hidden;
    transition-duration: 400ms;
    border-bottom: 1px solid white;
}
.control_button
{    
    position: relative;
    font-size: 1.7em;
    border: 0px solid transparent;
    color: white;
    background-color: transparent;
    outline: none;
    text-align: center;
    transition-duration: 400ms;
    cursor: pointer;
    
    margin: 10px;
}
#controller:hover
{
    width: 300px;
    transition-duration: 400ms;
    border-bottom-color: transparent;
}
.control_button:hover
{
    transition-duration: 200ms;
    transform: translate(-3px);
}
#volume_slider
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
// Glitch Animation
@mixin glitchCopy { 
		content: attr(data-text);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
} 
.sub {
	color: rgb(100,220,220);
	letter-spacing: 1em;
}
#glitch {  
	position: absolute;
	color: white;
	font-size: 8vw;
	letter-spacing: .5em;
    text-align: center;
    width: 100%;
    z-index: 2;
    pointer-events: none;

	animation: var(--glitch-skew) 1s infinite linear alternate-reverse;

	&::before{
		@include glitchCopy;
		left: 2px;
		text-shadow: -2px 0 #ff00c1;
		clip: rect(44px, 450px, 56px, 0);
		animation: var(--glitch-anim) 5s infinite linear alternate-reverse;
	}

	&::after {
		@include glitchCopy;
		left: -2px;
		text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
		animation: var(--glitch-anim2) 1s infinite linear alternate-reverse;
	}
}

#screen_filter
{  
    position: absolute;
    top: 0px;
    left: 0px;
    
    height: 100vh;
    width: 100vw;    

    object-fit: cover;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
    pointer-events: none;

    
}
#cursor_header
{
    position: absolute;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: white;
    z-index: 5;
    mix-blend-mode: difference;
    pointer-events: none;
}
</style>

<style lang="scss" module>
@keyframes glitch-anim {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i*(1/$steps))} {
      clip: rect(random(100)+px, 9999px, random(100)+px, 0);
			transform: skew((random(100) / 100) + deg);
    }
  }
}

@keyframes glitch-anim2 {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i*(1/$steps))} {
      clip: rect(random(100)+px, 9999px, random(100)+px, 0);
			transform: skew((random(100) / 100) + deg);
    }
  }
}

@keyframes glitch-skew {
  $steps: 10;
  @for $i from 0 through $steps {
    #{percentage($i*(1/$steps))} {
      transform: skew((random(10) - 5) + deg);
    }
  }
}
</style>