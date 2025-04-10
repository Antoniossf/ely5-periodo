import pymysql

DB_HOST = '127.0.0.1'
DB_USER = 'root'
DB_PASSWORD = 'root'
DB_NAME = 'fornecedores'

def connect_db():
    return pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, db=DB_NAME)
