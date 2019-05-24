import { Router } from 'express'

import clientCtrl from './../controllers/cliente-controller'
import clienteVal from './../validations/cliente-validation'

import marcaCtrl from './../controllers/marca-controller'
import marcaVal from './../validations/marca-validation'

import movimentoCtrl from './../controllers/movimento-controller'

import produtoCtrl from '../controllers/produto-controller'
import produtoVal from './../validations/produto-validation'

import vendaCtrl from './../controllers/venda-controller'
import vendaVal from './../validations/venda-validation'

const router = Router()

// Cliente
router.get('/cliente/listar_desabilitados', clientCtrl.ld)
router.get('/cliente/listar', clientCtrl.listar)
router.post('/cliente/cadastrar', clienteVal.cadastrar, clientCtrl.cadastrar)
router.put('/cliente/ativar', clienteVal.ativar, clientCtrl.ativar)
router.put('/cliente/desativar', clienteVal.desativar, clientCtrl.desativar)
router.put('/cliente/editar', clienteVal.editar, clientCtrl.editar)
router.delete('/cliente/deletar', clienteVal.deletar, clientCtrl.deletar)

// Marca
router.get('/marca/listar_desabilitados', marcaCtrl.ld)
router.get('/marca/listar', marcaCtrl.listar)
router.post('/marca/cadastrar', marcaVal.cadastrar, marcaCtrl.cadastrar)
router.put('/marca/ativar', marcaVal.ativar, marcaCtrl.ativar)
router.put('/marca/desativar', marcaVal.desativar, marcaCtrl.desativar)
router.put('/marca/editar', marcaVal.editar, marcaCtrl.editar)
router.delete('/marca/deletar', marcaVal.deletar, marcaCtrl.deletar)

// Produto
router.get('/produto/listar_desabilitados', produtoCtrl.listar)
router.get('/produto/listar', produtoCtrl.listar)
router.post('/produto/cadastrar', produtoVal.cadastrar, produtoCtrl.cadastrar)
router.put('/produto/ativar', produtoVal.ativar, produtoCtrl.ativar)
router.put('/produto/desativar', produtoVal.desativar, produtoCtrl.desativar)
router.put('/produto/editar', produtoVal.editar, produtoCtrl.editar)
router.delete('/produto/deletar', produtoVal.deletar, produtoCtrl.deletar)

// Movimento
router.get('/movimento/', movimentoCtrl.listar)

// Terminal de vendas
router.post('/venda/vender', vendaVal.vender, vendaCtrl.vender)

export default router
