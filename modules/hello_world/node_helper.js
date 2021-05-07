const NodeHelper = require("node_helper");
const bodyParser = require("body-parser");
const express = require("express");

module.exports = NodeHelper.create({
	start: function () {
		console.log("Starting node helper: " + this.name);
	},

	moduleLoaded: function () {
		console.log("[node_helper]: Module loaded. Setting up API routes.");
		this.createApiRoutes();
	},

	createApiRoutes: function () {
		var self = this;

		this.expressApp.use(bodyParser.urlencoded({ extended: true }));
		this.expressApp.use(bodyParser.json());

		this.expressRouter = express.Router();

		this.expressRouter.use((req, res, next) => {
			next();
		});

		this.expressRouter.route("/message").get((req, res) => {
			const message = req.query.m;
			if (message !== undefined) {
				console.log("GET request to /api/message with message: " + message);
				self.messageReceived(message);
			}
			res.status(200).json({ message: "Ok", data: "You said: " + message });
		});

		this.expressApp.use("/api", this.expressRouter);
	},

	messageReceived: function (message) {
		var self = this;

		console.log("[node_helper]: Attempting to send the MESSAGE_RECEIVED notification.");
		this.sendSocketNotification("MESSAGE_RECEIVED", { message: message });
		console.log("[node_helper]: Did it work?");

		return true;
	},

	socketNotificationReceived: function (notification, payload) {
		console.log("[node_helper]: " + this.name + " received a socket notification: " + notification + " - Payload: ");
		console.log(payload);
		if (notification === "CONFIG") {
			this.config = payload;
			this.moduleLoaded();
		}
	}
});
