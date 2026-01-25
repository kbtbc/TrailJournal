// Simple script to generate PWA icons
// Run with: node generate-icons.js

const fs = require('fs');

// Create a simple SVG icon with a mountain/trail theme
const createIcon = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#2d5016"/>
  <g transform="translate(${size/2}, ${size/2})">
    <!-- Mountain/Trail -->
    <path d="M-${size*0.3},${size*0.2} L-${size*0.1},-${size*0.2} L${size*0.1},${size*0.1} L${size*0.3},${size*0.2} Z"
          fill="#4a7c59"/>
    <path d="M-${size*0.15},${size*0.2} L${size*0.05},-${size*0.3} L${size*0.25},${size*0.2} Z"
          fill="#f4a261"/>
    <!-- Boot/Hiker icon -->
    <ellipse cx="${size*0.05}" cy="${size*0.1}" rx="${size*0.08}" ry="${size*0.06}" fill="#faf9f6"/>
  </g>
</svg>`;

// Save SVG icons
fs.writeFileSync('public/icon-192.svg', createIcon(192));
fs.writeFileSync('public/icon-512.svg', createIcon(512));

console.log('✅ SVG icons generated successfully!');
console.log('📝 Note: For production, convert these to PNG using an online tool like:');
console.log('   - https://cloudconvert.com/svg-to-png');
console.log('   - Or use ImageMagick: convert icon-192.svg icon-192.png');
