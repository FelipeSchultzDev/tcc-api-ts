import mongoose from 'mongoose'
import md5 from 'md5'

import { required, invalid, moreThen, idInvalid } from './messages'
import { FieldOptions, FieldVerified, Data, IdOptions, ProdutoVenda } from './../class/class'

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
    if (!mongoose.Types.ObjectId.isValid(id)) return { result: false, m: idInvalid(model) }

    const validation = await mongoose.model(model).findOne({ _id: id })

    if (validation) return { result: true, m: '' }
    else return { result: false, m: `Id do ${model} inexistente` }
  }

  public encode (password: string): string {
    let teste = md5(password)
    return teste
  }

  public async verifyFields (req, options: FieldOptions): Promise<FieldVerified> {
    const data: Data = req
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
    if (data.valorVenda || options.valorVenda) {
      if (!data.valorVenda && data.valorVenda !== 0) msg.push(required('ValorVenda'))
      else if (data.valorVenda <= 0) msg.push(moreThen('valorVenda', 'zero'))
    }
    // -----------------------------------------------------
    if (data.marca || options.marca) {
      if (!data.marca) {
        msg.push(required('Marca'))
      } else {
        const { result, m } = await this.idValidation(data.marca, 'Marca')
        if (!result) msg.push(m)
      }
    }
    // -----------------------------------------------------
    if (data.unidadeMedida || options.unidadeMedida) {
      if (!data.unidadeMedida) {
        msg.push(required('unidadeMedida'))
      } else {
        const { result, m } = await this.idValidation(data.unidadeMedida, 'Tipo')
        if (!result) msg.push(m)
      }
    }
    // -----------------------------------------------------
    if (data.quantidade || options.quantidade) {
      if (!data.quantidade && data.quantidade !== 0) msg.push(required('Quantidade'))
      else if (data.quantidade <= 0) msg.push(moreThen('quantidade', 'zero'))
    }
    // -----------------------------------------------------
    if (data.qtdMinima || options.qtdMinima) {
      if (!data.qtdMinima && data.qtdMinima !== 0) msg.push(required('qtdMinima'))
      else if (data.qtdMinima <= 0) msg.push(moreThen('qtdMinima', 'zero'))
    }
    // -----------------------------------------------------
    if (data.descricao || options.descricao) {
      if (!data.descricao) msg.push(required('descricao'))
      else if (data.descricao.length <= 0) msg.push('O campo descricao deve ter mais de uma letra')
    }
    // -----------------------------------------------------
    if (data.dataVenda || options.dataVenda) {
      if (!data.dataVenda || !(data.dataVenda.length > 0)) msg.push(required('dataVenda'))
      else if (!this.dateValidation(data.dataVenda)) msg.push(invalid('Data de venda'))
      else data.dataVenda = this.dateConvert(data.dataVenda)
    }
    // -----------------------------------------------------

    return { msg, data }
  }
}

export default new Util()
