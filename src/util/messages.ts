export function tokenNull (): string { return 'Você precisa informar um token para acessar esse recurso!' }
export function tokenInvalid (): string { return 'O token informado é inválido!' }

export function required (val: string): string { return `O campo ${val.toLowerCase()} é obrigatório!` }
export function invalid (val: string): string { return `${val} inválido(a)!` }
export function idInvalid (val: string): string { return `Id do(a) ${val} inválido(a)!` }

export function errorInsert (val: string): string { return `Erro ao inserir o(a) ${val.toLowerCase()}!` }
export function errorUpdate (val: string): string { return `Erro ao atualizar o(a) ${val.toLowerCase()}!` }
export function errorDelete (val: string): string { return `Erro ao deletar o(a) ${val.toLowerCase()}!` }
export function errorGet (val: string): string { return `Erro ao procurar o(a) ${val.toLowerCase()}!` }

export function successInsert (val: string): string { return `${val} cadastrado(a) com sucesso!` }
export function successUpdate (val: string): string { return `${val} atualizado(a) com sucesso!` }
export function successDelete (val: string): string { return `${val} deletado(a) com sucesso!` }

export function notFound (val: string): string { return `Nenhum(a) ${val.toLowerCase()} encontrado(a)!` }
export function notFoundId (val: string): string { return `Nenhum(a) ${val.toLowerCase()} encontrado(a) com este id!` }

export function alreadyInsert (val: string): string { return `${val} já cadastrado(a)!` }

export function idPermission (): string { return `id de permissão inválido!` }

export function enabled (val: string): string { return `${val} ativado(a)` }
export function disabled (val: string): string { return `${val} desativado(a)` }

export function cantDelete (val: string): string { return `Este(a) ${val.toLowerCase()} não pode ser removido(a), pois está vinculado(a) a outro item` }

export function moreThen (field, val): string { return `O campo ${field} deve ser maior que ${val}` }

export function fieldID (): string { return `` }
