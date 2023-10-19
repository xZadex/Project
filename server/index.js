const express = require('express');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello again SteaME!");
});

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})