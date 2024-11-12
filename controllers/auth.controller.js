const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Cliente = require("../models/cliente.model");

exports.login = (req, res) => {
    const { mail, clave } = req.body; // Usar req.body para POST

    // Validate request
    if (!mail || !clave) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Cliente.findByEmail(mail, (err, cliente) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found Cliente with email ${mail}.`
                });
            } else {
                return res.status(500).send({
                    message: "Error retrieving Cliente with email " + mail
                });
            }
        }

        // Validate Password
        const hashedClave = crypto.createHash('sha1').update(clave).digest('hex');
        if (hashedClave !== cliente.clave) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        // Generate token
        const token = jwt.sign({ id: cliente.id }, "secret-key", {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            rucCi: cliente.ruc_ci,
            mail: cliente.mail,
            accessToken: token
        });
    });
};
