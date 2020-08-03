<template>
	<div id="container">
		<div id="box" class="bg">
			<div id="content">
				<div class="text">
					<transition-group
						tag="div"
						class="letters"
						@enter="enterHandle"
						@leave="leaveHandle"
					>
						<span
							v-for="(item, index) in letters"
							:key="'letters' + index"
							:data-index="index"
							>{{ item }}</span
						>
					</transition-group>
					<span class="dot" v-show="processShow">
						<span class="progressText" ref="progressText"></span>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { TweenMax } from "gsap";
import config from "../config.js";
import createjs from 'preload-js';
import util from "../util.js";
const cdnLink = config.cdnLink;

const letters = "世间美好正奔你而来".split("");

const delay = 0.15;
const duration = 2;
const MinLoadingTimeLong = delay * 1000 * letters.length + duration * 1000;
// const MinLoadingTimeLong = 0;

export default {
	data() {
		return {
			letters: "",
			processShow: false,
		};
	},
	mounted() {
		util.loadJS(cdnLink + "lib/preloadjs.min.js", this.loadFiles);
		this.letters = letters;
	},
	methods: {
		loadFiles() {
			console.log("loadFiles");
			let fontUrls = [
				["../public/font/STSongti-SC-Black.min.ttf?v=1", "STSongti-SC-Black"],
				["../public/font/STSongti-SC-Bold.min.ttf?v=2", "STSongti-SC-Bold"],
				[
					"../public/font/STSongti-SC-Regular.min.ttf?v=2",
					"STSongti-SC-Regular",
				],
			];
			fontUrls.forEach((item) => {
				item[0] = item[0].replace("../public/", cdnLink);
			});
			let manifest = [
				{ src: "../public/img/bg.jpg" },
				{ src: "../public/img/final_long.jpg" },
				{ src: "../public/img/left.jpg" },
				{ src: "../public/img/right.jpg" },
				{ src: "../public/img/cover.jpg" },
				{ src: "../public/img/choosed_1.png" },
				{ src: "../public/img/choosed_2.png" },
				{ src: "../public/img/choosed_3.png" },
				{ src: "../public/img/title_bg.png" },
				{ src: "../public/img/qrcode_tui.png" },
				{ src: "../public/img/qrcode_tui_new.png" },
				{ src: "../public/img/qrcode_tui_one.png" },
				{ src: "../public/img/qrcode_tui_business.png" },
				{ src: "../public/img/indexbook.png" },
				{ src: "../public/img/tipCircle.png" },
				{ src: "../public/img/tipLine.png" },
				{ src: "../public/img/touchTip.png" },
				{ src: "../public/img/saveImgTip.png" },
				{ src: "../public/img/sound_on.png" },
				{ src: "../public/img/sound_off.png" },
				{ src: "../public/img/pagePrev.png" },
				{ src: "../public/img/pageNext.png" },
				{ src: "../public/img/backBtn.png" },
			];

			fontUrls.forEach((item) => {
				manifest.push({
					src: item[0],
					loadTimeout: 15000,
				});
			});
			manifest.forEach((item) => {
				item.src = item.src.replace("../public/", cdnLink);
			});

			const that = this;
			// 预加载资源
			// const MinLoadingTimeLong = MinLoadingTimeLong; // loading页至少展示的时间(时间内没有loading完成，继续loading；提前loading完成就等待达到这个时间)
			let loading_start_time = new Date();
			let progressText = that.$refs.progressText;
			const queue = new createjs.LoadQueue(false);
			queue.setMaxConnections(5);
			queue.maintainScriptOrder = true;
			queue.on("complete", handleFileComplete);
			queue.on("progress", function() {
				let word = Math.round(queue.progress * 100) + "%";
				word = word == "100%" ? "" : word;
				if (progressText) progressText.innerText = word;
			});
			queue.loadManifest(manifest);
			function handleFileComplete() {
				fontUrls.forEach(function(item) {
					util.setFont(item);
				});
				let loading_end_time = new Date();
				let loading_time = loading_end_time - loading_start_time;
				if (loading_time >= MinLoadingTimeLong) {
					that.filesLoaded();
				} else {
					setTimeout(function() {
						that.filesLoaded();
					}, MinLoadingTimeLong - loading_time);
				}
			}
		},
		filesLoaded() {
			console.log("filesLoaded");
			this.$emit("loaded");
		},
		enterHandle(el, done) {
			let index = el.getAttribute("data-index");
			TweenMax.from(el, duration, {
				delay: index * delay,
				y: "-40vh",
				opacity: 0,
				rotationZ: util.random(-720, 720),
				rotationX: util.random(-720, 720),
				rotationY: util.random(-180, 180),
				scale: util.random(10, 30) / 10,
				onComplete: () => {
					done();
					if (index == this.letters.length - 1) this.processShow = true;
				},
			});
		},
		leaveHandle(el, done) {
			done();
		},
	},
	beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
@import "../common/mixin.scss";

#container {
	height: 100vh;
	width: 100vw;
	position: fixed;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	transform-style: preserve-3d;
	-webkit-overflow-scrolling: touch;
	overflow-x: hidden;
	overflow-y: auto;

	#box {
		@include bgImg-width-cdnPath("../public/img/bg.jpg");
		background-size: cover;
		background-color: rgba(50, 52, 61, 1);
		height: 100vh;
		max-height: 200vw;
		width: 100vw;
		min-height: 160vw;
		position: relative;

		#content {
			height: 160vw;
			width: 100%;
			position: absolute;
			z-index: 1;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.text {
				font-size: 4.4vw;
				color: #fff;
				line-height: 6.13vw;
				white-space: nowrap;
				font-family: STSongti-SC-Bold, STSongti-SC;

				.letters {
					display: inline-block;

					span {
						display: inline-block;
						margin: 0 0.3vw;
					}
				}

				.dot::after {
					position: absolute;
					overflow: hidden;
					animation: ellipsis 1s infinite;
					text-align: left;
					content: "…";
					font-family: STSongti-SC-Bold, STSongti-SC;
				}
				@keyframes ellipsis {
					from {
						width: 0;
					}

					to {
						width: 4.5vw;
					}
				}
			}
		}
	}
}
</style>
