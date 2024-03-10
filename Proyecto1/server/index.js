const express = require('express');
const cors = require('cors');
const {json} = require('express');

const app = express();

// Settings
app.use(cors());
app.use(json());

app.use(require('./confi/conexion'));

app.listen(4000, () => {
    console.log("Server on port 4000");
});