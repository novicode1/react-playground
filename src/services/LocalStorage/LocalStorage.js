const LocalStorage = {
	get (name) {
		return JSON.parse(window.localStorage.getItem(name));
	},

	set (name, value) {
		return window.localStorage.setItem(name, JSON.stringify(value));
	},

	remove (name) {
		return window.localStorage.removeItem(name);
	},

	clear () {
		return window.localStorage.clear();
	}
};

export default LocalStorage;