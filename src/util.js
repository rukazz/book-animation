import config from "./config";
import wx from "weixin-js-sdk";

export default {
	Storage: (key, value) => {
		if (value === undefined) {
			var result = "";
			try {
				result = JSON.parse(
					window.localStorage.getItem(config.activity + "_" + key) ||
					JSON.stringify("")
				);
			} catch (error) {
				console.log(error)
			}
			return result;
		}
		window.localStorage.setItem(
			config.activity + "_" + key,
			JSON.stringify(value)
		);
	},
	sessionStorage: (key, value) => {
		if (value === undefined) {
			var result = "";
			try {
				result = JSON.parse(
					window.sessionStorage.getItem(config.activity + "_" + key) ||
					JSON.stringify("")
				);
			} catch (error) {
				console.log(error)
			}
			return result;
		}
		window.sessionStorage.setItem(
			config.activity + "_" + key,
			JSON.stringify(value)
		);
	},
	query: name => {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURI(r[2]);
		return null;
	},
	isWeixin: () => {
		var ua = navigator.userAgent.toLowerCase();
		return ua.indexOf("micromessenger") != -1;
	},
	// IOS
	isIos: () => {
		var n = navigator.userAgent.toLowerCase();
		return !!n.match(/(\(i[^;]+;( U;)? CPU.+Mac OS X)|iPhone|iPad|iPod|iOS/i);
	},
	toTui: () => {
		var tuiLink = config.tuiLink;
		try {
			location.replace(tuiLink);
		} catch (error) {
			console.log(error)
		}
		location.href = tuiLink;
	},
	setFont(font) {
		var newStyle = document.createElement("style");
		newStyle.appendChild(
			document.createTextNode(
				"\
  @font-face {\
    font-family: " +
				font[1] +
				";\
    src: url('" +
				font[0] +
				"');\
  }\
  "
			)
		);
		document.head.appendChild(newStyle);
	},
	// 随机数
	random(min, max) {
		switch (arguments.length) {
			case 1:
				return parseInt(Math.random() * min + 1, 10);
			case 2:
				return parseInt(Math.random() * (max - min + 1) + min, 10);
			default:
				return 0;
		}
	},
	wxShare: function (data) {
		data = data || {};
		var addQuery = function (url, key, val) {
			var _url = "";
			var hashHash = url.split("#")[1] ? true : false;
			var hashKey = false;
			var a = url.split("#")[0].split("?")[1];
			var b = key + "=" + val;
			var c = a ? a + "&" + b : "?" + b;

			var a_arr = a ? a.split("&") : [];
			for (var i = 0; i < a_arr.length; i++) {
				var k = a_arr[i].split("=")[0];
				var v = a_arr[i].split("=")[1];
				if (k == key) {
					a_arr[i] = k + "=" + val;
					hashKey = true;
					_url = url.replace(k + "=" + v, a_arr[i]);
					break;
				}
			}
			if (hashKey) {
				return _url;
			}
			_url = a ?
				url.replace(a, c) :
				hashHash ?
				url.split("#")[0] + c + "#" + url.split("#")[1] :
				url.split("#")[0] + c;
			_url = _url.replace("??", "?");
			return _url;
		};
		data = {
			title: data.title,
			desc: data.desc,
			link: data.link,
			success: data.success || function () {},
			imgUrl: data.imgUrl || null
		};
		var goShare = function () {
			wx.onMenuShareTimeline({
				title: data.title,
				link: addQuery(data.link, "ADTAG", "tx.wx.pyq"),
				success: function (res) {
					typeof window.MtaH5 != "undefined" && window.MtaH5.clickShare("wechat_moments");
					data.success(res);
				},
				imgUrl: data.imgUrl
			});
			wx.onMenuShareAppMessage({
				title: data.title,
				desc: data.desc,
				link: addQuery(data.link, "ADTAG", "tx.wx.py"),
				success: function (res) {
					typeof window.MtaH5 != "undefined" && window.MtaH5.clickShare("wechat_friend");
					data.success(res);
				},
				imgUrl: data.imgUrl
			});
		};
		goShare();
		wx.ready(goShare);
	},
	pay(data, fun) {
		var obj = {
			timestamp: "" + data.time_start, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
			nonceStr: data.nonce_str, // 支付签名随机串，不长于 32 位
			package: "prepay_id=" + data.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
			signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5' HMAC-SHA256
			paySign: data.sign, // 支付签名
			success: function (response) {
				// 支付成功后的回调函数
				console.log("支付后回调函数");
				console.log(response);
				typeof fun == "function" && fun("success");
			},
			fail: function (response) {
				//接口调用失败时执行的回调函数。
				console.log("支付 fail 回调函数");
				console.log(response);
				typeof fun == "function" && fun("fail");
			},
			complete: function (response) {
				response
				//接口调用完成时执行的回调函数，无论成功或失败都会执行。
			},
			cancel: function (response) {
				//用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。
				console.log("支付 cancel 回调函数");
				console.log(response);
				typeof fun == "function" && fun("cancel");
			}
		};
		wx.chooseWXPay(obj);
	},
	// 节流函数
	throttle(func, wait, options) {
		/* options的默认值
		 *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
		 *  options.leading = true;
		 * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
		 *  options.trailing = true;
		 * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
		 */
		var context, args, result;
		var timeout = null;
		var previous = 0;
		if (!options) options = {};
		var later = function () {
			previous = options.leading === false ? 0 : new Date();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};
		return function () {
			var now = new Date();
			if (!previous && options.leading === false) previous = now;
			// 计算剩余时间
			var remaining = wait - (now - previous);
			context = this;
			args = arguments;
			// 当到达wait指定的时间间隔，则调用func函数
			// 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
			if (remaining <= 0 || remaining > wait) {
				// 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			} else if (!timeout && options.trailing !== false) {
				// options.trailing=true时，延时执行func函数
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	},
	// 删除str左右两端的空格
	trim(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	},
	toFixed(num, len) {
		return parseFloat(num.toFixed(len));
	},
	loadImg(src, callback) {
		let img = new Image();
		img.onload = function () {
			typeof callback == "function" && callback();
		}
		img.onerror = function (err) {
			typeof callback == "function" && callback(err);
		}
		img.src = src;
	},
	loadJS(src, callback) {
		let js = document.createElement("script");
		js.onload = function () {
			typeof callback == "function" && callback();
		}
		js.onerror = function (err) {
			typeof callback == "function" && callback(err);
		}
		js.src = src;
		document.body.appendChild(js);
	},
	getLocation(callback, ifAlert) {
		wx.getLocation({
			type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			success: function (res) {
				/**
				var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
				var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
				var speed = res.speed; // 速度，以米/每秒计
				var accuracy = res.accuracy; // 位置精度
				 */
				typeof callback == "function" && callback(res, ifAlert);
			},
			cancel: function () {
				// 用户拒绝授权获取地理位置
				typeof callback == "function" && callback("cancel", ifAlert);
			},
			fail: function (err) {
				console.log(err);
				// 未开启定位功能
				typeof callback == "function" && callback("fail", ifAlert);
			}
		});
	},
	getCountIncludes(longstr, shortstr) {
		const reg = new RegExp(shortstr, 'g');
		const result = longstr.match(reg);
		return result ? result.length : 0;
	}
};