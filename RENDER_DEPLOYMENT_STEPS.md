# 🚀 Deploy JMaaS to Render - Step by Step Guide

## ✅ Everything is Ready!

Your code is pushed to GitHub and configured for Render. Just follow these steps:

---

## 📋 Step-by-Step Instructions

### Step 1: Open Render
✅ **Already opened in your browser!** Or go to: https://render.com

---

### Step 2: Sign Up / Sign In

**If you don't have an account:**
1. Click **"Get Started for Free"** (top right)
2. Click **"GitHub"** button
3. Authorize Render to access your GitHub
4. You'll be redirected to Render Dashboard

**If you already have an account:**
1. Click **"Sign In"** (top right)
2. Sign in with GitHub

---

### Step 3: Create New Web Service

1. Click the **"New +"** button (top right corner)
2. Select **"Web Service"** from dropdown

---

### Step 4: Connect Your Repository

1. You'll see "Create a new Web Service"
2. Under "Connect a repository" section:
   - If you see your repositories, find: **`JMaaS_2ndsem_miniprj`**
   - If you don't see it, click **"+ Connect account"** and authorize more repos
3. Click **"Connect"** button next to `JMaaS_2ndsem_miniprj`

---

### Step 5: Configure the Service

Fill in these **exact values**:

#### Basic Information:
- **Name:** `jmaas-app` (or any name you want)
- **Region:** `Oregon (US West)` (or closest to you)
- **Branch:** `main` ✓ (should be auto-selected)

#### Build & Deploy Settings:
- **Root Directory:** `JMaaS_2ndsem_miniprj-main` ⚠️ **IMPORTANT!**
- **Environment:** `Node` (should be auto-detected)
- **Build Command:** `npm install`
- **Start Command:** `npm start`

#### Instance Type:
- Select **"Free"** plan (should show "$0/month")

---

### Step 6: Advanced Settings (Optional)

Scroll down to "Advanced" section (optional):
- **Auto-Deploy:** ✅ Yes (should be checked by default)
- **Pull Requests:** ❌ No (not needed)

---

### Step 7: Create Web Service

1. Click the big blue **"Create Web Service"** button at the bottom
2. Wait for deployment...

---

## ⏳ What Happens Next?

### You'll see:
```
Creating service...
Building...
Installing dependencies...
Starting server...
```

### Timeline:
- **0-2 min:** Creating service
- **2-4 min:** Building and installing dependencies
- **4-5 min:** Starting server
- **5 min:** ✅ **LIVE!**

---

## 🎉 Success Indicators

### When deployment succeeds, you'll see:
- **Green "Live"** badge at the top
- Your URL: `https://jmaas-app.onrender.com` (or similar)
- Logs showing: "JMaaS Prototype Server Running"

### Click your URL to test!

---

## 🔑 Test Your Deployment

1. Click the URL Render provides
2. You should see the JMaaS login page
3. Login with:
   - **Username:** `demo`
   - **Password:** `demo123`
4. Test all features!

---

## ⚠️ Troubleshooting

### If Build Fails:

**Error: "Root directory not found"**
- Solution: Make sure you typed `JMaaS_2ndsem_miniprj-main` exactly (case-sensitive)

**Error: "package.json not found"**
- Solution: Check Root Directory is set to `JMaaS_2ndsem_miniprj-main`

**Error: "Module not found"**
- Solution: Make sure Build Command is `npm install`

### If Service Doesn't Start:

