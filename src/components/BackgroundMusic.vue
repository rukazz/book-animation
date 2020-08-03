<template>
	<div>
		<audio class="bgm" :src="soundLink" loop autoplay ref="bgm"></audio>
		<div class="control" :class="{ playing: isPlaying }" @click="toggle">
			<span class="icon bg"></span>
		</div>
	</div>
</template>

<script>
import config from "../config";
const cdnLink = config.cdnLink;

let bgm = null;

export default {
	data() {
		return {
			isPlaying: false,
			soundLink: `${cdnLink}sound/background-music.mp3?v=1`
		};
	},
	mounted() {
		bgm = this.$refs.bgm;
		bgm.addEventListener("playing", this.onplayHandle);
		bgm.addEventListener("pause", this.onpauseHandle);

		document.addEventListener("DOMContentLoaded", function() {
			bgm.play();
			document.addEventListener(
				"WeixinJSBridgeReady",
				function() {
					bgm.play();
				},
				false
			);
		});

		document.addEventListener("touchstart", this.audioAutoPlay);
	},
	methods: {
		toggle() {
			if (bgm.paused) {
				bgm.play();
			} else {
				bgm.pause();
			}
		},
		audioAutoPlay() {
			bgm.play();
		},
		onplayHandle() {
			console.log("onplayHandle");
			this.isPlaying = true;
			document.removeEventListener("touchstart", this.audioAutoPlay);
		},
		onpauseHandle() {
			console.log("onpauseHandle");
			this.isPlaying = false;
		}
	},
	beforeDestroy() {
		bgm = null;
	}
};
</script>

<style scoped lang="scss">
@import "../common/mixin.scss";

.bgm {
	display: none;
}
.control {
	position: fixed;
	right: 4vw;
	top: 7vw;
	width: 6vw;
	height: 6vw;
	z-index: 100;

	.icon {
		@include bgImg-width-cdnPath("../../public/img/sound_off.png");
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		transition: background-image 200ms ease;
	}
}
.control.playing {
	.icon {
		@include bgImg-width-cdnPath("../../public/img/sound_on.png");
	}

	&::before,
	&::after {
		@include bgImg-width-cdnPath("../../public/img/sound_off.png");
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		content: "";
		display: inline-block;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		right: 0;
		z-index: -1;
		pointer-events: none;
		animation-iteration-count: infinite;
		animation-duration: 3s;
		animation-timing-function: linear;
	}

	&::before {
		animation-name: playing_ani_1;
		@include keyframes(playing_ani_1) {
			from {
				transform: none;
				opacity: 0.8;
			}
			to {
				transform: translate(5vw, -10vw) rotate(25deg) scale(0.7);
				opacity: 0;
			}
		}
	}
	&::after {
		animation-name: playing_ani_2;
		animation-delay: 1.5s;
		@include keyframes(playing_ani_2) {
			from {
				transform: none;
				opacity: 0.8;
			}
			to {
				transform: translate(8vw, -10vw) rotate(-25deg) scale(0.7);
				opacity: 0;
			}
		}
	}
}
</style>
