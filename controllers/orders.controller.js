const Order = require("../models/order.model");

exports.getOrdersByVehicleId = (req, res) => {
    const vehiculoPlaca = req.params.vehiculoPlaca;

    if (!vehiculoPlaca) {
        return res.status(400).json({ error: 'vehiculo_id is required' });
    }

    Order.findByVehicleId(vehiculoPlaca, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Not found orders for vehicle with id ${vehiculoPlaca}.`
                });
            } else {
                res.status(500).json({
                    message: `Error retrieving orders for vehicle with id ${vehiculoPlaca}.`
                });
            }
        } else {
            res.json(data);
        }
    });
};
