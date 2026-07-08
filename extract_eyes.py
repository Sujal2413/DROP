import cv2
import numpy as np
import os

input_dir = "/Users/apple/Downloads/DROP/public/assets"
files = {
    "login-can-purple.png": "purple",
    "login-can-black.png": "black",
    "login-can-gold.png": "gold",
    "login-can-silver.png": "silver"
}

for filename, color_type in files.items():
    filepath = os.path.join(input_dir, filename)
    img = cv2.imread(filepath, cv2.IMREAD_UNCHANGED)
    if img is None:
        continue
        
    h, w = img.shape[:2]
    mask = np.zeros((h, w), dtype=np.uint8)
    top_half = img[0:int(h*0.5), :]
    
    if color_type == "purple":
        lower_white = np.array([200, 200, 200, 255])
        upper_white = np.array([255, 255, 255, 255])
        lower_black = np.array([0, 0, 0, 255])
        upper_black = np.array([50, 50, 50, 255])
        mask_white = cv2.inRange(top_half, lower_white, upper_white)
        mask_black = cv2.inRange(top_half, lower_black, upper_black)
        mask[0:int(h*0.5), :] = cv2.bitwise_or(mask_white, mask_black)
    elif color_type == "black":
        lower_white = np.array([200, 200, 200, 255])
        upper_white = np.array([255, 255, 255, 255])
        mask[0:int(h*0.5), :] = cv2.inRange(top_half, lower_white, upper_white)
    elif color_type in ["gold", "silver"]:
        lower_black = np.array([0, 0, 0, 255])
        upper_black = np.array([50, 50, 50, 255])
        mask[0:int(h*0.5), :] = cv2.inRange(top_half, lower_black, upper_black)

    # Dilate slightly to ensure we capture the whole eye including anti-aliasing edges
    kernel = np.ones((5,5), np.uint8)
    mask = cv2.dilate(mask, kernel, iterations=1)
    
    # Create the eyes image: transparent everywhere except where the mask is
    eyes_img = np.zeros_like(img)
    eyes_img[mask > 0] = img[mask > 0]
    
    cv2.imwrite(os.path.join(input_dir, f"eyes_{filename}"), eyes_img)
    print(f"Created eyes_{filename}")
