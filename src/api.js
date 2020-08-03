import axios from "axios";
import util from "./util.js";
import config from "./config.js";

var axiosInstance = axios.create({
	timeout: 2000 * 10
});

axiosInstance.interceptors.request.use(
	config => {
		// 有token就传，有用没用后端根据需求判断
		const user = util.Storage("user");
		user && user.token && (config.headers.token = user.token);
		return config;
	},
	error => Promise.error(error)
);

const api = {
	jsticket() {
		return axiosInstance.get(
			`/wxbackend/${config.authPublicAccount}.php?action=jsticket`
		);
	},
	oauth(code, state) {
		return axiosInstance.get(
			`/wxbackend/${
			config.authPublicAccount
			}.php?action=oauth&code=${code}&state=${state}`
		);
	},
	redirect() {
		return axiosInstance.get(
			`/wxbackend/${config.authPublicAccount}.php?action=redirect`
		);
	},
	user: {
		// 创建用户
		add({
			...data
		}) {
			return axiosInstance.post(
				"/wxbackend/web/reason//index.php?action=user.add", {
					...data
				}
			);
		}
	},
	/**
	answer: {
		// 答题提交
		save({
			...data
		}) {
			return axiosInstance.post(
				"/wxbackend/web/first_meal/index.php?action=choice.add", {
					...data
				}
			);
		}
	} 
	*/
};

export default api;