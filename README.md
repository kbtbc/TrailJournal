# Trail Journal - Free Mobile Web App by BigFun Hikes (And AI)

A mobile-first Progressive Web App (PWA) for tracking your thru-hike journey. Log daily miles, journal entries, expenses, and gear all from your mobile device, even offline.  Based on Spreadsheet tool from https://www.lengthytravel.com/try-this-free-long-distance-hike-thru-hike-tracking-tool/

> **🚀 Quick Start**: Want to get started right away? See [SETUP.md](SETUP.md) for a simplified setup guide with automated scripts!

## Features

- **Password Protected**: Secure site-wide authentication to protect your private journal
- **Daily Log**: Track miles, locations, elevation, weather, and more
- **Journal**: Write and edit detailed journal entries with hashtags
- **Stats**: View your hiking statistics and progress
- **Expenses**: Track trail expenses and spending
- **Gear**: Manage your gear list and weights
- **Offline Support**: Works without internet connection
- **Install to Home Screen**: Use like a native mobile app
- **Mobile Optimized**: Touch-friendly interface designed for phones

## Quick Start for End Users

### Prerequisites

- Node.js 18+ installed on your computer
- A smartphone or tablet for using the app

### Installation Steps

1. **Download the Project**

   Download this project and extract it to a folder on your computer.

2. **Install Dependencies**

   Open a terminal/command prompt in the project folder and run:

   ```bash
   npm install
   ```

3. **Build the App**

   ```bash
   npm run build
   ```

4. **Start the Server**

   ```bash
   npm start
   ```

   The app will be running at `http://localhost:3000`

5. **Access from Your Phone**

   **Option A: On the Same Network**
   - Find your computer's local IP address:
     - Windows: Open Command Prompt, type `ipconfig`, look for "IPv4 Address"
     - Mac/Linux: Open Terminal, type `ifconfig` or `ip addr`, look for your local IP (usually starts with 192.168)
   - On your phone's browser, go to `http://YOUR-IP-ADDRESS:3000`
   - Example: `http://192.168.1.100:3000`

   **Option B: Deploy to the Internet** (recommended for regular use)
   - See the "Deployment Options" section below

6. **Install to Home Screen**

   **On iPhone:**
   1. Open the app in Safari
   2. Tap the Share button (square with arrow)
   3. Scroll down and tap "Add to Home Screen"
   4. Tap "Add"

   **On Android:**
   1. Open the app in Chrome
   2. Tap the menu (three dots)
   3. Tap "Install app" or "Add to Home Screen"
   4. Tap "Install"

   Now you can launch Trail Journal like any other app on your phone!

## Deployment Options

For long-term use, deploy your app to one of these platforms:

### Option 1: Vercel (Recommended - Easiest & Free)

1. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Deploy**
   ```bash
   vercel
   ```

   Follow the prompts (press Enter to accept defaults). Your app will be live in minutes!

4. **Custom Domain (Optional)**
   - In Vercel dashboard, go to your project settings
   - Add your custom domain under "Domains"

**Your app will be live at**: `https://your-project-name.vercel.app`

### Option 2: Netlify (Free)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   netlify deploy --prod
   ```

3. **Follow the prompts**
   - Choose "Create & configure a new site"
   - Select your team
   - Choose a site name
   - Set publish directory to: `.next`

**Your app will be live at**: `https://your-site-name.netlify.app`

### Option 3: Railway (Free Tier Available)

