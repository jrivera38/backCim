module.exports = app => {
    const vehicles = require("../controllers/vehiculo.controller");

    // Ruta para obtener vehículos por ruc_ci usando GET
    app.get("/vehiculo", vehicles.getVehiclesByRucCi);
};