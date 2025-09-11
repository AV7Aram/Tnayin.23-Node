const { registerSchema, loginSchema } = require('../schema/schema');

class AuthController {
    async showRegister(req, res) {
        res.render('register', { title: 'Registration', error: null });
    }

    async register(req, res) {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.render('register', { title: 'Registration', error: error.details[0].message });
        }
        await req.app.locals.services.auth.registerUser(req.body);
        res.redirect('/auth/login');
    }

    async showLogin(req, res) {
        res.render('login', { title: 'Login', error: null });
    }

    async login(req, res) {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.render('login', { title: 'Login', error: error.details[0].message });
        }
        const user = await req.app.locals.services.auth.LoginUser(req.body.email, req.body.password);
        if (!user) {
            return res.render('login', { title: 'Login', error: 'Invalid email or password' });
        }
        res.redirect(`/${user._id}`);
    }
}

module.exports = AuthController;