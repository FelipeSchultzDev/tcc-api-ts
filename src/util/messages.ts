export function tokenNull (): string { return 'Você precisa informar um token para acessar esse recurso!' }
export function tokenInvalid (): string { return 'O token informado é inválido!' }

export function required (val): string { return `O campo ${val} é obrigatório!` }
export function invalid (val): string { return `${val} inválido(a)!` }

export function errorInsert (val): string { return `Erro ao inserir o(a) ${val}!` }
export function errorUpdate (val): string { return `Erro ao atualizar o(a) ${val}!` }
export function errorDelete (val): string { return `Erro ao deletar o(a) ${val}!` }
export function errorGet (val): string { return `Erro ao procurar o(a) ${val}!` }

export function successInsert (val): string { return `${val} cadastrado(a) com sucesso!` }
export function successUpdate (val): string { return `${val} atualizado(a) com sucesso!` }
export function successDelete (val): string { return `${val} deletado(a) com sucesso!` }

export function notFound (val): string { return `Nenhum(a) ${val} encontrado!` }
export function notFoundId (val): string { return `Nenhum(a) ${val} encontrado com este id!` }

export function alreadyInsert (val): string { return `${val} já cadastrado(a)!` }

export function idPermission (): string { return `id de permissão inválido!` }

export function fieldID (): string { return `` }
