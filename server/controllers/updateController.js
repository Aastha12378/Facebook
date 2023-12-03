const User = require("../models/User")

const updateController = () => {
    return {
        view(req, res) {
            // console.log(_id=req.params.id);
            User.findById(_id = req.params.id, (err, doc) => {
                if (!err) {
                    // console.log(doc);
                    doc = doc.toObject()
                    res.render('profile/:id', { menu: doc })
                }
            })
        },
        data(req, res) {
            // console.log("hello");
            // console.log(_id=req.params.id);
            User.findByIdAndUpdate(_id = req.params.id, req.body, (err, doc) => {
                // console.log(_id=req.params.id);
                if (!err) {
                    res.redirect("/profile/:id");
                }
                else {
                    console.log('Error During Record Update :( ' + err);
                }
            })
        }
    }
}

module.exports = updateController