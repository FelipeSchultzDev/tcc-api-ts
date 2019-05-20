import { Router } from 'express'

import clientCtrl from './../controllers/cliente-controller'
import clienteVal from './../validations/cliente-validation'

import funcionarioCtrl from './../controllers/funcionario-controller'
import funcionarioVal from './../validations/funcionario-validation'

import marcaCtrl from './../controllers/marca-controller'
import marcaVal from './../validations/marca-validation'

import movimentoCtrl from './../controllers/movimento-controller'
import movimentoVal from './../validations/movimento-validation'

import produtoCtrl from '../controllers/produto-controller'
import produtoVal from './../validations/produto-validation'

import vendaCtrl from './../controllers/venda-controller'
import vendaVal from './../validations/venda-validation'

const router = Router()

// Cliente
router.get('/consultarid', clienteVal.searchById, clientCtrl.searchById)
router.get('/consultar', clienteVal.search, clientCtrl.search)
router.post('/inserir', clienteVal.insert, clientCtrl.insert)
router.put('/atualizar', clienteVal.update, clientCtrl.update)
router.delete('/deletar', clienteVal.delete, clientCtrl.delete)

// Funcionario
router.get('/consultarid', funcionarioVal.searchById, funcionarioCtrl.searchById)
router.get('/consultar', funcionarioVal.search, funcionarioCtrl.search)
router.post('/inserir', funcionarioVal.insert, funcionarioCtrl.insert)
router.put('/atualizar', funcionarioVal.update, funcionarioCtrl.update)
router.delete('/deletar', funcionarioVal.delete, funcionarioCtrl.delete)

// Marca
router.get('/consultarid', marcaVal.searchById, marcaCtrl.searchById)
router.get('/consultar', marcaVal.search, marcaCtrl.search)
router.post('/inserir', marcaVal.insert, marcaCtrl.insert)
router.put('/atualizar', marcaVal.update, marcaCtrl.update)
router.delete('/deletar', marcaVal.delete, marcaCtrl.delete)

// Movimento
router.get('/consultarid', movimentoCtrl.searchById, movimentoVal.searchById)
router.get('/consultar', movimentoCtrl.search, movimentoVal.search)
router.post('/inserir', movimentoCtrl.insert, movimentoVal.insert)
router.put('/atualizar', movimentoCtrl.update, movimentoVal.update)
router.delete('/deletar', movimentoCtrl.delete, movimentoVal.delete)

// Produto
router.get('/consultarid', produtoVal.searchById, produtoCtrl.searchById)
router.get('/consultar', produtoVal.search, produtoCtrl.search)
router.post('/inserir', produtoVal.insert, produtoCtrl.insert)
router.put('/atualizar', produtoVal.update, produtoCtrl.update)
router.delete('/deletar', produtoVal.delete, produtoCtrl.delete)

router.get('/consultarid', vendaVal.searchById, vendaCtrl.searchById)
router.get('/consultar', vendaVal.search, vendaCtrl.search)
router.post('/inserir', vendaVal.insert, vendaCtrl.insert)
router.put('/atualizar', vendaVal.update, vendaCtrl.update)
router.delete('/deletar', vendaVal.delete, vendaCtrl.delete)

export default router
