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
router.get('/marca/desabilitados', marcaCtrl.ld)
router.get('/marca/habilitados', marcaCtrl.listar)
router.post('/marca', marcaVal.cadastrar, marcaCtrl.cadastrar)
router.put('/marca/:id/ativar', marcaVal.ativar, marcaCtrl.ativar)
router.put('/marca/:id/desativar', marcaVal.desativar, marcaCtrl.desativar)
router.put('/marca/:id', marcaVal.editar, marcaCtrl.editar)
router.delete('/marca/:id', marcaVal.deletar, marcaCtrl.deletar)

// Produto
router.get('/produto/listar_desabilitados', produtoCtrl.ld)
router.get('/produto/listar', produtoCtrl.listar)
router.post('/produto/cadastrar', produtoVal.cadastrar, produtoCtrl.cadastrar)
router.put('/produto/ativar', produtoVal.ativar, produtoCtrl.ativar)
router.put('/produto/desativar', produtoVal.desativar, produtoCtrl.desativar)
router.put('/produto/entrada_estoque', produtoVal.entradaEstoque, produtoCtrl.entradaEstoque)
router.put('/produto/retirada_estoque', produtoVal.retiradaEstoque, produtoCtrl.retiradaEstoque)
router.put('/produto/editar', produtoVal.editar, produtoCtrl.editar)
router.delete('/produto/deletar', produtoVal.deletar, produtoCtrl.deletar)

// Movimento
router.get('/movimento/', movimentoCtrl.listar)

// Terminal de vendas
router.post('/venda/vender', vendaVal.vender, vendaCtrl.vender)

export default router
