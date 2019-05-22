import Tipos from './../models/tipo-model'
import ColorCMD from './ColorCMD'

let autoCreatePermission = async (): Promise<void> => {
  const tipos = [
    { nome: 'Entrada', tag: 'movimento' },
    { nome: 'Venda', tag: 'movimento' },
    { nome: 'Retirada', tag: 'movimento' },
    { nome: 'UN', tag: 'unidade' },
    { nome: 'PCT', tag: 'venda' }
  ]

  await Tipos.create(tipos)
    .then((): void => {
      ColorCMD('blue', '', '[mongoose] Os tipos padrões foram criada')
    })
    .catch((): void => {
      ColorCMD('blue', '', '[mongoose] Os tipos padrões já foram criada')
    })
}

export default autoCreatePermission
