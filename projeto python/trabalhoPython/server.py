from flask import Flask, send_from_directory
from PROJETOPYTHON.trabalhoPython.fornecedor import fornecedor_bp
import os
from flask_cors import CORS

app = Flask(__name__, static_url_path='', static_folder='static')
CORS(app, origins=["http://localhost:5000"])

app.register_blueprint(fornecedor_bp)

@app.route('/')
def index():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'index.html')

if __name__ == "__main__":
    app.run(debug=True)

