function validaLogin() {
    let usuario = localStorage.getItem("userLogged")

    if (!usuario) {
        window.location = "index.html"
    }

    let objUser = JSON.parse(usuario)

    document.getElementById("dadosUser").innerHTML = objUser.nome + ' (' + objUser.racf + ')';
    consultaAgente()
}

function consultaAgente() {

    const url = "http://localhost:8080/agfinanceiro/top10/"

    fetch(url)
        .then(res => validaResposta(res))
}

function logout() {
    localStorage.removeItem("userLogged");
    window.location = "index.html"
}

function validaResposta(resultado) {
    if (resultado.status == 200) {
        resultado.json().then(res => exibirParceiros(res))
    } else {
        document.getElementById("saida").innerHTML = "Não encontrado"
    }
}

function exibirParceiros(dados) {
    let dropdown = ' <select class="form-control" onchange="exibirDash()" id="optionAgent"><option disabled selected></option>';
    for (let index = 0; index < dados.length; index++) {
        // tabela += '<tr> <td>' + dados[index].descricao + '</td><td>' + dados[index].valor + '</td><td>' + dados[index].data  + '</td> </tr>'
        dropdown += `<option value="${dados[index].id}">${dados[index].nome}</option>`
    }

    dropdown += "</select>"
    document.getElementById("opcoes").innerHTML = dropdown
    exibirDados(dados)
}

function exibirDash() {
    let opcao = document.getElementById("optionAgent").value 
    window.location = "dashboard.html?id=" + opcao

}


function exibirDados(dados) {

    let tabela = '<table class="table table-hover table-striped table-bordered" style="text-align: center; vertical-align: middle;"> <tr> <th>Parceiro</th> <th>Volume Transacional</th></tr>'

    for (let index = 0; index < dados.length; index++) {
        //let valor = new valorTransacional(dados[index].valor) // transforma o texto em um obejto Date
        //let valorFormatado = valor.toLocaleString('pt-br',{style:'currency', currency: 'BRL'});
        // tabela += '<tr> <td>' + dados[index].descricao + '</td><td>' + dados[index].valor + '</td><td>' + dados[index].data  + '</td> </tr>'
        tabela += `<tr><td style="text-align: center; vertical-align: middle;"> ${dados[index].nome} </td><td style="text-align: right; vertical-align: middle;"> ${dados[index].volumeTransacional} </td></tr>`
        //tabela += `<tr><td style="text-align: center; vertical-align: middle;"> ${dados[index].nome} </td><td style="text-align: right; vertical-align: middle;"> ${valorFormatado} </td></tr>`
    }

    tabela += '</table>'

    document.getElementById("saida").innerHTML = tabela
}

