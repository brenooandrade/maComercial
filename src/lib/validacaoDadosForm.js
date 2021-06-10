export const validandoValor = (valor) => {
    if (valor == '' || valor == ' ' || valor == undefined) {
        return false;
    } else {
        return true;
    }
}

export const validandoListaDadosVazia = (lista) => {
    let resposta = {
        'status': false
    };
    for (let index = 0; index < lista.length; index++) {
        const item = lista[index];
        if (item.valor == '' || item.valor == ' ' || item.valor == undefined) {
            resposta = {
                'status': true,
                'campo': item.nome,
                'validacaoDocumento': item.validacaoDocumento,
            };
            break;
        } else {
            if (item.validacaoDocumento == true && validandoCPF(item.valor) == true && verificaSomenteInteiro(item.valor) == true) {
                resposta = {
                    'status': false
                };
                console.log(`${item.nome} - ${verificaSomenteInteiro(item.valor)} - validandoCPF: ${validandoCPF(item.valor)}`);
            } else if (item.validacaoDocumento == true && validandoCNPJ(item.valor) == true && verificaSomenteInteiro(item.valor) == true) {
                resposta = {
                    'status': false
                };
                console.log(`${item.nome} - ${verificaSomenteInteiro(item.valor)} - validandoCPF: ${validandoCNPJ(item.valor)}`);
            } else if (item.validacaoDocumento == true && (validandoCPF(item.valor) != true || validandoCNPJ(item.valor) != true)) {
                resposta = {
                    'status': true,
                    'campo': item.nome,
                    'validacaoDocumento': item.validacaoDocumento,
                };
                console.log(`${item.nome} - ${verificaSomenteInteiro(item.valor)} - validandoCPF: ${validandoCPF(item.valor)}`);
                break;
            } else {
                resposta = {
                    'status': false
                };
            }
        }
    };
    console.log(resposta)
    return resposta;
}

export const validandoCPF = (strCPF) => {
    var Soma;
    var Resto;
    Soma = 0;
    strCPF = retornandoSomenteInteiro(strCPF);
    if (strCPF == "00000000000") return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

export const validandoCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    cnpj = retornandoSomenteInteiro(cnpj);

    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;


    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;
}

export const retornandoSomenteInteiro = (numero) => {
    let resultado = '';
    for (let index = 0; index < numero.length; index++) {
        if (
            numero[index].toString() == '0' ||
            numero[index].toString() == '1' ||
            numero[index].toString() == '2' ||
            numero[index].toString() == '3' ||
            numero[index].toString() == '4' ||
            numero[index].toString() == '5' ||
            numero[index].toString() == '6' ||
            numero[index].toString() == '7' ||
            numero[index].toString() == '8' ||
            numero[index].toString() == '9'
        ) {
            resultado += numero[index];
        }
    }
    return resultado;
}


export const verificaSomenteInteiro = (numero) => {
    let status = false;
    var numeroNovo = '';
    numero = numero.trim();
    for (let index = 0; index < numero.length; index++) {
        if (
            numero[index] == '0' ||
            numero[index] == '1' ||
            numero[index] == '2' ||
            numero[index] == '3' ||
            numero[index] == '4' ||
            numero[index] == '5' ||
            numero[index] == '6' ||
            numero[index] == '7' ||
            numero[index] == '8' ||
            numero[index] == '9'
        ) {
            status = true;
        } else {
            console.log(`numero[index]: (${numero[index]})`)
            status = false;
            break;
        }
    }
    return status;
}