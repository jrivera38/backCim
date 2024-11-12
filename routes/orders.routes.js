module.exports = app => {
    const orders = require("../controllers/orders.controller");

    // Ruta para obtener órdenes por vehiculo_id usando GET
    app.get("/orders/:vehiculoPlaca", orders.getOrdersByVehicleId);
};
