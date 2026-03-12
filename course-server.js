const express = require('express');
const students = require('./students');
const sendVerificationEmail = require('./mailer');
const { generateToken, verifyAccess } = require('./logic');
const { authenticate } = require('./middleware');

const app = express();
app.use(express.json());

app.post('/register', (request, response) => {

    const { name, email, password, confirm_password } = request.body;

    if (password === confirm_password) {

        const token = generateToken(email, "student", false);

        students.push({
            email: email,
            name: name,
            token: token,
            access: false
        });

        sendVerificationEmail(email, token);

        response.status(200).json({ message: "Success" });

    } else {
        response.status(400).json({ message: "Passwords do not match" });
    }
});


app.get('/verify', (request, response) => {

    try {

        const token = request.query.token;

        const user = verifyAccess(token);

        console.log("Decoded:", user);
        console.log("Students:", students);

        const student = students.find(stu => stu.email === user.email);

        if (!student) {
            return response.status(401).json({ message: "No user exist" });
        }

        student.access = true;

        response.json({ message: "Email verified successfully" });

    } catch (error) {

        response.status(400).json({ error: error.message });

    }

});

app.post('/dashboard',authenticate,(request, response) => {
    response.json({ students: students })
});
app.post('/admin/dashboard', authenticate, (request, response) => {

    response.json({ students: students })

});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
