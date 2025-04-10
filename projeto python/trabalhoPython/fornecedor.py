import pymysql
from db_config import connect_db
from flask import flash, request, Blueprint
from flask import jsonify


fornecedor_bp = Blueprint('fornecedor', __name__)

@fornecedor_bp.route('/fornecedor')
def fornecedor():
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM fornecedor")
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

@fornecedor_bp.route('/fornecedor/<int:id>')
def fornecedorbyid(id):
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM fornecedor WHERE id=" + str(id))
        row = cursor.fetchall()
        resp = jsonify(row[0])
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

@fornecedor_bp.route('/fornecedor/pesquisa/<string:pesquisa>')
def fornecedorbypesquisa(pesquisa):
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM time_futebol WHERE nome LIKE %s", (f"%{pesquisa}%",))
        row = cursor.fetchall()
        resp = jsonify(row[0])
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

@fornecedor_bp.route('/fornecedor', methods=['POST'])
def add_fornecedor():
    try:
        _json = request.json
        _nome = _json['nome']
        _cnpj = _json['cnpj']
        _email = _json['email'] 
        _telefone = _json['telefone']
        _endereco = _json['endereco']

        if _nome and _cnpj and _email and _telefone and _endereco and request.method == 'POST':
            sqlQuery = "INSERT INTO fornecedor(nome, cnpj, email, telefone, endereco) VALUES(%s, %s, %s, %s, %s)"
            data = (_nome, _cnpj, _email, _telefone, _endereco)
            conn = connect_db()
            cursor = conn.cursor()
            cursor.execute(sqlQuery, data)
            conn.commit()
            resp = jsonify('fornecedor adicionado com sucesso!')
            resp.status_code = 200
            return resp
        else:
            return not_found()
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@fornecedor_bp.route('/fornecedor/<int:id>', methods=['PUT'])
def update_fornecedor(id):
    try:
        _json = request.json
        _nome = _json['nome']
        _cnpj = _json['cnpj']
        _email = _json['email'] 
        _telefone = _json['telefone']
        _endereco = _json['endereco']

        if _nome and _cnpj and _email and _telefone and _endereco and request.method == 'PUT':
            sqlQuery = "UPDATE fornecedor SET nome=%s, cnpj=%s, email=%s, telefone=%s, endereco=%s WHERE id=%s"
            data = (_nome, _cnpj, _email, _telefone, _endereco, id)
            conn = connect_db()
            cursor = conn.cursor()
            cursor.execute(sqlQuery, data)
            conn.commit()
            resp = jsonify('fornecedor atualizado com sucesso!')
            resp.status_code = 200
            return resp
        else:
            return not_found()
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

@fornecedor_bp.route('/fornecedor/<int:id>', methods=['DELETE'])
def delete_fornecedor(id):
    try:
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM fornecedor WHERE id=%s", (id))
        conn.commit()
        resp = jsonify('fornecedor deletado com sucesso!')
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

