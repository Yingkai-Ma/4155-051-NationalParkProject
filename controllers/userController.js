//new page
const model = require('../models/user');

exports.new = (req, res) => {
    return res.render('./signUp');
};

exports.create = (req, res, next) => {
    let user = new model(req.body);
    user.save()
        .then(user => {
            req.flash('success', 'Successful login');
            res.redirect('/users/login');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
             req.flash('error', err.message);
           return res.redirect('back');
            }

        if (err.code === 11000) {
           req.flash('error', 'Account with email currently exist');
           return res.redirect('back');
            }
            next(err);
        });
};

exports.getUserLogin = (req, res, next) => {
    return res.render('./login');
}

exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    model.findOne({ email: email })
  .then(user => {
      if (!user) {
         console.log('Incorrect email address');
          req.flash('error', 'Incorrect email address');
           res.redirect('/users/login');
           } else {
            user.comparePassword(password)
               .then(result => {
                if (result) {
              req.session.user = user._id;
                 req.session.user_firstName = user.firstName;
                req.flash('success', 'Successful logged in');
               res.redirect('/users/profile');
                 } else {
                req.flash('error', 'wrong password');
                   res.redirect('/users/login');
                   }
               });
           }
        })
        .catch(err => next(err));
};

exports.profile = (req, res, next) => {
    let id = req.session.user;
    Promise.all([model.findById(id)])
        .then(results => {
            const [user] = results;
            res.render('./profile', { user })
        })
        .catch(err => next(err));
};

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err)
            return next(err);
        else
            res.redirect('/');
    });
};