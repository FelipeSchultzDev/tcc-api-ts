const Movimento = require('../models/Movimento-model');

class MovimentoController {
    async searchById(req, res) {
        return res.status(200).json({ success: false, msg: 'Serviço não criado' });
    }

    async search(req, res) {
        return res.status(200).json({ success: false, msg: 'Serviço não criado' });
    }

    async insert(req, res) {
        return res.status(200).json({ success: false, msg: 'Serviço não criado' });
    }

    async update(req, res) {
        return res.status(200).json({ success: false, msg: 'Serviço não criado' });
    }

    async delete(req, res) {
        return res.status(200).json({ success: false, msg: 'Serviço não criado' });
    }
}

module.exports = new MovimentoController();