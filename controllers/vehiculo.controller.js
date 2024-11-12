const Vehicle = require("../models/vehiculo.model");

exports.getVehiclesByRucCi = (req, res) => {
    const rucCi = req.query.ruc_ci;

    if (!rucCi) {
        return res.status(400).json({ error: 'ruc_ci is required' });
    }

    Vehicle.findByRucCi(rucCi, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Not found vehicles with ruc_ci ${rucCi}.`
                });
            } else {
                res.status(500).json({
                    message: `Error retrieving vehicles with ruc_ci ${rucCi}.`
                });
            }
        } else {
            res.json(data);
        }
    });
};
