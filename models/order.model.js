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

// Order model
const Order = function(order) {
    this.vehiculo_id = order.vehiculo_id;
    this.descripcion = order.descripcion;
    this.fecha = order.fecha;
};

Order.findByVehicleId = (vehiculoPlaca, result) => {
    connection.query(`SELECT * FROM orden_trabajo WHERE placa = ? order by f_autoriza desc`, [vehiculoPlaca], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found orders: ", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

module.exports = Order;
