import { Request, Response } from 'express'

import VendasModel from './../models/venda-model'
import ProdutoModel from './../models/produto-model'

const fixZero = (n: number): string => (n > 0 && n < 10) ? `0${n}` : n.toString()

class HomeController {
  public async getHomeData (req: Request, res: Response): Promise<Response> {
    const nowDate = new Date()
    const tomorrowDate = new Date(nowDate.getTime() + 24 * 60 * 60 * 1000)

    const today = `${nowDate.getFullYear()}-${fixZero(nowDate.getMonth() + 1)}-${fixZero(nowDate.getDate())}`
    const tomorrow = `${tomorrowDate.getFullYear()}-${fixZero(tomorrowDate.getMonth() + 1)}-${fixZero(tomorrowDate.getDate())}`

    let vendas = await VendasModel.find({ dataVenda: { $gte: today, $lt: tomorrow } })

    const totalVendasHoje = fixZero(vendas.length)

    // ------------------------------------------------------------------------------------------------------------------------

    nowDate.setMonth(nowDate.getMonth() - 1)
    const lastMonth = `${nowDate.getFullYear()}-${fixZero(nowDate.getMonth() + 1)}-${fixZero(nowDate.getDate())}`

    vendas = await VendasModel.find({ dataVenda: { $gte: lastMonth, $lt: tomorrow } })

    const totalVendasMes = fixZero(vendas.length)

    // ------------------------------------------------------------------------------------------------------------------------

    const tmpProdutos = await ProdutoModel.find({ status: true })

    const produtos = tmpProdutos.filter((produto): boolean => produto.quantidade <= produto.qtdMinima)

    let vazio = 0
    let quantidadeBaixa = 0

    produtos.forEach((produto): void => {
      if (produto.quantidade > 0 && produto.quantidade <= produto.qtdMinima) {
        quantidadeBaixa += 1
      } else if (produto.quantidade === 0) {
        vazio += 1
      }
    })

    return res.status(200).json({ success: true, totalVendasHoje, totalVendasMes, listaProdutos: { produtos, vazio, quantidadeBaixa } })
  }
}
export default new HomeController()
