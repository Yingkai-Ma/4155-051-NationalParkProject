const model = require('../models/states');

exports.home = (req, res) => {
    let states = model.find();
    res.render('./home', { states });
}

exports.login = (req, res) => {
    res.render('./login');
}