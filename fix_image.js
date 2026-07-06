const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imgPath = path.join(__dirname, 'public/assets/new-can-variant-1.png');
const outPath = path.join(__dirname, 'public/assets/new-can-variant-1-fixed.png');

async function fixImage() {
  if (!fs.existsSync(imgPath)) {
    console.error("Image not found:", imgPath);
    return;
  }

  const metadata = await sharp(imgPath).metadata();
  const width = metadata.width;
  const height = metadata.height;
  
  const rectWidth = Math.floor(width * 0.35);
  const rectHeight = Math.floor(height * 0.15);
  
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
    
  console.log("Image fixed!");
}

fixImage();
