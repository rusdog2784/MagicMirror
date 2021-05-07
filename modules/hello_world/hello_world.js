//hello_world.js:

Module.register("hello_world", {
	// Default module config.
	defaults: {
		text: "Hello World!"
	},

	start: function () {
		console.log("Starting module: " + this.name);
		this.sendSocketNotification("CONFIG", this.config);
	},

	notificationReceived: function (notification, payload) {
		console.log("[hello_world]: Received notification - Payload: ");
		console.log(payload);
	},

	socketNotificationReceived: function (notification, payload) {
		console.log("[hello_world]: Received socket notification - Payload: ");
		console.log(payload.message);
		if (notification === "MESSAGE_RECEIVED") {
			this.config.text = payload.message;
			console.log("[hello_world]: Attempting to update DOM.");
			this.updateDom(750);
		}
	},

	getDom: function () {
		var wrapper = document.createElement("h1");
		wrapper.innerHTML = this.config.text;
		return wrapper;
	}
});
