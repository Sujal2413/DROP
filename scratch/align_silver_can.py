import os
import numpy as np
from PIL import Image

def align_can():
    # 1. Load the rembg output
    img_path = 'public/assets/new-can-2.png'
    img = Image.open(img_path).convert("RGBA")
    arr = np.array(img)
    alpha = arr[:, :, 3]
    
    # 2. Find bounding box of the can
    y_indices, x_indices = np.where(alpha > 10)
    if len(y_indices) == 0:
        print("Error: No can found in image!")
        return
        
    y_min, y_max = np.min(y_indices), np.max(y_indices)
    x_min, x_max = np.min(x_indices), np.max(x_indices)
    
    # Crop the can
    cropped = img.crop((x_min, y_min, x_max + 1, y_max + 1))
    
    # 3. Target dimensions
    # We want the can to have a height of 1298 (matching the black can't height)
    target_height = 1298
    aspect_ratio = cropped.width / cropped.height
    target_width = int(target_height * aspect_ratio)
    
    # Resize the cropped can
    resized_can = cropped.resize((target_width, target_height), Image.Resampling.LANCZOS)
    
    # 4. Create canvas of size 2752x1536
    canvas = Image.new("RGBA", (2752, 1536), (0, 0, 0, 0))
    
    # 5. Paste the resized can at the center
    # center X of canvas is 1376
    # center Y of canvas is 128 + 1298/2 = 777
    paste_x = 1376 - target_width // 2
    paste_y = 128
    
    canvas.paste(resized_can, (paste_x, paste_y), resized_can)
    
    # Save the aligned can
    canvas.save(img_path, "PNG")
    print(f"Successfully aligned and saved {img_path}")
    print(f"New bbox size: width={target_width}, height={target_height} at x={paste_x}, y={paste_y}")

if __name__ == '__main__':
    align_can()
