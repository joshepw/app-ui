import CryptoJS from 'crypto-js';

const storage = window.localStorage;
const JSON = window.JSON;

export default class LocalStorageDriver {
	constructor(options) {
		this.authTokenName = options.authTokenName;
		this.secret = options.secret;
	}

	get(key) {
		let value = storage.getItem(key);

		if (/^\{.*\}$/.test(value)) {
			value = JSON.parse(value);
		}

		return value;
	}

	getSecure(key) {
		let value = storage.getItem(key);
		value = CryptoJS.AES.decrypt(value, this.secret);
		value = value.toString(CryptoJS.enc.Utf8);

		if (/^\{.*\}$/.test(value)) {
			value = JSON.parse(value);
		}

		return value;
	}

	set(key, value) {
		if (typeof value === typeof {}) {
			value = JSON.stringify(value);
		}

		return storage.setItem(key, value);
	}

	setSecure(key, value) {
		if (typeof value === typeof {}) {
			value = JSON.stringify(value);
		}

		value = CryptoJS.AES.encrypt(value, this.secret);

		return storage.setItem(key, value.toString());
	}

	remove(key) {
		return storage.removeItem(key);
	}

	getToken() {
		return this.get(this.authTokenName);
	}

	setToken(token) {
		return this.set(this.authTokenName, token);
	}

	clearToken() {
		this.remove(this.authTokenName);
	}
}