const mysql = require("mysql2");
const dbConfig = require("../config/db.config").USERS_DB;

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
    console.log("Successfully connected to the users database.");
});

// User model
const User = function(user) {
    this.email = user.email;
    this.password = user.password;
};


User.findByEmail = (email, result) => {
    connection.query(`SELECT * FROM users WHERE email = ?`, [email], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

module.exports = User;
