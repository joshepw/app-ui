import axios from 'axios';
const storage = window.localStorage;

export default {
	instal(Vue, options) {
		const httpInstance = axios.create(options.http);

		httpInstance.interceptors.request.use((config) => {
			const accessToken = storage.getItem(options.authTokenName) || undefined;

			if(typeof accessToken != 'undefined') {
				config.headers['Authorization'] = 'Bearer ' + accessToken;
			}

			if(typeof config.data === 'object' && options.http.formData) {
				const formData = new FormData();
				Object.keys(config.data).forEach(key => formData.append(key, config.data[key]));
				config.data = formData;

				config.headers['Content-Type'] = 'multipart/form-data';
			}

			return config;
		}, function (error) {
			return Promise.reject(error);
		});

		httpInstance.interceptors.response.use((response) => {
			return response;
		}, function (error) {
			if(typeof error.response.headers['X-Toast-Message'] != 'undefined') {
				if(typeof Vue.toast != 'undefined') {
					Vue.toast.open({
						message: error.response.headers['X-Toast-Message'],
						type: error.response.headers['X-Toast-Message-Type'] || 'danger'
					});
				}
			}

			return Promise.reject(error);
		});

		Vue.prototype.http = Vue.http = httpInstance;
	}
};