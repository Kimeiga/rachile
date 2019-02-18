# USAGE
# Start the server:
#   python run_tf_server.py
# Submit a request via Python:
#   python simple_request.py

import sys
sys.path.insert(0, 'src')
from ImportGraph import ImportGraph
from utils import exists
from utils import save_img, get_img, exists, url_to_image
import transform, numpy as np, vgg, pdb, os

# import the necessary packages
import tensorflow as tf
import flask
import io
from PIL import Image
import base64
import scipy.misc, numpy as np, os, sys

# initialize our Flask application and the TF model
app = flask.Flask(__name__)

MODEL_PATH = "models/"
models = {}

def load_models(device_t):
    flag = True
    for filename in os.listdir(MODEL_PATH):
        if filename.endswith(".ckpt"): 
            graph = ImportGraph(MODEL_PATH + filename, device_t)
            print(filename)
            flag = False
            models[MODEL_PATH + filename] = graph
    if flag:
        print('No valid checkpoint files found - Flask server could not be started!')

# get img_shape
def ffwd(data_in, checkpoint_dir):
    batch_shape = (1,) + (256, 256, 3)
    X = np.zeros(batch_shape, dtype=np.float32)
    # img = get_img(data_in)
    img = url_to_image(data_in)
    img = scipy.misc.imresize(img, (256, 256, 3))
    X[0] = img

    _pred = models[checkpoint_dir].run(X)
    return _pred.astype(np.uint8)

@app.route("/predict", methods=["POST"])
def predict():
    # initialize the data dictionary that will be returned
    data = {"success": False}

    # ensure an image was properly uploaded to our endpoint
    if flask.request.method == "POST":
        if flask.request.form.get("image") and flask.request.form.get("model"):
            in_path = flask.request.form["image"]
            checkpoint_dir = flask.request.form["model"]

            '''if not os.path.isdir(in_path):
                output = ffwd(in_path, checkpoint_dir)
            else:
                print("Not a valid path to an image!")'''
            output = ffwd(in_path, checkpoint_dir)

            # initialize the prediction to return to the client
            image = Image.fromarray(output[0], 'RGB')
            with io.BytesIO() as output:
                image.save(output, format="jpeg")
                contents = base64.b64encode(output.getvalue()).decode('ascii')
            data["prediction"] = contents

            # indicate that the request was a success
            data["success"] = True

    # return the data dictionary as a JSON response
    return flask.jsonify(data)

# if this is the main thread of execution first load the model and
# then start the server
if __name__ == "__main__":
    print(("* Loading TensorFlow model and Flask starting server..."
        "please wait until server has fully started"))
    load_models(device_t='/cpu:0')
    app.run()