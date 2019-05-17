const Marca = require('../models/Marca-model');;
// const tokenMiddleware = require('./../middleware/token');
const marcaValidation = require('./../validations/Marca-validation');

class MarcaController {
    async searchById(req, res) {
        let response = marcaValidation.getById(req.body);

        if (!response.success) {
            return res.status(500).json(response);
        }

        await Marca.findById(req.body.id)
        .then( marca => {
            response.success = true;
            response.marca = marca;
            response.msg = 'Busca realizada com sucesso';
            return res.status(200).json(response);
        })
        .catch( e => {
            response.success = false;
            response.msg = 'Ocorreu um erro na busca';

            if (e.message.search('Cast to ObjectId failed for') >= 0) {
                response.msg = 'Não foi encontrada nenhuma marca com este id';
            }
            return res.status(500).json(response);
        });

    }

    async search(req, res) {
        const response = {
            success: false,
            marcas: [],
            msg: ''
        };

        await Marca.find()
        .then( marcas => {
            response.success = true;
            response.marcas = marcas;
            response.msg = 'Busca realizada com sucesso';
            return res.status(200).json(response);
        })
        .catch( e => {
            response.success = false;
            response.msg = 'Ocorreu um erro ao buscar dados';
            return res.status(500).json(response);
        });
    }

    async insert(req, res) {
        const response = {
            success: false,
            msg: ''
        };

        await Marca.create(req.body)
        .then(() => {
            response.success = true;
            response.msg = 'A marca foi criada';
            return res.status(201).json(response);
        })
        .catch(e => {
            response.success = false;
            response.msg = e.errors.nome.message;

            if (e.errors.nome.message === 'Path `nome` is required.') {
                response.msg = 'O campo nome é obrigatório';
            }

            return res.status(500).json(response);
        });
    }

    async update(req, res) {
        const response = {
            success: false,
            msg: ''
        };

        if (!req.body.id) {
            response.msg = 'O campo id é obrigatório';
            return res.status(500).json(response);
        } else {
            if (!req.body.nome || !req.body.nome.length > 0) {
                response.msg = 'O campo nome é obrigatório e precisa de pelo menos 1 carécter';
                return res.status(500).json(response);
            }
        }

        await Marca.findOneAndUpdate({ _id: req.body.id }, { nome: req.body.nome })
            .then(() => {
                response.success = true;
                response.msg = 'A marca foi alterada com sucesso';
                return res.status(200).json(response);
            })
            .catch(err => {
                response.success = false;
                response.msg = 'Ocorreu um erro ao alterar a marca';

                if (err.message.search('Cast to ObjectId failed for value') >= 0) {
                    response.msg = 'Não foi encontrada nenhuma marca com este id';
                } else if (err.codeName === 'DuplicateKey') {
                    response.msg = 'Já existe uma marca com este nome';
                }

                return res.status(500).json(response);
            });
    }

    async delete(req, res) {
        const response = {
            success: false,
            msg: ''
        };

        if (!req.body.id) {
            response.msg = 'O campo id é obrigatório';
            return res.status(500).json(response);
        }

        await Marca.findOneAndDelete({ _id: req.body.id })
        .then( () => {
            response.success = true;
            response.msg = 'A marca foi deletada com sucesso';
            return res.status(200).json(response);
        })
        .catch( err => {
            response.success = false;
            response.msg = 'Ocorreu um erro ao remover a marca';

            if (err.message.search('Cast to ObjectId failed for value') >= 0) {
                response.msg = 'Não foi encontrada nenhuma marca com este id';
            }

            return res.status(500).json(response);
        });

    }
}

module.exports = new MarcaController();
