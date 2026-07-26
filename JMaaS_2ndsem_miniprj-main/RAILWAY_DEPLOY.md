# 🚂 Deploy JMaaS to Railway - 100% FREE

## Why Railway?

- ✅ **Truly FREE** - $5 free credits every month (enough for small apps)
- ✅ **No credit card required** for free tier
- ✅ **Perfect for Express.js apps**
- ✅ **Auto-deploys from GitHub**
- ✅ **Fast deployment** (< 2 minutes)

---

## 🚀 Quick Deployment (5 Minutes)

### Step 1: Sign Up

1. Go to: https://railway.app
2. Click **"Start a New Project"**
3. Sign in with **GitHub** (no credit card needed!)

### Step 2: Deploy from GitHub

1. Click **"Deploy from GitHub repo"**
2. **Authorize Railway** to access your repositories
3. Select: **`purooshotam/JMaaS_2ndsem_miniprj`**
4. Railway will automatically:
   - Detect it's a Node.js app
   - Find your `package.json`
   - Set up build and start commands
   - Deploy your app!

### Step 3: Configure Root Directory

Since your code is in a subdirectory:

1. In Railway dashboard, click on your service
2. Go to **"Settings"** tab
3. Find **"Root Directory"**
4. Set it to: `JMaaS_2ndsem_miniprj-main`
5. Click **"Save"**
6. Railway will automatically redeploy

### Step 4: Get Your URL

1. Go to **"Settings"** tab
2. Scroll to **"Domains"**
3. Click **"Generate Domain"**
4. You'll get a URL like: `https://jmaas-production.up.railway.app`
5. Click it to open your app!

---

## 🎉 That's It!

Your app is now live and accessible worldwide!

---

## 💡 Railway Free Tier Details

- **$5 free credits/month** (renews monthly)
- Enough for ~500 hours of running time
- No credit card required
- Perfect for hobby projects and portfolios
- If app is inactive, it sleeps (saves credits)

---

## 🔧 Troubleshooting

### Build Failed?
Check the logs in Railway dashboard. Common issues:
- Make sure Root Directory is set to `JMaaS_2ndsem_miniprj-main`
- Verify `package.json` has correct start script

### App Not Loading?
- Wait 30 seconds for deployment to complete
- Check logs for port issues
- Ensure `server.js` uses `process.env.PORT`

### Need to Redeploy?
- Just push to GitHub - Railway auto-deploys!
- Or click "Deploy" button in Railway dashboard

---

## 📊 Manage Your App

### View Logs:
1. Click on your service
2. Go to "Deployments" tab
3. Click latest deployment
4. View real-time logs

### Environment Variables:
1. Go to "Variables" tab
2. Add any secrets or config

### Custom Domain:
1. Go to Settings → Domains
2. Add your custom domain (optional)

---

## 🆘 Still Having Issues?

Railway has great docs: https://docs.railway.app

---

**Your JMaaS app will be live at:**
`https://your-app-name.up.railway.app`

Share it everywhere! 🎉
