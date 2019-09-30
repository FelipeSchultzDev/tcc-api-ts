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
router.get('/cliente/desabilitados', clientCtrl.ld) // Ok
router.get('/cliente/habilitados', clientCtrl.listar) // Ok
router.get('/cliente/:id', clienteVal.getById, clientCtrl.getById) // Ok
router.post('/cliente', clienteVal.cadastrar, clientCtrl.cadastrar) // Ok
router.put('/cliente/:id/ativar', clienteVal.ativar, clientCtrl.ativar) // Ok
router.put('/cliente/:id/desativar', clienteVal.desativar, clientCtrl.desativar) // Ok
router.put('/cliente/:id', clienteVal.editar, clientCtrl.editar) // Ok
router.delete('/cliente/:id', clienteVal.deletar, clientCtrl.deletar) // Ok

// Marca
router.get('/marca/desabilitados', marcaCtrl.ld) // Ok
router.get('/marca/habilitados', marcaCtrl.listar) // Ok
router.post('/marca', marcaVal.cadastrar, marcaCtrl.cadastrar) // Ok
router.put('/marca/:id/ativar', marcaVal.ativar, marcaCtrl.ativar) // Ok
router.put('/marca/:id/desativar', marcaVal.desativar, marcaCtrl.desativar) // Ok
router.put('/marca/:id', marcaVal.editar, marcaCtrl.editar) // Ok
router.delete('/marca/:id', marcaVal.deletar, marcaCtrl.deletar) // Ok

// Produto
router.get('/produto/desabilitados', produtoCtrl.ld) // Ok
router.get('/produto/habilitados', produtoCtrl.listar) // Ok
router.get('/produto/comboOptions', produtoCtrl.comboOptions) // Ok
router.get('/produto/:id', produtoCtrl.getById) // Ok
router.post('/produto', produtoVal.cadastrar, produtoCtrl.cadastrar) // Ok
router.put('/produto/:id/ativar', produtoVal.ativar, produtoCtrl.ativar) // Ok
router.put('/produto/:id/desativar', produtoVal.desativar, produtoCtrl.desativar) // Ok
router.put('/produto/:id/entrada_estoque', produtoVal.entradaEstoque, produtoCtrl.entradaEstoque)
router.put('/produto/:id/retirada_estoque', produtoVal.retiradaEstoque, produtoCtrl.retiradaEstoque)
router.put('/produto/:id', produtoVal.editar, produtoCtrl.editar) // Ok
router.delete('/produto/:id', produtoVal.deletar, produtoCtrl.deletar) // Ok

// Movimento
router.get('/movimento', movimentoCtrl.listar)

// Terminal de vendas
router.post('/venda/vender', vendaVal.vender, vendaCtrl.vender)
router.get('/venda/listaProduto', vendaCtrl.getProdutos)
router.get('/venda/listaProduto/:id', vendaCtrl.getProdutoById)
router.get('/venda/validarQuantidade/:id', vendaCtrl.validateQuantidade)

export default router
