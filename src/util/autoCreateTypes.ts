import Tipo from './../models/tipo-model'
import ColorCMD from './ColorCMD'

let autoCreatePermission = async (): Promise<void> => {
  const tipos = [
    { nome: 'entrada', tag: 'movimento' },
    { nome: 'venda', tag: 'movimento' },
    { nome: 'retirada', tag: 'movimento' },
    { nome: 'un', tag: 'unidade' },
    { nome: 'pct', tag: 'venda' }
  ]

  await Tipo.create(tipos)
    .then((): void => {
      ColorCMD('blue', '', '[mongoose] Os tipos padrões foram criada')
    })
    .catch((): void => {
      ColorCMD('blue', '', '[mongoose] Os tipos padrões já foram criada')
    })
}

export default autoCreatePermission
