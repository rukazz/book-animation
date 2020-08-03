<template>
  <!-- <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
  <div id="app">
		<Index v-if="ready && viewPage === 'index'"></Index>
		<Auth v-if="!ready && page === 'auth'" v-on:authed="authed"></Auth>
		<Preloading
			v-else-if="!ready && page === 'preloading'"
			v-on:loaded="preloaded"
		></Preloading>
		<BackgroundMusic></BackgroundMusic>
	</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Auth from "./views/Auth.vue";
import Preloading from "./views/Preloading.vue";
import Index from "./views/Index.vue";
import BackgroundMusic from "./components/BackgroundMusic.vue";
import util from "./util";
import config from "./config";

// 首次进入H5的page
const original_page = util.query("page") || "index";
export default {
  // name: 'App',
  // components: {
  //   HelloWorld
  // }
  components: {
		Auth,
		Preloading,
		Index,
		BackgroundMusic
	},
	data() {
		return {
			page: "auth",
			viewPage: "index",
			ready: false,
			opt: {}
		};
	},
	mounted() {
		console.log(original_page);
	},
	methods: {
		authed() {
			console.log("authed");
			this.page = "preloading";
		},
		preloaded() {
			console.log("preloaded");
			this.setDefaultShare();
			this.ready = true;
			this.viewPage = "index";
		},
		eventFromChild(opt) {
			this.viewPage = opt.page;
			this.opt = { ...opt };
			this.setDefaultShare();
		},
		setDefaultShare() {
			util.wxShare({
				title: config.shareText.title,
				desc: config.shareText.desc,
				link: config.appLink,
				imgUrl: config.shareText.icon
			});
		}
	}
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
// 全局样式
// @import "./common/base";
// transition
// @import "./common/transition";

button:active {
	transform: translateY(0.2vw);
}
</style>
