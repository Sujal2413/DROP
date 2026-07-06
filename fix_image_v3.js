const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imgPath = path.join(__dirname, 'public/assets/new-can-variant-1-clean.png');
const outPath = path.join(__dirname, 'public/assets/new-can-variant-1-v3.png');

async function fixImage() {
  const metadata = await sharp(imgPath).metadata();
  const width = metadata.width;
  const height = metadata.height;
  
  // Wipe out the bottom 25% of the right half entirely.
  const rectWidth = Math.floor(width * 0.5);
  const rectHeight = Math.floor(height * 0.25);
  
  const transparentRect = Buffer.from(
    `<svg width="${rectWidth}" height="${rectHeight}">
       <rect x="0" y="0" width="${rectWidth}" height="${rectHeight}" fill="#000" />
     </svg>`
  );

  await sharp(imgPath)
    .composite([
      {
        input: transparentRect,
        left: width - rectWidth,
        top: height - rectHeight,
        blend: 'dest-out'
      }
    ])
    .toFile(outPath);
    
  console.log("Image v3 fixed!");
}

fixImage();
