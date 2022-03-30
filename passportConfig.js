const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Usermodel = require('./models/UserModel');

const userInstance = new Usermodel();

const loadPassport = (passport) => {
    passport.use(new LocalStrategy({usernameField: 'email'}, async(email, password, done) => {
        try {
            const user = await userInstance.getByEmail(email);
            if(!user) return done(null, false);
            if(! await bcrypt.compare(password, user.password)) return done(null, false);
            user.password = '******';
            return done(null, user);
        } catch (err) {
            return done(err)
        }
    }));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser( async (id, done) => {
        const user = await userInstance.getById(id);
        user.password = '******';
        return done(null, user);
    })
}

const checkAuthentication = (req, res, next) => {
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()) return next();
    res.status(400).json({message: 'Please login'});
}

module.exports = {loadPassport, checkAuthentication};