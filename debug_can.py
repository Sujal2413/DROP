from PIL import Image
import numpy as np

img1 = Image.open('public/assets/new-can-variant-1.png')
img2 = Image.open('public/assets/golden-can-rounded.png')

a1 = np.array(img1)[:, :, 3]
a2 = np.array(img2)[:, :, 3]

# Find where the main can body is in a1 (alpha > 200)
y_indices1, x_indices1 = np.where(a1 > 200)

widths = []
for row in range(np.min(y_indices1), np.max(y_indices1)):
    row_pixels = np.where(a1[row, :] > 200)[0]
    if len(row_pixels) > 0:
        widths.append((row, row_pixels[-1] - row_pixels[0]))

max_width = max([w for r, w in widths])
bottom_y1 = max([r for r, w in widths if w > 0.9 * max_width])
print(f"Original can max solid width is {max_width}, ends around {bottom_y1}")

# Find my can in a2
y_indices2, x_indices2 = np.where(a2 > 100)
print(f"My can ends at {np.max(y_indices2)}")
