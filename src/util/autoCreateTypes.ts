import movimentoTypes from './../models/movimentoTypes-model'
import ColorCMD from './ColorCMD'

let autoCreatePermission = async (): Promise<void> => {
  const tipos = [
    { tipo: 'Entrada' },
    { tipo: 'Venda' },
    { tipo: 'Retirada' }
  ]

  await movimentoTypes.create(tipos)
    .then((): void => {
      ColorCMD('blue', '', '[mongoose] Os tipos padrões foram criada')
    })
    .catch((): void => {
      ColorCMD('blue', '', '[mongoose] Os tipos padrões já foram criada')
    })
}

export default autoCreatePermission
