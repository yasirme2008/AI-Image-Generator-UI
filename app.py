from flask import Flask,request,render_template
from utils.inference import Inference
app = Flask(__name__)

inference = Inference()

@app.route('/')
def Home():
    return render_template("index.html")
   
@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    return inference.inference(data=data)
 
app.run(host='0.0.0.0',port=7860,debug=False)    