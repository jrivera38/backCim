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

// Activity model
const Activity = function(activity) {
    this.cod_ordenT = activity.cod_ordenT;
    this.cod_actividad = activity.cod_actividad;
    this.descripcion_act = activity.descripcion_act;
    this.hora_act = activity.hora_act;
    this.valor_act = activity.valor_act;
    this.tecnico_act = activity.tecnico_act;
    this.fecha_act = activity.fecha_act;
    this.estado_actual = activity.estado_actual;
    this.motivo_pausado = activity.motivo_pausado;
    this.fecha_upd = activity.fecha_upd;
    this.cantidad = activity.cantidad;
    this.tipo = activity.tipo;
};

Activity.findByOrderCode = (orderCode, result) => {
    connection.query(`SELECT * FROM actividad_ordent WHERE cod_ordenT = ?`, [orderCode], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found activities: ", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

module.exports = Activity;
