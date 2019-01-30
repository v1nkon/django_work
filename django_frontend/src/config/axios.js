import axios from "axios";
// import qs from "qs";
import { Message } from "element-ui";

// import { baseUrl } from "./env";

import router from "../router";
import store from "../store";
export default async (url = "", data = {}, type = "GET") => {
	// let headers = {
	// 	headers: {
	// 		"Content-Type": "multipart/form-data"
	// 	}
	// };
	// return axios.post( url, data, headers )
	type = type.toUpperCase();
	let requestConfig = {
		url,
		method: type,
		// transfromRequest: [
		//     data => data
		// ],
		// headers: {
		//     'X-Requested-With': 'XMLHttpRequest',
		//     'TOKEN': sessionStorage.getItem('TOKEN')
		// },
		params: {},
		withCredentials: true,
		data: {},
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
			// 'Content-Type': 'multipart/form-data;',
			// 'Content-Type': 'application/json;charset=UTF-8',
		},
		responseType: "json",
		xsrfHeaderName: ""
	};
	if (type == "GET") {
		Object.assign(requestConfig.params, data);
	}
	if (type == "POST" || type == "PUT" || type == "PATCH") {
		requestConfig.headers = {
			"Content-Type": "multipart/form-data"
		};
		requestConfig.data = data;
		// requestConfig.data = qs.stringify(data)
		// Object.assign(requestConfig.data, data)
	}

	const instance = axios.create(requestConfig);
	instance.interceptors.request.use(
		config => {
			return config;
		},
		err => {
			Message.error({
				message: "请求超时"
			});
			return Promise.resolve(err);
		}
	);

	instance.interceptors.response.use(
		data => {
			let response = data.data;
			let { status, msg } = response;
			if (status != 200) {
				Message.error({
					message: msg
				});
				response.isError = true;
			}
			if (status == 1000 || status == 1001) {
				Message.error({
					message: msg
				});
				response.isError = true;
				sessionStorage.removeItem("TOKEN");
				store.commit("setMenusHasFinished", false);

				let historyRouter = sessionStorage.getItem("historyRouter");
				if (!historyRouter) {
					sessionStorage.setItem(
						"historyRouter",
						router.history.current.path
					);
				}
				router.push({ path: "/login" });
			}
			return response;
		},
		err => {
			Message.error({
				message: err
			});
			return Promise.reject(err);
		}
	);
	let response = await instance();

	return response;
};
