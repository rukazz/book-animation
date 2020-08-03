<template>
	<div id="container">
		<div id="box" class="bg">
			<div id="content">
				<div class="loading"></div>
			</div>
		</div>
	</div>
</template>

<script>
import wx from "weixin-js-sdk";
import config from "../config.js";
import util from "../util.js";
import api from "../api.js";

const isLocalhost = ["127.0.0.1", "localhost"].includes(location.hostname);
const isLocalIp = location.hostname.startsWith("192.168");
const isWeixin = util.isWeixin();

export default {
	data() {
		return {
			errorShow: false
		};
	},
	mounted() {
		if (isWeixin && !isLocalIp) this.oauth();
		else this.authed();
	},
	methods: {
		reload() {
			location.reload();
		},
		authed() {
			this.$emit("authed");
		},
		// 微信授权
		oauth() {
			console.log("oauth");
			if (isLocalhost) {
				let res = {
					nickname: "伟",
					sex: 1,
					language: "zh_CN",
					city: "",
					province: "",
					country: "中国",
					headimgurl:
						"http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq1ZC6lKYqrPbE0f91iassW2aPmDc0S2AUxyZtiawcrdFNvt77ibVr3MHsyRyIdGXoxkJ7xw77ze1IcA/132",
					privilege: [],
					token:
						"1d257c6a8d954503d8710be1591f6a73b3cxcXF2Ny1MQVY1OUVWclhXVGhMaWJJMTVCaw=="
				};
				util.Storage("user", res);
				this.jsticket();
				return;
			}
			const user = util.Storage("user") || {};
			const code = util.query("code");
			let state = util.query("state");

			if (!user.nickname && !user.headimgurl && code === null) {
				console.log(1);
				util.Storage("redirectUrl", location.href);
				console.log("redirectUrl", location.href);
				if (!state) {
					state = encodeURI(util.query("state"));
					if (state == "null") {
						state = "";
					}
				}
				const redirectUri = encodeURIComponent(location.href);
				const wxOauth = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appId}&redirect_uri=${redirectUri}&response_type=code&scope=${config.scope}&state=${state}#wechat_redirect`;
				location.href = wxOauth;
				return;
			} else if (user.nickname || user.headimgurl) {
				console.log(2);
				this.jsticket();
			} else {
				console.log(3);
				api
					.oauth(code, state)
					.then(res => {
						const data = res.data;
						console.log("oauth");
						console.log(`data: ${typeof data}`);
						util.Storage("user", data);
						const redirectUrl = util.Storage("redirectUrl");
						window.history.replaceState({}, document.title, redirectUrl);
						location.href = redirectUrl;
						this.jsticket();
					})
					.catch(err => {
						console.log(err);
						console.log("授权过期，请关闭页面后重新打开");
						this.errorShow = true;
					});
			}
		},
		// js授权
		jsticket() {
			console.log("jsticket");
			const that = this;
			if (isWeixin) {
				api
					.jsticket()
					.then(res => {
						const data = res.data;
						wx.config({
							debug: data.debug,
							appId: data.appId,
							timestamp: data.timestamp,
							nonceStr: data.nonceStr,
							signature: data.signature,
							jsApiList: [
								"onMenuShareTimeline",
								"onMenuShareAppMessage",
								"hideMenuItems",
								"getLocation"
							]
						});
						wx.ready(function() {
							console.log("wx.ready");
							that.signIn();
							wx.hideMenuItems({
								menuList: [
									// "menuItem:copyUrl",
									"menuItem:originPage",
									"menuItem:readMode",
									// "menuItem:openWithQQBrowser",
									// "menuItem:openWithSafari",
									"menuItem:share:email"
								] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
							});
						});
						wx.error(function() {
							console.log("wx.error");
							if (!isLocalhost) {
								// loading.hide();
								that.errorShow = true;
							}
						});
					})
					.catch(err => {
						console.log(err);
						that.errorShow = true;
					});
			} else {
				this.signIn();
			}
		},
		// 注册用户
		signIn() {
			console.log("signIn");
			const iHadSignIn = util.Storage("iHadSignIn") == "1" ? true : false;
			if (iHadSignIn) {
				this.authed();
				return;
			}
			const userInfo = util.Storage("user");
			api.user
				.add({
					nickname: userInfo.nickname,
					avatar: userInfo.headimgurl,
					sex: userInfo.sex,
					from: util.query("ADTAG") || "default"
				})
				.then(res => {
					const body = res.data;
					if (body.code == 200) {
						util.Storage("iHadSignIn", "1");
						this.authed();
					}
				})
				.catch(err => {
					console.log(err);
					this.errorShow = true;
				});
		}
	},
	beforeDestroy() {}
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
		@include bgImg-width-cdnPath("../../public/img/bg.jpg");
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

			$size: 2vw;
			$color: rgba(255, 255, 255, 0.3);

			.loading {
				width: $size;
				height: $size;
				position: relative;
				animation-name: loading_ani;
				animation-iteration-count: infinite;
				animation-duration: 1s;
				animation-timing-function: linear;

				&::after,
				&::before {
					content: "";
					display: inline-block;
					width: $size;
					height: $size;
					border-radius: 50%;
					background: $color;
					position: absolute;
				}

				&::before {
					left: 2vw;
				}
				&::after {
					left: -2vw;
				}

				@keyframes loading_ani {
					from {
						transform: rotate(0);
					}

					to {
						transform: rotate(360deg);
					}
				}
			}
		}
	}
}
</style>
