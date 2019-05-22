import Permissao from './../models/acesso-model'
import ColorCMD from './ColorCMD'

let autoCreatePermission = async (): Promise<void> => {
  const acessoList = [
    { usuario: 'admin', senha: '14e1b600b1fd579f47433b88e8d85291' }
  ]

  await Permissao.create(acessoList)
    .then((): void => {
      ColorCMD('blue', '', '[mongoose] Acesso padrão criada')
    })
    .catch((): void => {
      ColorCMD('blue', '', '[mongoose] Acesso padrão já está criada')
    })
}

export default autoCreatePermission
