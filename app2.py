from flask import Flask, request, jsonify
import cv2
import numpy as np
from ultralytics import YOLO
import supervision as sv
import base64

app = Flask(__name__)

# Load the YOLO model
try:
    model = YOLO("Model/CarPark2.pt")
except FileNotFoundError:
    print("ERROR: YOLO model file not found.")
    exit()

# Function to perform object detection and annotation
def perform_detection(image, confidence_threshold):
    results = model(image)[0]
    detections = sv.Detections.from_ultralytics(results)

    bounding_box_annotator = sv.BoundingBoxAnnotator()
    label_annotator = sv.LabelAnnotator()

    labels = [
        model.model.names[class_id]
        for class_id
        in detections.class_id
    ]

    annotated_image = bounding_box_annotator.annotate(
        scene=image, detections=detections)
    annotated_image = label_annotator.annotate(
        scene=annotated_image, detections=detections, labels=labels)

    # Select the classes you want to count
    selected_classes = [0, 1]  # Assuming 0 is "car" and 1 is "free"
    detections = detections[np.isin(detections.class_id, selected_classes)]

    # Count the number of detections for each class
    car_count = len([label for label in labels if label == 'car'])
    free_count = len([label for label in labels if label == 'free'])

    return annotated_image, car_count, free_count

# Function to convert image bytes to base64 string
def convert_image_to_base64(image_bytes):
    encoded_image = base64.b64encode(image_bytes)
    return encoded_image.decode('utf-8')

@app.route('/detect', methods=['POST'])
def detect():
    if request.method == 'POST':
        # Get the image file from the request
        image_file = request.files['image']

        # Read the image file
        image_bytes = image_file.read()
        image = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_COLOR)

        # Set the confidence threshold (you can modify this as needed)
        confidence_threshold = 0.2

        # Perform object detection and annotation
        annotated_image, car_count, free_count = perform_detection(image, confidence_threshold)

        # Encode the annotated image as JPEG
        _, encoded_image = cv2.imencode('.jpg', annotated_image)

        # Convert the encoded image to base64 string
        encoded_image_base64 = convert_image_to_base64(encoded_image.tobytes())

        # Create a response dictionary
        response = {
            'image': encoded_image_base64,
            'car_count': car_count,
            'free_count': free_count
        }

        return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
