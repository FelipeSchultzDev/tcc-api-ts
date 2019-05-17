const util = require('./../util');

class MarcaValidation {

    async searchById(req, res, next) {
        const authList = ['admin', 'financeiro'];
        if (!util.verifyAuth(res.locals.user.permissao, authList)) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] });

        let fields = ['id'];
        let result = util.verifyFields(fields, req.body);
        let msg = result.msg;
        req.body = result.data;

        if (msg.length > 0) return res.status(400).json({ success: false, msg: msg })
        else next();
    }

    async search(req, res, next) {
        const authList = ['admin', 'financeiro'];
        if (!util.verifyAuth(res.locals.user.permissao, authList)) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })
        else next();
    }

    async insert(req, res, next) {
        const authList = ['admin'];
        if (!util.verifyAuth(res.locals.user.permissao, authList)) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] });

        let fields = ['nome', 'email', 'cpf', 'nascimento', 'celular'];
        let result = util.verifyFields(fields, req.body);
        let msg = result.msg;
        req.body = result.data;

        if (!msg.length > 0) return next()
        else return res.status(400).json({ success: false, msg: msg });
    }

    async update(req, res, next) {
        const authList = ['admin'];
        if (!util.verifyAuth(res.locals.user.permissao, authList)) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] });

        let fields = ['id', 'nome', 'email', 'cpf', 'nascimento', 'celular'];
        let result = util.verifyFields(fields, req.body);
        let msg = result.msg;
        req.body = result.data;

        if (msg.length > 0) return res.status(400).json({ success: false, msg: msg })
        else next();
    }

    async delete(req, res, next) {
        const authList = ['admin', 'financeiro'];
        if (!util.verifyAuth(res.locals.user.permissao, authList)) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] });

        let fields = ['id'];
        let result = util.verifyFields(fields, req.body);
        let msg = result.msg;
        req.body = result.data;

        if (msg.length > 0) return res.status(400).json({ success: false, msg: msg })
        else next();
    }
}

module.exports = new MarcaValidation();