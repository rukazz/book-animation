<template>
	<transition name="fade">
		<div class="toastBox" v-if="closed == false" :style="{ zIndex: zIndex }">
			<transition name="slideTop">
				<div class="toast" v-if="toastShow">
					{{ message }}
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
// 默认显示时长
const duration = 1500;
const zIndexBase = 1000;

export default {
	data() {
		return {
			message: "",
			closed: true,
			toastShow: false,
			index: 0
		};
	},
	mounted() {
		this.startTimer();
	},
	computed: {
		zIndex() {
			return zIndexBase + this.index;
		}
	},
	methods: {
		startTimer() {
			this.show();
			setTimeout(this.close, duration);
		},
		show() {
			this.closed = false;
			this.toastShow = true;
		},
		close() {
			this.toastShow = false;
			setTimeout(() => {
				this.closed = true;
			}, 200);
		}
	}
};
</script>

<style lang="scss" scoped>
.toastBox {
	position: fixed;
	background: rgba(15, 19, 22, 0.2);
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}

.toast {
	text-align: center;
	max-width: 80%;
	font-size: 4.53vw;
	font-family: STSongti-SC-Bold;
	color: rgba(255, 255, 255, 1);
	font-weight: bold;
	line-height: 6.27vw;
	padding: 2.6vw 5.2vw;
	background-color: rgba(50, 52, 61, 0.9);
	box-shadow: 0vw 0.27vw 0.93vw 0vw rgba(0, 0, 0, 0.4);
	border-radius: 5.87vw;
}
</style>
