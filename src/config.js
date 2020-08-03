const authPublicAccount = "syz"; // syz gll
const Source =
	(process.env.VUE_APP_TYPE == "business" && "business") ||
	(process.env.VUE_APP_TYPE == "one" && "one") ||
	"";
const cdn =
	(Source == "business" &&
		"https://gailvlun-1255938799.file.myqcloud.com/h5/LoveTheWorld_b/") ||
	(Source == "one" &&
		"https://gailvlun-1255938799.file.myqcloud.com/h5/LoveTheWorld_one/") ||
	"https://gailvlun-1255938799.file.myqcloud.com/h5/LoveTheWorld/";

const config = {
	activity: "LoveTheWorld_vue",
	tuiLink: "https://mp.weixin.qq.com/s/K0M-CKLWlx4u26i8Z9Ufag",
	cdnLink: process.env.NODE_ENV === "production" ? cdn : "/",
	authPublicAccount: authPublicAccount,
	appId:
		authPublicAccount == "syz" ? "wx1106b11c2889aba8" : "wxb2eed828ba8d2813",
	scope: "snsapi_userinfo", // snsapi_base
	testModel: false,
	shareText: {
		title: "为什么我还想爱这个世界",
		desc: "√",
		icon: `${cdn}share.jpg?v=1`
	},
	appLink: `${location.origin}/wxh5/LoveTheWorld/`,
	gllAPPLink: "https://a.app.qq.com/o/simple.jsp?pkgname=cn.gailvlun.gll",
	Source: "one" || Source
};

export default config;
