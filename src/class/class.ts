export class FieldOptions {
    public _id?: boolean
    public nome?: boolean
    public barcode?: boolean
    public email?: boolean
    public cpf?: boolean
    public nascimento?: boolean
    public celular?: boolean
    public usuario?: boolean
    public senha?: boolean
    public valorVenda?: boolean
    public marca?: boolean
    public unidadeMedida?: boolean
    public quantidade?: boolean
    public qtdMinima?: boolean
    public descricao?: boolean
    public listaProdutos?: boolean
    public dataVenda?: boolean

    public model?: string;
}
export class Data {
    public _id?: string
    public nome?: string
    public barcode?: string
    public email?: string
    public cpf?: string
    public nascimento?: string
    public celular?: string
    public usuario?: string
    public senha?: string
    public valorVenda?: number
    public marca?: string
    public unidadeMedida?: string
    public quantidade?: number
    public qtdMinima?: number
    public descricao?: string
    public listaProdutos?: ProdutoVenda[]
    public dataVenda?: string
}

export class FieldVerified {
    public msg: string[]
    public data: Data
}

export class Compras {
    public id: string
    public listaProdutos: ProdutoVenda[]
    public dataVenda: string
}

export class ProdutoVenda {
    public produto: string
    public qtd: number
    public valor: number
    public desconto: number
}

export class IdOptions {
    public result: boolean
    public m?: string
    public ms?: string[]
}
