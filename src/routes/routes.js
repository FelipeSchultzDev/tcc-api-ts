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
router.get('/cliente/listar_desabilitados', clienteVal.searchById, clientCtrl.searchById)
router.get('/cliente/listar', clienteVal.search, clientCtrl.search)
router.post('/cliente/cadastrar', clienteVal.insert, clientCtrl.insert)
router.put('/cliente/ativar', clienteVal.update, clientCtrl.update)
router.put('/cliente/desativar', clienteVal.update, clientCtrl.update)
router.put('/cliente/editar', clienteVal.update, clientCtrl.update)
router.delete('/cliente/deletar', clienteVal.delete, clientCtrl.delete)

// Funcionario
router.get('/funcionario/listar_desabilitados', funcionarioVal.searchById, funcionarioCtrl.searchById)
router.get('/funcionario/listar', funcionarioVal.search, funcionarioCtrl.search)
router.post('/funcionario/cadastrar', funcionarioVal.insert, funcionarioCtrl.insert)
router.put('/funcionario/ativar', funcionarioVal.update, funcionarioCtrl.update)
router.put('/funcionario/desativar', funcionarioVal.update, funcionarioCtrl.update)
router.put('/funcionario/editar', funcionarioVal.update, funcionarioCtrl.update)
router.delete('/funcionario/deletar', funcionarioVal.delete, funcionarioCtrl.delete)

// Marca
router.get('/marca/listar_desabilitados', marcaVal.searchById, marcaCtrl.searchById)
router.get('/marca/listar', marcaVal.search, marcaCtrl.search)
router.post('/marca/cadastrar', marcaVal.insert, marcaCtrl.insert)
router.put('/marca/ativar', marcaVal.update, marcaCtrl.update)
router.put('/marca/desativar', marcaVal.update, marcaCtrl.update)
router.put('/marca/editar', marcaVal.update, marcaCtrl.update)
router.delete('/marca/deletar', marcaVal.delete, marcaCtrl.delete)

// Produto
router.get('/produto/listar_desabilitados', produtoVal.searchById, produtoCtrl.searchById)
router.get('/produto/listar', produtoVal.search, produtoCtrl.search)
router.post('/produto/cadastrar', produtoVal.insert, produtoCtrl.insert)
router.put('/produto/ativar', produtoVal.update, produtoCtrl.update)
router.put('/produto/desativar', produtoVal.update, produtoCtrl.update)
router.put('/produto/editar', produtoVal.update, produtoCtrl.update)
router.delete('/produto/deletar', produtoVal.delete, produtoCtrl.delete)

// Movimento
router.get('/movimento/', movimentoCtrl.searchById, movimentoVal.searchById)

// Terminal de vendas
router.post('/venda/vender', vendaVal.insert, vendaCtrl.insert)

export default router
