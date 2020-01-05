const session = window.sessionStorage;
const JSON = window.JSON;

export default class SessionStorageDriver {
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
