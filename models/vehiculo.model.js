const mysql = require("mysql2");
const dbConfig = require("../config/db.config").DATA_DB;

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
    console.log("Successfully connected to the data database.");
});

// Vehicle model
const Vehicle = function(vehicle) {
    this.ci_ruc = vehicle.ci_ruc;
};

Vehicle.findByRucCi = (rucCi, result) => {
    connection.query(`SELECT * FROM vehiculos WHERE ci_ruc = ?`, [rucCi], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found vehicles: ", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

module.exports = Vehicle;
