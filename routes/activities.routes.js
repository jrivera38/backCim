module.exports = app => {
    const activities = require("../controllers/activities.controller");

    // Ruta para obtener actividades por código de orden usando GET
    app.get("/activities/:order_code", activities.getActivitiesByOrderCode);
};