**Check Logs:**
1. Click "Logs" tab in Render dashboard
2. Look for errors in red
3. Common issues:
   - Port already in use (shouldn't happen on Render)
   - Missing dependencies (run `npm install` in build command)

### If Page Shows Error:

**Check:**
1. Service is showing "Live" (green badge)
2. URL is correct
3. Wait 30 seconds (first request after sleep)

---

## 📊 What You Get (Free Tier)

✅ **750 hours/month** (enough for most projects)  
✅ **Automatic HTTPS**  
✅ **Custom domain** (you can add later)  
✅ **Automatic deploys** from GitHub  
✅ **Full file system access**  
✅ **All your features work!**  

⚠️ **Service sleeps after 15 min inactivity**  
→ First request after sleep takes ~30 seconds to wake up

---

## 🔗 After Deployment

### Your URLs:
- **Live App:** `https://jmaas-app.onrender.com` (or your chosen name)
- **Dashboard:** https://dashboard.render.com
- **GitHub:** https://github.com/purooshotam/JMaaS_2ndsem_miniprj

### Next Steps:
1. ✅ Test all features thoroughly
2. ✅ Add URL to your resume/portfolio
3. ✅ Share with professors/friends
4. ✅ Include in project documentation

---

## 💡 Render Dashboard Features

### After deployment, you can:
- **View Logs:** Real-time server logs
- **Restart Service:** Manual restart button
- **Redeploy:** Manually trigger new deployment
- **Environment Variables:** Add secrets/config
- **Custom Domain:** Add your own domain (yourdomain.com)
- **Metrics:** View CPU, memory usage
- **Scaling:** Upgrade to paid plan for always-on

---

## 🔄 Auto-Deploy

**Good news!** Every time you push to GitHub, Render will:
1. Detect the push
2. Automatically rebuild
3. Deploy new version
4. No manual steps needed!

---

## 📝 Configuration Summary

Here's what was configured:

```yaml
Name: jmaas-app
Environment: Node
Root Directory: JMaaS_2ndsem_miniprj-main
Build Command: npm install
Start Command: npm start
Region: Oregon
Plan: Free
Branch: main
Auto-Deploy: Yes
```

---

## ✨ What Makes Render Perfect for Your App

1. **Traditional Hosting** - Not serverless, your Express app runs normally
2. **File System** - Can read/write to `db/` folder
3. **Persistent Process** - Server stays running
4. **Easy Setup** - Just works without code changes
5. **Free Tier** - Perfect for demos and portfolios

---

## 🎓 For Your Resume/Portfolio

### What to write:
```
Jewellery Management System (JMaaS)
• Full-stack web application deployed on Render
• Built with Node.js, Express.js, and vanilla JavaScript
• Features: Inventory management, billing, customer CRM, analytics dashboard
• Real-time charts using Chart.js
• RESTful API backend with file-based persistence
• Responsive design for mobile and desktop
• Live Demo: https://jmaas-app.onrender.com
• Code: https://github.com/purooshotam/JMaaS_2ndsem_miniprj
```

---

## 🆘 Need Help?

### If you get stuck:
1. Check this guide again
2. Look at Render logs (in dashboard)
3. Verify Root Directory is set correctly
4. Make sure you pushed latest code to GitHub
5. Try redeploying manually

### Common First-Time Mistakes:
❌ Forgetting to set Root Directory  
❌ Typing wrong GitHub username  
❌ Not authorizing GitHub access  
❌ Selecting wrong branch  

✅ **Solution:** Follow this guide exactly!

---

## 🎯 Quick Checklist

Before clicking "Create Web Service", verify:

- [ ] Repository connected: `JMaaS_2ndsem_miniprj` ✓
- [ ] Branch: `main` ✓
- [ ] Root Directory: `JMaaS_2ndsem_miniprj-main` ✓
- [ ] Environment: `Node` ✓
- [ ] Build Command: `npm install` ✓
- [ ] Start Command: `npm start` ✓
- [ ] Plan: `Free` ✓

**All checked? Click "Create Web Service"!** 🚀

---

## 📸 Expected Timeline

```
0:00 - Click "Create Web Service"
0:30 - Service creating...
1:00 - Cloning repository...
1:30 - Analyzing code...
2:00 - Installing dependencies (npm install)...
3:00 - Build complete ✓
3:30 - Starting service...
4:00 - Server starting...
4:30 - Health check...
5:00 - ✅ LIVE! 🎉
```

**Total time: ~5 minutes**

---

## 🔑 Demo Credentials

When you visit your deployed app:

**Username:** `demo`  
**Password:** `demo123`

---

## 🌟 Success!

Once you see the **green "Live"** badge and can access your app at the provided URL, you're done!

**Congratulations! Your JMaaS application is now live on the internet!** 🎉

---

**Ready? Let's deploy!** Open https://render.com and follow the steps above! 🚀

---

*Created: July 26, 2026*
*Your app is ready for deployment - all configuration files are in place!*
