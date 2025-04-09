async function connect() {
    if (global.connection && global.connection.state !== "disconnected") {
        return global.connection;
    }

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'fornecedores'
    });
    global.connection = connection;
    return connection;
}

exports.post = async (req, res) => {
    const conn = await connect();
    const sql = "INSERT INTO fornecedor (nome, cnpj, email, telefone, endereco) VALUES (?, ?, ?, ?, ?)";
    const values = [req.body.nome, req.body.cnpj, req.body.email, req.body.telefone, req.body.endereco];
    await conn.query(sql, values);
    res.status(201).send("Fornecedor cadastrado com sucesso");
};

exports.put = async (req, res) => {
    const conn = await connect();
    const sql = "UPDATE fornecedor SET nome = ?, cnpj = ?, email = ?, telefone = ?, endereco = ? WHERE id = ?";
    const values = [req.body.nome, req.body.cnpj, req.body.email, req.body.telefone, req.body.endereco, req.params.id];
    await conn.query(sql, values);
    res.status(200).send("Fornecedor atualizado com sucesso");
};

exports.delete = async (req, res) => {
    const conn = await connect();
    const sql = "DELETE FROM fornecedor WHERE id = ?";
    await conn.query(sql, [req.params.id]);
    res.status(200).send("Fornecedor excluído com sucesso");
};

exports.get = async (req, res) => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM fornecedor");
    res.status(200).send(rows);
};

exports.getById = async (req, res) => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM fornecedor WHERE id = ?", [req.params.id]);

    if (!rows.length) {
        res.status(404).send("Fornecedor não encontrado");
    } else {
        res.status(200).send(rows);
    }
};
