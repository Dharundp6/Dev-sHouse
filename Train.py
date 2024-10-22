# -*- coding: utf-8 -*-
"""ModelTraining.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1gwoQLL5__eOIUe5urDZ7LzKH8o7T4Q3-
"""

# Commented out IPython magic to ensure Python compatibility.
#importing the Api key from RoboFlow
mkdir /content/Park
# %cd /content/Park
#pip install roboflow

from roboflow import Roboflow
rf = Roboflow(api_key="aoEpzwbMjrGbgTtzLOYG")
project = rf.workspace("bouakkaz144-lotfi-gmail-com").project("parking-lot-wketa")
version = project.version(5)
dataset = version.download("yolov8")

#Downloading the Libraries
#!pip install  ultralytics
#!pip install yolo

from ultralytics import YOLO

from IPython.display import display, Image

#Model Training
#!yolo task=detect mode=train model=yolov8x.pt data=/content/Park/parking-lot-5/data.yaml epochs=50 imgsz=650 plots=True

from google.colab import files
files.download('/content/runs/detect/train4')

zip -r /content/runs2.zip /content/runs/detect/train4



#ls Park/runs/detect/train3/

# Commented out IPython magic to ensure Python compatibility.
# %cd Park
Image(filename=f'/content/Park/runs/detect/train3/confusion_matrix.png', width=600)

# Commented out IPython magic to ensure Python compatibility.
# %cd Park
Image(filename=f'/content/Park/runs/detect/train3/results.png', width=600)

Image(filename=f'/content/Park/runs/detect/train3/train_batch282.jpg', width=600)

"""# **Validating Model**"""

#yolo task=detect mode=val model=/content/Park/runs/detect/train3/weights/best.pt data=/content/Park/parking-lot-5/data.yaml

"""# **Inference with the Model**"""

#yolo task=detect mode=predict model=/content/Park/runs/detect/train3/weights/best.pt conf=0.25 source=/content/parkings.jpeg save=True

import glob
from IPython.display import Image, display

for image_path in glob.glob(f'/content/Park/runs/detect/predict2/Car.jpg')[:3]:
      display(Image(filename=image_path, width=600))
      print("\n")