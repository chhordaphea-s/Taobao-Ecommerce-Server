const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(express.json());

require("./src/config/index")()
require("./src/config/session")(app)



app.use(cors({
    // origin: 'http://localhost:8080',
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(bodyParser.urlencoded({ extended:true }));
// app.use(bodyParser.json());
app.use("/uploads",express.static('uploads'));

app.use(require("./src/route/index"))

const port = process.env.port || 30002
app.listen(port, () => {
    console.log(`This server run on port: ${port}`);
})