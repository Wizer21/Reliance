<template>
    <div id="main">
        <video id="video_container">
            <source src="../assets/video/lucid.webm" type="video/webm">
        </video>
        <div id="screen_filter">
        </div>      
        <div id="controller">
            <p id="state1">
                P
            </p>
            <div id="state2">
                <button @click="togglePause" id="pause_button">
                    ||
                </button>        
                <input type="range" min="1" max="100" value="10" id="volume_slider" @change="sliderUpdate()" @input="sliderUpdate()"> 
            </div>   
        </div>  
        <h1 class="glitch" data-text="Reliance">
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
                videoRunning: true
            }
        },
        mounted() {
            let vid = document.getElementById("video_container")
            vid.volume = 0.1

            // Bind animaitions
            let glitch = document.getElementsByClassName('glitch')[0]
            glitch.style.setProperty('--glitch-skew', this.$style["glitch-skew"])
            glitch.style.setProperty('--glitch-anim', this.$style["glitch-anim"])
            glitch.style.setProperty('--glitch-anim2', this.$style["glitch-anim2"])
        },
        methods: {
            sliderUpdate() {
                document.getElementById("video_container").volume = document.getElementById('volume_slider').value / 100
            },
            togglePause() {
                if (this.videoRunning){
                    this.videoRunning = false
                    document.getElementById("video_container").pause()
                    document.getElementById('pause_button').textContent  = ">"
                }
                else{
                    this.videoRunning = true
                    document.getElementById("video_container").play()
                    document.getElementById('pause_button').textContent  = "||"
                }
                console.log('coucou')

            }

        },
    }
</script>

<style lang="scss" scoped>
#main
{
    height: 100vh;
    width: 100vw;    

    display: flex;
    align-items: center;
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
    width: 200px;

    overflow: hidden;
}
#state1
{    
    position: relative;
	color: white;
	font-size: 2em;
    text-align: center;

    padding-left: 10px;
    margin: 0px;

    transition-duration: 200ms;
    border: 0px solid transparent;
    border-left: 1px solid white;
}
#state2
{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-around;
    
    left: -180px;
    width: 180px;

    border-bottom: 1px solid white;
    transition-duration: 200ms;
}
#state2 button
{    
    position: relative;
    font-size: 1.7em;
    border: 0px solid transparent;
    color: white;
    background-color: transparent;
    outline: none;
    text-align: center;
    transition-duration: 200ms;
    margin-bottom: 4px;
}
#controller:hover #state1
{
    transform: translate(0px, 40px);
}
#controller:hover #state2
{
    transition-delay: 200ms;
    transition-duration: 200ms;
    transform: translate(180px, 0px);
}
#state2 button:hover
{
    transition-duration: 200ms;
    transform: translate(-3px);
}
#volume_slider
{
    transition-duration: 400ms;
    -webkit-appearance: none;
    width: 120px;
    
    &:focus {
        outline: none;
    }
    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 2px;
        cursor: pointer;
        background: #ffffff;
        border: 0px solid transparent;
        transition-duration: 200ms;
    }
    &::-moz-range-track {
        width: 100%;
        height: 2px;
        cursor: pointer;
        background: #ffffff;
        border: 0px solid transparent;
        transition-duration: 200ms;
    }
    &::-webkit-slider-thumb {
        border: 0px solid transparent;
        height: 22px;
        width: 12px;
        border-radius: 22px;
        background: rgba(255,255,255,1);
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -10px;
    }
    &::-moz-range-thumb{
        box-shadow: none;
        border: 0px solid transparent;
        height: 22px;
        width: 12px;
        border-radius: 22px;
        background: rgba(255,255,255,1);
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -10px;
    }
    &::-moz-focus-outer {
        border: 0;
        }
}
#volume_slider:hover
{    
    &::-webkit-slider-runnable-track {
        height: 3px;
        transition-duration: 200ms;
    }
    &::-moz-range-track {
        height: 3px;
        transition-duration: 200ms;
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
.glitch {  
	position: absolute;
	color: white;
	font-size: 8em;
	letter-spacing: .5em;
    text-align: center;
    width: 100%;
    z-index: 2;

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