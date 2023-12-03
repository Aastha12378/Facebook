const express = require("express");
const app = express();

const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
const bodyparser= require("body-parser")
const dotenv = require("dotenv").config();
const cors = require("cors");
const authRouter = require("./routes/auth");
const commentRouter = require("./routes/comment");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const uploadRouter = require("./controllers/uploadController");
const FriendRouter = require("./routes/frined");

// DB connection 
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`connection successfully..`);
    }).catch((e) => {
        console.log(`No connection..`);
    });

app.use('/images', express.static('public/images'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cors());

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/comment', commentRouter)
app.use('/upload', uploadRouter)
app.use("/friend", FriendRouter)


app.listen(port, () => {
    console.log(`Server is running on ${port} `);
})