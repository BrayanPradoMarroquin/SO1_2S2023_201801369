const mysql = require('mysql2');
const express = require('express');
const router = express.Router();

module.exports = coneccion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bhepm',
    database: 'monitor',
    port: 33061
});

router.get('/prueba', (req, res) => {
    res.send('Hello World');
});

router.get('/ram', (req, res) => {
    const consulta = 'SELECT data FROM ram ORDER BY id_ram DESC LIMIT 1'; 
    try {
        coneccion.execute(consulta, (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).send({'mensaje': 'Error al obtener los datos'});
            } else {
                res.status(200).send({'mensaje': 'Datos obtenidos correctamente', 'data': JSON.parse(result[0].data)});
            }
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/cpu', (req, res) => {
    const consulta = 'SELECT data FROM cpu ORDER BY id_cpu DESC LIMIT 1'; 
    try {
        coneccion.execute(consulta, (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).send({'mensaje': 'Error al obtener los datos'});
            } else {
                res.status(200).send({'mensaje': 'Datos obtenidos correctamente', 'data': JSON.parse(result[0].data)});
            }
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;