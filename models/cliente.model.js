const mysql = require("mysql2");
const dbConfig = require("../config/db.config").CLIENTES_DB;
const crypto = require("crypto");


// Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// Open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the clientes database.");
});

// Cliente model
const Cliente = function(cliente) {
    this.mail = cliente.mail;
    this.clave = cliente.clave;
};

Cliente.findByEmail = (mail, result) => {
    connection.query(`SELECT * FROM clientes WHERE mail = ?`, [mail], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found cliente: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

module.exports = Cliente;
