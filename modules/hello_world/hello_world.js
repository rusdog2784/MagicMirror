//hello_world.js:

Module.register("hello_world", {
	// Default module config.
	defaults: {
		text: "Hello World!"
	},

	start: function () {
		Log.info("Starting module: " + this.name);
	},

	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("h1");
		wrapper.innerHTML = this.config.text;
		return wrapper;
	}
});