1. **Sign up at [railway.app](https://railway.app)**

2. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

3. **Login and Deploy**
   ```bash
   railway login
   railway init
   railway up
   ```

### Option 4: DigitalOcean App Platform (Starting at $5/month)

1. Sign up at [digitalocean.com](https://www.digitalocean.com)
2. Create new App
3. Connect your repository or upload the project
4. DigitalOcean will detect Next.js and deploy automatically

### Option 5: Self-Host on Your Own Server

If you have a VPS or home server:

1. **Install Node.js** on your server

2. **Upload the project** to your server

3. **Install and build**
   ```bash
   npm install
   npm run build
   ```

4. **Run with PM2** (keeps app running)
   ```bash
   npm install -g pm2
   pm2 start npm --name "trail-journal" -- start
   pm2 save
   pm2 startup
   ```

5. **Setup nginx** as reverse proxy (optional but recommended)
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Data Storage

**Important**: This app stores all data locally in your browser's storage (localStorage). This means:

- ✅ Your data is private and stays on your device
- ✅ Works offline
- ❌ Data is not backed up automatically
- ❌ Clearing browser data will delete your entries

**To backup your data:**
1. Use your browser's developer tools to export localStorage
2. Or add a future export/import feature to the app
3. Consider implementing a backend database for multi-device sync (requires additional development)

## Security & Admin Protection

**Password Protection for Your Private Journal**

The entire app is password-protected to keep your private journal entries secure. Here's how to set it up:

1. **Create your password file**

   Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. **Set your password**

   Edit `.env.local` and change the password:
   ```
   NEXT_PUBLIC_ADMIN_PASSWORD=YourSecurePassword123!
   ```

   Choose a strong, unique password. This file is automatically ignored by git for security.

   **Default password for demo purposes**: `demo` (Change this immediately!)

3. **For deployments** (Vercel, Netlify, etc.)

   Add the environment variable in your deployment platform's settings:
   - **Vercel**: Project Settings > Environment Variables
   - **Netlify**: Site Settings > Environment Variables
   - **Railway**: Project > Variables

   Set:
   - Name: `NEXT_PUBLIC_ADMIN_PASSWORD`
   - Value: Your chosen password

4. **How it works**
   - Users must enter the password before accessing any part of the app
   - The password is stored in your browser session
   - Closing the browser or clicking "Logout" will require re-authentication
   - All your journal entries and data remain private

5. **Important Notes**
   - Never commit `.env.local` to version control
   - Use different passwords for development and production
   - Share the password only with people you trust
   - This is ideal for personal journals or small groups

**Running Offline Without Public Access**

If you only want to run the app locally without deploying it online:

1. Start the server on your computer (see Quick Start above)
2. Access only from your local network (e.g., `http://192.168.x.x:3000`)
3. Don't deploy to Vercel, Netlify, or other hosting platforms
4. Your data stays completely private on your device
5. Still set a password in `.env.local` for basic security

## Customization

### Change Colors

Edit `/src/app/globals.css`:

```css
:root {
  --forest-green: #4a7c59;      /* Primary color */
  --forest-green-dark: #2d5016; /* Dark accent */
  --warm-amber: #f4a261;         /* Secondary color */
  --warm-orange: #e07a5f;        /* Accent color */
  --cream: #faf9f6;              /* Background */
}
```

### Change App Name

1. Edit `/public/manifest.json` - change "name" and "short_name"
2. Edit `/src/app/layout.tsx` - change the title in metadata

### Add New Features

The app is built with Next.js and React. Component files are in `/src/components/`.

## Development

To run in development mode with hot reloading:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Troubleshooting

### App won't install on iPhone
- Make sure you're using Safari (not Chrome or other browsers)
- iOS 11.3+ is required for PWA support

### Data disappeared
- Check if browser data/cache was cleared
- Make sure you're using the same browser where data was saved

### Can't access from phone
- Ensure phone and computer are on the same WiFi network
- Check your computer's firewall settings
- Try disabling VPN if enabled

### Build errors
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Make sure you're using Node.js 18+

## Tech Stack

- **Framework**: Next.js 16
- **UI**: React 19 with Tailwind CSS 4
- **Type Safety**: TypeScript
- **PWA**: Custom manifest and service worker ready

## Browser Support

- **iOS**: Safari 11.3+
- **Android**: Chrome 70+
- **Desktop**: All modern browsers (Chrome, Firefox, Safari, Edge)

## License

This is a personal project. Use and modify as you wish for your own thru-hiking adventures!

## Need Help?

If you run into issues:
1. Check the Troubleshooting section above
2. Make sure all prerequisites are installed
3. Try the build process step by step
4. Check browser console for error messages

---

**Happy Hiking!** 🥾🏔️
# TrailJournal
