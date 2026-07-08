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
        
    # Create mask
    mask = np.zeros(img.shape[:2], dtype=np.uint8)
    h, w = img.shape[:2]
    
    # Only look at the top 50% of the image to avoid hitting logos/text on the can
    top_half = img[0:int(h*0.5), :]
    
    if color_type == "purple":
        # White and black
        lower_white = np.array([200, 200, 200, 255])
        upper_white = np.array([255, 255, 255, 255])
        lower_black = np.array([0, 0, 0, 255])
        upper_black = np.array([50, 50, 50, 255])
        
        mask_white = cv2.inRange(top_half, lower_white, upper_white)
        mask_black = cv2.inRange(top_half, lower_black, upper_black)
        mask[0:int(h*0.5), :] = cv2.bitwise_or(mask_white, mask_black)
        
    elif color_type == "black":
        # White
        lower_white = np.array([200, 200, 200, 255])
        upper_white = np.array([255, 255, 255, 255])
        mask_white = cv2.inRange(top_half, lower_white, upper_white)
        mask[0:int(h*0.5), :] = mask_white
        
    elif color_type == "gold":
        # Black
        lower_black = np.array([0, 0, 0, 255])
        upper_black = np.array([50, 50, 50, 255])
        mask_black = cv2.inRange(top_half, lower_black, upper_black)
        mask[0:int(h*0.5), :] = mask_black
        
    elif color_type == "silver":
        # Black
        lower_black = np.array([0, 0, 0, 255])
        upper_black = np.array([50, 50, 50, 255])
        mask_black = cv2.inRange(top_half, lower_black, upper_black)
        mask[0:int(h*0.5), :] = mask_black

    # Dilate mask slightly to get edges
    kernel = np.ones((5,5), np.uint8)
    mask = cv2.dilate(mask, kernel, iterations=1)
    
    cv2.imwrite(os.path.join(input_dir, f"mask_{filename}"), mask)
    
    # Inpaint
    # Convert img to BGR for inpainting (ignore alpha for a bit)
    bgr = img[:, :, :3]
    inpainted = cv2.inpaint(bgr, mask, 3, cv2.INPAINT_TELEA)
    
    # Restore alpha
    result = np.dstack((inpainted, img[:, :, 3]))
    
    cv2.imwrite(os.path.join(input_dir, f"eyeless_{filename}"), result)
    print(f"Processed {filename}")
