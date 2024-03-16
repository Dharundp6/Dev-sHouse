import streamlit as st
import cv2
import supervision as sv
import numpy as np
from ultralytics import YOLO

# Load the YOLO model
model = YOLO("Model\CarPark2.pt")

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

# Streamlit code
st.title("CarPark")

# Allow user to upload an image
uploaded_image = st.file_uploader("Upload Image", type=['jpg', 'jpeg', 'png'])

# Allow user to set confidence threshold
confidence_threshold = st.slider("Confidence Threshold", min_value=0.0, max_value=1.0, value=0.2, step=0.01)

# Button to trigger prediction
predict_button = st.button("Predict")

if predict_button and uploaded_image is not None:
    # Read the uploaded image
    image = cv2.imdecode(np.fromstring(uploaded_image.read(), np.uint8), cv2.IMREAD_COLOR)

    # Perform object detection and annotation
    annotated_image, car_count, free_count = perform_detection(image, confidence_threshold)

    # Print the car and free counts on the terminal
    print(f"0: {annotated_image.shape[1]}x{annotated_image.shape[0]} {car_count} cars, {free_count} frees")

    # Print the car and free counts on the image
    annotated_image = cv2.putText(annotated_image, f"car: {car_count}", (10, 30),
                                  cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)
    annotated_image = cv2.putText(annotated_image, f"free: {free_count}", (10, 60),
                                  cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)

    
    # Display annotated image
    st.image(annotated_image, channels="BGR", caption="Annotated Image")