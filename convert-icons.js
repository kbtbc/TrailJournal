// Convert SVG icons to PNG using sharp
const fs = require('fs');
const sharp = require('sharp');

async function convertIcons() {
  try {
    // Convert 192x192 icon
    await sharp('public/icon-192.svg')
      .resize(192, 192)
      .png()
      .toFile('public/icon-192.png');

    console.log('✅ Created icon-192.png');

    // Convert 512x512 icon
    await sharp('public/icon-512.svg')
      .resize(512, 512)
      .png()
      .toFile('public/icon-512.png');

    console.log('✅ Created icon-512.png');

    // Create apple touch icon (180x180)
    await sharp('public/icon-192.svg')
      .resize(180, 180)
      .png()
      .toFile('public/apple-touch-icon.png');

    console.log('✅ Created apple-touch-icon.png');

    console.log('\n🎉 All icons generated successfully!');
  } catch (error) {
    console.error('Error converting icons:', error);
    process.exit(1);
  }
}

convertIcons();
