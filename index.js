const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET_KEY = "mysecretkey";

// Function to generate token
function generateToken(username) {
    return jwt.sign({ username: username }, SECRET_KEY, { expiresIn: "1h" });
}


// API 1 : Generate Token
app.post("/generateToken", (req, res) => {

    const token = generateToken(req.body.username);

    res.json({
        message: "Token generated successfully",
        token: token
    });
});


// Middleware
function authenticateToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token required" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {

        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.user = user;
        next();
    });
}


// API 2 : Validate Token
app.get("/validateToken", authenticateToken, (req, res) => {

    res.json({
        message: "Token is valid",
        user: req.user
    });

});

app.listen(4000, () => {
    console.log("Token server running on http://localhost:4000");
});


// EXPORT
// module.exports = { generateToken };
