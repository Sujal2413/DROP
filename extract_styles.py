import re

css_content = open('scratch_css.css').read()

# Extract colors (hex)
colors = set(re.findall(r'#[0-9a-fA-F]{3,6}\b', css_content))
print("Colors:", colors)

# Extract spacing (padding/margin) with rem or px
spacings = set(re.findall(r'(?:padding|margin)[-a-z]*:\s*([0-9\.]+(?:rem|px|em))', css_content))
print("Spacings:", spacings)

# Extract font-sizes
font_sizes = set(re.findall(r'font-size:\s*([0-9\.]+(?:rem|px|em|vw))', css_content))
print("Font Sizes:", font_sizes)
