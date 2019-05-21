export class FieldOptions {
    public _id?: boolean;
    public nome?: boolean;
    public email?: boolean;
    public cpf?: boolean;
    public nascimento?: boolean;
    public celular?: boolean;
    public usuario?: boolean;
    public senha?: boolean;
    public permissao?: boolean
    public model: string
}
export class Data {
    public _id?: string;
    public nome?: string;
    public email?: string;
    public cpf?: string;
    public nascimento?: string;
    public celular?: string;
    public usuario?: string;
    public senha?: string;
    public permissao?: string
}

export class FieldVerified {
    public msg: string[]
    public data: Response
}

export class AuthOptions {
    public admin?: boolean
    public funcionario?: boolean
    public financeiro?: boolean
}
