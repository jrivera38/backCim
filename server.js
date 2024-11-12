const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
require("./routes/auth.routes")(app);
require("./routes/vehiculo.routes")(app); // Registrar la nueva ruta
require("./routes/orders.routes")(app); // Registrar la nueva ruta
require("./routes/activities.routes")(app); // Registrar la nueva ruta



// Simple route for testing
app.get("/", (req, res) => {
    res.json({ message: "Welcome to myapp application." });
});

// Set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
