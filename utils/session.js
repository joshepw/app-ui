const session = window.sessionStorage;
const JSON = window.JSON;

class SessionStorageService {
	get(name) {
		let value = session.getItem(name);

		if (/^\{.*\}$/.test(value)) {
			value = JSON.parse(value);
		}

		return value;
	}

	set(name, value) {
		if (typeof value === typeof {}) {
			value = JSON.stringify(value);
		}

		return session.setItem(name, value);
	}

	remove(name) {
		return session.removeItem(name)
	}
}

export default {
	install(Vue) {
		Vue.prototype.session = Vue.session = new SessionStorageService();
	}
}