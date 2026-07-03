import cv2
import numpy as np
from PIL import Image

# Load original JPEG
img = cv2.imread('public/Slightly_increase_the_width_of_202606301058.jpeg')
img_rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

# Load rembg mask
rembg = cv2.imread('public/assets/rembg_raw.png', cv2.IMREAD_UNCHANGED)
mask = rembg[:, :, 3]

# Find bounding box of the rembg mask
coords = cv2.findNonZero(mask)
x, y, w, h = cv2.boundingRect(coords)

# w is the width of the can. x is left, x+w is right.
# Let's draw an ellipse for the top curve and bottom curve to make a perfect cylinder mask!
# Actually, the rembg mask is already great for the top and sides. We just need to fix the bottom.
# The bottom of the can is usually an ellipse.
# Let's add an ellipse to the mask at the bottom.
# We need to guess the y-coordinate of the bottom of the can.
# In the JPEG, there is a shadow. Let's assume the can's bottom is around y+h, but maybe rembg cut it.
# Let's find where the sides (x and x+w) start to curve in.
# A can's profile is straight on the sides, then curves at the bottom.
# We can find the lowest y where the width is at least 95% of max width.

widths = []
for row in range(y, y+h):
    row_pixels = np.where(mask[row, :] > 128)[0]
    if len(row_pixels) > 0:
        widths.append((row, row_pixels[-1] - row_pixels[0]))

max_width = max([w for r, w in widths])
bottom_straight_y = y+h
for r, width in reversed(widths):
    if width > 0.95 * max_width:
        bottom_straight_y = r
        break

print(f"Max width: {max_width}, bottom straight y: {bottom_straight_y}")

# Let's create an ellipse. Center is at (x + w//2, bottom_straight_y).
# Axes are (w//2, int(w * 0.08)) - 0.08 is a typical curve ratio for cans.
center = (x + w//2, bottom_straight_y)
axes = (w//2, int(w * 0.07)) # Adjust this if needed

# Draw filled ellipse on the mask
cv2.ellipse(mask, center, axes, 0, 0, 180, 255, -1) # 0 to 180 degrees means bottom half of ellipse

# Smooth the mask
mask = cv2.GaussianBlur(mask, (5, 5), 0)

# Apply mask
img_rgba[:, :, 3] = mask

# Crop exactly to the new mask
coords = cv2.findNonZero(mask)
nx, ny, nw, nh = cv2.boundingRect(coords)
can_cropped = img_rgba[ny:ny+nh, nx:nx+nw]

# Save for inspection
cv2.imwrite('/Users/apple/.gemini/antigravity-ide/brain/e6f1adfd-2f22-45f4-9f5c-8711fd821ffe/fixed_can_crop.png', can_cropped)
print("Saved fixed_can_crop.png to artifacts!")
