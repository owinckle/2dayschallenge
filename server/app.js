const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

// Settings
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.listen(port, () => {
	console.log("App listening on port " + port);
});

// App routes
app.get("/app", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.get("/app/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.get("/signup", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Page routes
app.get("/", (req, res) => {
	res.send("test");
});

// Widget
app.get("/widget.js", (req, res) => {
	fs.readFile(path.join(__dirname, "widget.js"), "utf-8", (err, data) => {
		if (err) {
			res.status(500).send("An error occurred while reading the file");
		} else {
			res.set("Content-Type", "application/javascript");
			res.send(data);
		}
	});
});
