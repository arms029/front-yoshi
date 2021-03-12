function validaLogin() {
    let usuario = localStorage.getItem("userLogged")

    if (!usuario) {
        window.location = "index.html"
    }

    let objUser = JSON.parse(usuario)

    //document.getElementById("dadosUser").innerHTML = objUser.nome + ' (' + objUser.racf + ')';
    obterId()
}

function obterId() {
    let url = window.location.href;
    let res = url.split('?');
    let agente = res[1].split('=')
    let id = agente[1]
    consultaDash(id)

}

function consultaDash(id) {

    const url = "http://localhost:8080/transacao/id/" + id

    fetch(url)
        .then(res => validaResposta(res))
}

function validaResposta(resultado) {
    if (resultado.status == 200) {
        resultado.json().then(res => exibirDash(res))
    } else {
        document.getElementById("saida").innerHTML = "Não encontrado"
    }
}

function exibirDash(dados) {
    document.getElementById("parceiro").innerHTML = dados[0].agente + " / " + dados[0].volumeTransacional.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    document.getElementById("parceiroSucesso").innerHTML = dados[0].count
    document.getElementById("parceiroFalhas").innerHTML = dados[1].count
    document.getElementById("parceiroFraudes").innerHTML = dados[2].count
    console.log(dados)
}

function logout() {
    localStorage.removeItem("userLogged");
    window.location = "index.html"
}

function retornar() {
    window.location = "parceiros.html"
}


