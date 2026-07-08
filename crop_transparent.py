import os
from PIL import Image

output_dir = "/Users/apple/Downloads/DROP/public/assets"

files = [
    "login-can-gold.png",
    "login-can-purple.png",
    "login-can-silver.png",
    "login-can-black.png"
]

for file_name in files:
    path = os.path.join(output_dir, file_name)
    try:
        img = Image.open(path)
        bbox = img.getbbox()
        if bbox:
            cropped = img.crop(bbox)
            cropped.save(path)
            print(f"Cropped {file_name} to {bbox}")
        else:
            print(f"Empty image: {file_name}")
    except Exception as e:
        print(f"Error processing {file_name}: {e}")
