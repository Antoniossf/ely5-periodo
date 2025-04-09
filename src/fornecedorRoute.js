const fornecedorController = require("./fornecedorController");

module.exports = (app) => {
    app.post("/fornecedor", fornecedorController.post);
    app.put("/fornecedor/:id", fornecedorController.put);
    app.delete("/fornecedor/:id", fornecedorController.delete);
    app.get("/fornecedor", fornecedorController.get);
    app.get("/fornecedor/:id", fornecedorController.getById);
}