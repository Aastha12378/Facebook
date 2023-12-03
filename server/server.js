const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
require("./db/conn");
const User = require("./model/user");
const cors = require('cors');

app.use(express.json());

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.get("/signup", (req, res) => {
    // console.log("hello");
    res.send("hello")
});


app.post("/signup", (req, res) => {
    const { firstName, surname, email, password, day, month, year, gender } = req.body;
    // console.log(req.body);

    const user = new User({ firstName, surname, email, password, day, month, year, gender });

    user.save()
        .then(() => {
            res.status(200).json({ message: "Login Successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Error saving user to database' });
        });
})

app.get("/login", (req, res) => {
    console.log("hello");
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    User.findOne({ email: email })
        .then((user) => {
            console.log('user: ', user);
            if (!user) {
                return res.status(404).json({ 'message': 'User not found.' });
            }
            const matchPassword = bcrypt.compare(password, user.password);
            console.log('matchPassword', matchPassword)
            if (!matchPassword) {
                return res.status(400).json({ 'message': 'invalid Creadentials' });
            }
            const token = jwt.sign({ userId: user._id }, "mysecretkey", { expiresIn: "1h" });
            console.log('token: ', token);
            res.status(200).json({ token });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})