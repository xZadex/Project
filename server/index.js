const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors(
    {
        origin: ["https://steame.vercel.app"],
        methods:["POST", "GET"],
        credentials: true
    }
));

app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello again SteaME!");
});

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})