const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    day: {
        type: Number,
    },
    month: {
        type: Number,
    },
    year: {
        type: Number,
    },
    gender: {
        type: String
    }
});

userSchema.methods.generateAuthToken = async function () {
    try{
        console.log(this.id);
        const token = jwt.sign({_id:this._id.toString} , process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token : token});
        await this.save();
        return token;
    } catch (error) {
        res.send("the error part" + error);
        console.log("the error part" + error);
    }
}


userSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = await bcrypt.hash(this.password, 10);
    }
    next();
})

const User = new mongoose.model("User" , userSchema);

module.exports = User;