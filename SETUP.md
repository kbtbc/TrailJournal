# Quick Setup Guide

Follow these steps to get Trail Journal running locally in minutes!

## Automated Setup For Local Testing -- To Test on a live production environment (free), see the details in the README.md section on hosting on vercel.  

### Windows Users

1. Double-click `setup.bat`
2. Wait for the setup to complete
3. Run `npm start`
4. Open your browser to `http://localhost:3000`

### Mac/Linux Users

1. Open Terminal in the project folder
2. Run: `./setup.sh`
3. Run: `npm start`
4. Open your browser to `http://localhost:3000`

## Manual Setup

If the automated setup doesn't work, follow these steps:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Generate Icons** (if needed)
   ```bash
   node generate-icons.js
   node convert-icons.js
   ```

3. **Build the App**
   ```bash
   npm run build
   ```

4. **Start the Server**
   ```bash
   npm start
   ```

5. **Access the App**
   - Open `http://localhost:3000` in your browser

## Access from Mobile Device

### Same Network Method

1. Find your computer's IP address:
   - **Windows**: Open Command Prompt → type `ipconfig` → look for "IPv4 Address"
   - **Mac**: Open Terminal → type `ifconfig` → look for "inet" under your network adapter
   - **Linux**: Open Terminal → type `ip addr` → look for your local IP

2. On your phone's browser, go to:
   ```
   http://YOUR-IP-ADDRESS:3000
   ```
   Example: `http://192.168.1.100:3000`

### Deploy Online (Recommended)

For the best experience, deploy to a free hosting service like Vercel:

```bash
npm install -g vercel
vercel
```

Follow the prompts, and your app will be live on the internet!

## Install as Mobile App

Once you've accessed the app on your phone:

**iPhone (Safari):**
1. Tap the Share button
2. Scroll down → "Add to Home Screen"
3. Tap "Add"

**Android (Chrome):**
1. Tap the menu (⋮)
2. Tap "Install app" or "Add to Home Screen"
3. Tap "Install"

## Troubleshooting

- **Build fails**: Delete `node_modules` and `.next` folders, then run `npm install` again
- **Can't connect from phone**: Make sure both devices are on the same WiFi network
- **Icons not showing**: Run the icon generation scripts again

For detailed deployment options and more information, see the full [README.md](README.md).
