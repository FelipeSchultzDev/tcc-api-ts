import Permissao from './../models/permissao-model'
import ColorCMD from './ColorCMD'

let autoCreatePermission = async (): Promise<void> => {
  const permissaoList = [
    { nome: 'admin' },
    { nome: 'funcionario' },
    { nome: 'financeiro' }
  ]

  await Permissao.create(permissaoList)
    .then((): void => {
      ColorCMD('blue', '', '[mongoose] Permissão padrão criada')
    })
    .catch((): void => {
      ColorCMD('blue', '', '[mongoose] Permissão padrão já está criada')
    })
}

export default autoCreatePermission
