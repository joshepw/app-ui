import CryptoJS from 'crypto-js';

const storage = window.localStorage;
const JSON = window.JSON;

export default class LocalStorageDriver {
	constructor(secret) {
		this.secret = secret;
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
}