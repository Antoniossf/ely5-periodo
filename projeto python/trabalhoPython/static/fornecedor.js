const modalCadastro = new bootstrap.Modal(document.getElementById('modalcadastro'));

function mostrarCarregamento() {
    const spinner = document.getElementById("loadingSpinner");
    spinner.classList.remove("d-none");
}

function esconderCarregamento() {
    const spinner = document.getElementById("loadingSpinner");
    spinner.classList.add("d-none");
}

function novo() {
    document.getElementById("nome").value = "";
    document.getElementById("cnpj").value = ""; 
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("id").value = "";
    modalCadastro.show();
}

function salvar() {
    const nome = document.getElementById("nome").value.trim();
    const cnpj = document.getElementById("cnpj").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const id = document.getElementById("id").value.trim();

    if (!nome || !cnpj || !email || !telefone || !endereco) {
        alert("Preencha todos os campos!");
        return;
    }

    const fornecedor = {
        id: id,
        nome: nome,
        cnpj: cnpj,
        email: email,
        telefone: telefone,
        endereco: endereco
    };

    let url = "http://127.0.0.1:5000/fornecedor";
    let metodo = "POST";

    if (id) {
        console.log("id", id);
        url += "/" + id;
        metodo = "PUT";
    }
    console.log("id", url, metodo);
    mostrarCarregamento();
    fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fornecedor)
    })
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error("Erro ao salvar fornecedor");
        }
        return resposta.text();  
    })
    .then(() => {
        listar();
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalcadastro'));
        modal.hide();  
    })
    .catch(erro => {
        console.error("Erro ao salvar fornecedor:", erro);
    });
}

function editar(id) {    
    mostrarCarregamento();
    fetch("http://127.0.0.1:5000/fornecedor/" + id, {
        method: "GET"})
    .then(resposta => {
        console.log(resposta);
        if (!resposta.ok) {
            throw new Error("Erro ao buscar fornecedor");
        }
        return resposta.json();
    })
    .then(dados => {
        document.getElementById("nome").value = dados.nome;
        document.getElementById("cnpj").value = dados.cnpj;
        document.getElementById("email").value = dados.email;
        document.getElementById("telefone").value = dados.telefone;
        document.getElementById("endereco").value = dados.endereco;
        document.getElementById("id").value = dados.id;
        modalCadastro.show();
    })
    .catch(erro => {
        console.error("Erro ao buscar fornecedor:", erro);
    })
    .finally(() => {
        esconderCarregamento();
    });
}

function listar(pesquisar) {
    mostrarCarregamento();
    const lista = document.getElementById("lista");
    let rota = "http://127.0.0.1:5000/fornecedor";

    let pesquisaInput = document.getElementById("pesquisa");
    if (pesquisar 
        && pesquisaInput.value.trim() != null
        && pesquisaInput.value.trim() != "") {
        rota += "/pesquisa/" + pesquisaInput.value.trim();
    }

    fetch(rota) 
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error("Erro ao buscar fornecedor");
            }
            return resposta.json();
        })
        .then(dados => mostrar(dados))
        .catch(erro => {
            lista.innerHTML = `<tr><td colspan='12' class='text-danger text-center'>fornecedores não encontrados fornecedores</td></tr>`;
            console.error("Erro ao listar fornecedor:", erro);
        });
}

function excluir(id) {
    mostrarCarregamento();
    fetch("http://127.0.0.1:5000/fornecedor/" + id, {
        method: "DELETE"
    })
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error("Erro ao excluir fornecedor");
        }
        return resposta.text();
    })
    .then(() => {
        listar();
    })
    .catch(erro => {
        console.error("Erro ao excluir fornecedor:", erro);
    });
}

function mostrar(dados) {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    for (let i = 0; i < dados.length; i++) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${dados[i].id}</td>
            <td>${dados[i].nome}</td>
            <td>${dados[i].cnpj}</td>
            <td>${dados[i].email}</td>
            <td>${dados[i].telefone}</td>
            <td>${dados[i].endereco}</td>
            <td>
                <button onclick='editar(${dados[i].id})'><img src='imgs/edit.svg'></button>
                <button onclick='excluir(${dados[i].id})'><img src='imgs/x-square.svg'></button>
            </td>`;
        lista.appendChild(tr);
    }
    esconderCarregamento();
}

listar(false);