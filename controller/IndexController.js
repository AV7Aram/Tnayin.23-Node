const { ObjectId } = require('mongodb');

class IndexController {
    async home(req, res, next) {
        const users = await req.app.locals.services.index.getAllUsers();
        const count = await req.app.locals.services.index.getUsersCount();
        res.render('index', { title: 'Users', users, count });
    };

    async addUser(req, res) {
        await IndexService.addUser(req.body);
        res.redirect('/');
    };

    async userPage(req, res) {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).render('error', { message: 'Invalid user ID', error: { status: 400, stack: '' } });
        }
        const user = await req.app.locals.services.index.getUserById(id);
        res.render('user', { title: 'User Page', user });
    };

    async deleteUser(req, res) {
        const { id } = req.params;
        await req.app.locals.services.index.deleteUser(id);
        res.json({ success: true });
    };

    async updateUser(req, res) {
        const { id } = req.params;
        await req.app.locals.services.index.updateUser(id, req.body);
        res.json({ success: true });
    };
}

module.exports = IndexController;