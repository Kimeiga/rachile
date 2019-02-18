# USAGE
# python simple_request.py

import sys
sys.path.insert(0, 'src')
from utils import save_img

# import the necessary packages
import requests
import scipy.misc, numpy as np, os, sys
import base64

# initialize the TF REST API endpoint URL along with the input
# image path
TF_REST_API_URL = "http://localhost:5000/predict"
IMAGE_PATH = "https://66.media.tumblr.com/e27a99628ae0ffa82a477f0dcd6faaf6/tumblr_nsxtxtSuUG1s3xbnmo1_1280.jpg"
MODEL_PATH = "models/scream.ckpt"
OUT_PATH = "out.jpg"

# construct the payload for the request
payload = {"image": IMAGE_PATH, "model": MODEL_PATH}

# submit the request
r = requests.post(TF_REST_API_URL, data=payload).json()

# ensure the request was sucessful
if r["success"]:
    with open("out.jpg", "wb") as out_file:
        out_file.write(base64.b64decode(r["prediction"].encode('ascii')))
# otherwise, the request failed
else:
    print("Request failed")