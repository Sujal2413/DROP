from PIL import Image
from collections import Counter

input_path = 'public/assets/clove_can.jpeg'
input_image = Image.open(input_path)

# Sample a few points
w, h = input_image.size
points = [
    (int(w*0.1), int(h*0.1)),
    (int(w*0.9), int(h*0.1)),
    (int(w*0.1), int(h*0.5)),
    (int(w*0.9), int(h*0.5)),
    (int(w*0.1), int(h*0.9)),
    (int(w*0.9), int(h*0.9)),
]

for p in points:
    c = input_image.getpixel(p)
    hex_color = "#{:02x}{:02x}{:02x}".format(c[0], c[1], c[2])
    print(f"Point {p}: {hex_color}")
