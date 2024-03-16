import cv2
import supervision as sv
import numpy as np
from ultralytics import YOLO

# Load the YOLO model
model = YOLO("Model\CarPark2.pt")

# Define the path to the input video
VIDEO_PATH = "Data\carpark.mp4"

# Function to process each frame of the video
def process_frame(frame: np.ndarray, _) -> np.ndarray:
    # Perform object detection on the frame using the YOLO model
    results = model(frame)[0]

    # Convert YOLO results to Supervision Detections
    detections = sv.Detections.from_ultralytics(results)

    # Annotate the frame with bounding boxes
    annotated_frame = sv.BoundingBoxAnnotator().annotate(scene=frame, detections=detections)

    # Annotate the frame with labels
    labels = [model.model.names[class_id] for class_id in detections.class_id]
    annotated_frame = sv.LabelAnnotator().annotate(scene=annotated_frame, detections=detections, labels=labels)

    return annotated_frame

# Process the video and save the annotated video
sv.process_video(source_path=VIDEO_PATH, target_path="annotated_video.mp4", callback=process_frame)

# Read the annotated video
cap = cv2.VideoCapture("annotated_video.mp4")

# Check if the video opened successfully
if not cap.isOpened():
    print("Error: Unable to open video")
    exit()

# Read and display each frame of the video
while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    cv2.imshow("Annotated Video", frame)
    if cv2.waitKey(25) & 0xFF == ord('q'):
        break

# Release the video capture object and close all windows
cap.release()
cv2.destroyAllWindows()
