module.exports = app => {
    const auth = require("../controllers/auth.controller");

    // Ruta para login usando POST
    app.post("/login", auth.login);
};