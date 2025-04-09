const modalCadastro = new bootstrap.Modal(document.getElementById('modalcadastro'));

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

    const fornecedor = { id, nome, cnpj, email, telefone, endereco };
    let url = "http://localhost:3333/fornecedor";
    let method = "POST";

    if (id) {
        url += "/" + id;
        method = "PUT";
    }

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fornecedor)
    })
    .then(response => {
        if (!response.ok) throw new Error("Erro ao salvar seu fornecedor");
        return response.text();
    })
    .then(() => {
        listar();
        modalCadastro.hide();
    })
    .catch(error => {
        console.error("Erro ao salvar seu fornecedor:", error);
    });
}

function editar(id) {    
    fetch("http://localhost:3333/fornecedor/" + id)
    .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar o fornecedor");
        return response.json();
    })
    .then(data => {
        const f = data[0];
        document.getElementById("nome").value = f.nome;
        document.getElementById("cnpj").value = f.cnpj;
        document.getElementById("email").value = f.email;
        document.getElementById("telefone").value = f.telefone;
        document.getElementById("endereco").value = f.endereco;
        document.getElementById("id").value = f.id;
        modalCadastro.show();
    })
    .catch(error => {
        console.error("Erro ao buscar o fornecedor:", error);
    });
}

function listar() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "<tr><td colspan='6' class='text-center'>Carregando...</td></tr>";

    fetch("http://localhost:3333/fornecedor")
        .then(response => {
            if (!response.ok) throw new Error("Erro ao buscar fornecedor");
            return response.json();
        })
        .then(dados => mostrar(dados))
        .catch(error => {
            lista.innerHTML = `<tr><td colspan='6' class='text-danger text-center'>Erro ao buscar fornecedor</td></tr>`;
            console.error("Erro ao listar os fornecedores:", error);
        });
}

function excluir(id) {
    fetch("http://localhost:3333/fornecedor/" + id, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) throw new Error("Erro ao excluir o fornecedor");
        return response.text();
    })
    .then(() => listar())
    .catch(error => {
        console.error("Erro ao excluir o fornecedor:", error);
    });
}

function mostrar(dados) {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    dados.forEach(f => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${f.id}</td>
            <td>${f.nome}</td>
            <td>${f.cnpj}</td>
            <td>${f.email}</td>
            <td>${f.telefone}</td>
            <td>${f.endereco}</td>
            <td>
                <button onclick='editar(${f.id})'>Editar</button>
                <button onclick='excluir(${f.id})'>Excluir</button>
            </td>`;
        lista.appendChild(tr);
    });
}

listar();

function togglePretoBranco() {
    document.body.classList.toggle("preto-branco");
}
