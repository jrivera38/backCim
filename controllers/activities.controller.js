const Activity = require("../models/activity.model");

exports.getActivitiesByOrderCode = (req, res) => {
    const orderCode = req.params.order_code;

    if (!orderCode) {
        return res.status(400).json({ error: 'order_code is required' });
    }

    Activity.findByOrderCode(orderCode, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Not found activities for order with code ${orderCode}.`
                });
            } else {
                res.status(500).json({
                    message: `Error retrieving activities for order with code ${orderCode}.`
                });
            }
        } else {
            res.json(data);
        }
    });
};
