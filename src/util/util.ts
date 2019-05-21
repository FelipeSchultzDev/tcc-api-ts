import mongoose from 'mongoose'
import md5 from 'md5'

import { required, invalid } from './messages'
import { FieldOptions, FieldVerified, AuthOptions } from './../class/class'

class Util {
  public emailValidation (email: string): boolean {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (regex.test(email)) {
      return true
    } else {
      return false
    }
  }

  public cpfValidation (cpf: string): boolean {
    var Soma
    var Resto
    Soma = 0
    if (cpf === '00000000000') return false

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    Resto = (Soma * 10) % 11

    if ((Resto === 10) || (Resto === 11)) Resto = 0
    if (Resto !== parseInt(cpf.substring(9, 10))) return false

    Soma = 0
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    Resto = (Soma * 10) % 11

    if ((Resto === 10) || (Resto === 11)) Resto = 0
    if (Resto !== parseInt(cpf.substring(10, 11))) return false
    return true
  }

  public dateValidation (date): boolean {
    let ExpReg = new RegExp('(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}')
    let splitDate = date.split('/')
    let erro = false

    if (date.search(ExpReg) === -1) {
      erro = true
    } else if (((splitDate[1] === 4) || (splitDate[1] === 6) || (splitDate[1] === 9) || (splitDate[1] === 11)) && (splitDate[0] > 30)) {
      erro = true
    } else if (splitDate[1] === 2) {
      if ((splitDate[0] > 28) && ((splitDate[2] % 4) !== 0)) {
        erro = true
      }
      if ((splitDate[0] > 29) && ((splitDate[2] % 4) === 0)) {
        erro = true
      }
    }

    if (erro) {
      return false
    }

    return true
  }

  public celValidation (celular: string): boolean {
    let regex = /^\(\d{2}\)[\s\S](9|)[6789]\d{3}-\d{4}$/
    return regex.test(celular)
  }

  public dateConvert (date): string {
    let splitDate = date.split('/')
    return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
  }

  public async idValidation (id, model: string): Promise<IdOptions> {
    if (!mongoose.Types.ObjectId.isValid(id)) return { result: false, m: invalid('ID') }

    const validation = await mongoose.model(model).findOne({ _id: id })

    if (validation) return { result: true, m: '' }
    else return { result: false, m: 'ID inexistente' }
  }

  public encode (password: string): string {
    let teste = md5(password)
    return teste
  }

  public verifyAuth (permissao, auth: AuthOptions): boolean {
    if (auth.admin) {
      if (permissao === 'admin') return true
    }
    if (auth.funcionario) {
      if (permissao === 'funcionario') return true
    }
    if (auth.financeiro) {
      if (permissao === 'financeiro') return true
    }
    return false
  }

  public async verifyFields (data, options: FieldOptions): Promise<FieldVerified> {
    const msg = []

    if (data._id || options._id) {
      if (!data._id) {
        msg.push(required('_id'))
      } else {
        const { result, m } = await this.idValidation(data._id, options.model)
        if (!result) msg.push(m)
      }
    }
    // -----------------------------------------------------
    if (data.nome || options.nome) {
      if (!data.nome || !(data.nome.length > 0)) msg.push(required('nome'))
    }
    // -----------------------------------------------------
    if (data.email || options.email) {
      if (!data.email || !(data.email.length > 0)) msg.push(required('e-mail'))
      else if (!this.emailValidation(data.email)) msg.push(invalid('E-mail'))
    }
    // -----------------------------------------------------
    if (data.cpf || options.cpf) {
      if (!data.cpf || !(data.cpf.length > 0)) msg.push(required('cpf'))
      else if (!this.cpfValidation(data.cpf)) msg.push(invalid('Cpf'))
    }
    // -----------------------------------------------------
    if (data.nascimento || options.nascimento) {
      if (!data.nascimento || !(data.nascimento.length > 0)) msg.push(required('nascimento'))
      else if (!this.dateValidation(data.nascimento)) msg.push(invalid('Data de nascimento'))
      else data.nascimento = this.dateConvert(data.nascimento)
    }
    // -----------------------------------------------------
    if (data.celular || options.celular) {
      if (!data.celular || !(data.celular.length > 0)) msg.push(required('celular'))
      else if (!this.celValidation(data.celular)) msg.push(invalid('Celular'))
    }
    // -----------------------------------------------------
    if (data.usuario || options.usuario) {
      if (!data.usuario || !(data.usuario.length > 0)) msg.push(required('usuario'))
    }
    // -----------------------------------------------------
    if (data.senha || options.senha) {
      if (!data.senha || data.senha.length === 0) msg.push(required('senha'))
      else if (data.senha.length < 6) msg.push('O campo senha deve ter pelo menos 6 caracteres')
      else data.senha = this.encode(data.senha)
    }
    // -----------------------------------------------------
    if (data.permissao || options.permissao) {
      if (data.permissao === '') data.permissao = null
      else if (data.permissao && !this.idValidation(data.permissao, options.model)) msg.push(invalid('Permissão'))
    }
    // -----------------------------------------------------
    // -----------------------------------------------------

    return { msg, data }
  }
}
export class IdOptions {
  public result: boolean
  public m: string
}

export default new Util()
