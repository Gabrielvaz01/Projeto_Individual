var database = require("../database/config");

function buscarUltimasMedidas(idMusculo, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idMusculo}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        sum(peito) as peito,
        sum(ombro) as ombro,
        sum(tricipes) as tricipes,
        sum(costas) as costas,
        sum(bicipes) as bicipes,
        sum(perna) as perna
                    from musculo
                    `;

                    // order by id desc limit ${limite_linhas}
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idMusculo) {

    instrucaoSql = ''

    // if (process.env.AMBIENTE_PROCESSO == "producao") {
    //     instrucaoSql = `select top 1
    //     dht11_temperatura as temperatura, 
    //     dht11_umidade as umidade,  
    //                     CONVERT(varchar, momento, 108) as momento_grafico, 
    //                     fk_aquario 
    //                     from medida where fk_aquario = ${idMusculo}  
    //                 order by id desc`;
    // NÃO PRECISA DESSA PARTE POIS NÃO ESTA PEGANDO UM ID ESPECIFICO E SIM O CONJUNTO
    // } else 
    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        sum(peito) as peito,
        sum(ombro) as ombro,
        sum(tricipes) as tricipes,
        sum(costas) as costas,
        sum(bicipes) as bicipes,
        sum(perna) as perna
                    from musculo
                    `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
