const db = require("../models/userModel");

const TAMANHO_PAGINA = 5;

async function findAll(pagina){
    const tamanhoSkip = TAMANHO_PAGINA * (pagina - 1);
    return await db.User
        .find()
        .skip(tamanhoSkip) // Quanto tem que pular(skip)
        .limit(TAMANHO_PAGINA) // Quantos registros/ usuarios tem que retornar contando apatir de quantos pulou(skip); Exemplo o "skip" é 10 e o tamanho do "limit" é 5 então vai retornar 5 resgistros contando apartir desses 10 que ele pulou(skip)
        .lean();// Use .lean() para obter objetos JavaScript simples, MAS funcionou sem o ".lean()" TAMBÉM; 
        // .toArray(); // Não Funcionou o ".toArray" com o "mongoose", ;
}

module.exports = { findAll, TAMANHO_PAGINA }