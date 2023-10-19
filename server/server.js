const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;

app.use(cors(
    {
        origin: ["https://steame.vercel.app"],
        methods:["POST", "GET"],
        credentials: true
    }
));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

require('./routes/steam.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );