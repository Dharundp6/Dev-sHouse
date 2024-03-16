from ultralytics import YOLO
from ultralytics.solutions import distance_calculation
import cv2

import os
os.environ["KMP_DUPLICATE_LIB_OK"]="TRUE"

model = YOLO("Model\CarPark2.pt")
names = model.model.names

cap = cv2.VideoCapture("Data\carpark.mp4")
assert cap.isOpened(), "Error reading video file"
w, h, fps = (int(cap.get(x)) for x in (cv2.CAP_PROP_FRAME_WIDTH,cv2.CAP_PROP_FRAME_HEIGHT, cv2.CAP_PROP_FPS))

# Video writer
video_writer = cv2.VideoWriter("distance_calculation.avi",
                               cv2.VideoWriter_fourcc(*'mp4v'),
                               fps,
                               (w, h))

# Init distance-calculation obj
dist_obj = distance_calculation.DistanceCalculation()
dist_obj.set_args(names=names, view_img=True)

while cap.isOpened():
    success, im0 = cap.read()
    if not success:
        print("Video frame is empty or video processing has been successfully completed.")
        break

    tracks = model.track(im0, persist=True, show=False)
    im0 = dist_obj.start_process(im0, tracks)
    video_writer.write(im0)

cap.release()
video_writer.release()
cv2.destroyAllWindows()

# from ultralytics import YOLO
# from ultralytics.solutions import distance_calculation
# import cv2

# import os
# os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

# # Load YOLO model and get class names
# model = YOLO("Model\CarPark2.pt")
# names = model.model.names

# # Read the input image
# image_path = "Data\car5.jpg"  # Change this to the path of your input image
# image = cv2.imread(image_path)
# if image is None:
#     print("Error: Unable to read image.")
#     exit()

# # Initialize distance-calculation object
# dist_obj = distance_calculation.DistanceCalculation()
# dist_obj.set_args(names=names, view_img=True)

# # Perform object detection and distance calculation
# tracks = model.track(image, persist=True, show=False)
# annotated_image = dist_obj.start_process(image, tracks)

# # Display the annotated image
# cv2.imshow("Annotated Image", annotated_image)
# cv2.waitKey(0)
# cv2.destroyAllWindows()
