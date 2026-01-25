#!/bin/bash

# Setup script for Trail Journal PWA

echo "🏔️ Setting up Trail Journal..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Generate icons
if [ ! -f "public/icon-192.png" ]; then
    echo "🎨 Generating PWA icons..."
    node generate-icons.js
    node convert-icons.js
else
    echo "✅ Icons already exist"
fi

# Build the app
echo "🏗️  Building production app..."
npm run build

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the app, run: npm start"
echo "The app will be available at http://localhost:3000"
