# 🚀 Quick Start Guide

Get your OpticHome website running in 10 minutes!

## Step 1: Install Node.js (if not installed)
Download from: https://nodejs.org (use LTS version)

## Step 2: Get Sanity Account
1. Go to: https://www.sanity.io
2. Click "Sign up" (free account)
3. Create new project
4. Remember your Project ID

## Step 3: Clone & Setup

```bash
# Navigate to your project folder
cd optic-scheduler

# Install dependencies (choose one)
pnpm install
# OR
npm install

# This will take 2-3 minutes
```

## Step 4: Configure Sanity

1. **Copy environment template:**
```bash
cp .env.example .env.local
```

2. **Get your Sanity credentials:**
   - Go to: https://www.sanity.io/manage
   - Click your project
   - Copy "Project ID"
   - Go to "API" tab
   - Click "Add API token"
   - Name it "Production Token"
   - Permissions: "Editor"
   - Copy the token (you'll only see it once!)

3. **Edit `.env.local` file:**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc12345    # Your Project ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-11-25
SANITY_API_TOKEN=skAbcD...                # Your token
```

## Step 5: Start Development Server

```bash
pnpm dev
# OR
npm run dev
```

## Step 6: Access Your Site

Open these URLs in your browser:

### Main Website
http://localhost:3000

### Sanity Studio (Content Management)
http://localhost:3000/studio

First time? It will ask you to log in with your Sanity account.

### Admin Dashboard
http://localhost:3000/admin

## Step 7: Add Your First Frame

1. Go to: http://localhost:3000/studio
2. Click "Glasses Catalog" in left sidebar
3. Click "+ Create" button
4. Fill in:
   - Frame Name: "Classic Aviator"
   - Upload a photo (drag & drop)
   - Category: "Unisex"
   - In Stock: ✅ (checked)
5. Click "Publish" (top right)

## Step 8: Test Booking

1. Go to: http://localhost:3000
2. Click "View Frames"
3. Click "Request This Frame" on your uploaded frame
4. Fill out the form and submit
5. Go to: http://localhost:3000/admin
6. See your appointment!

## Step 9: Update Appointment

1. From admin dashboard, click "Edit in Studio"
2. Change Status to "Confirmed"
3. Add some notes in "Optic Notes" field
4. Click "Publish"
5. Go back to admin - see the updated status!

## 🎉 Congratulations!

Your optical scheduler is running! Here's what to do next:

### Customize Your Site
- [ ] Change "OpticHome" to your business name in `src/app/page.tsx`
- [ ] Update metadata in `src/app/layout.tsx`
- [ ] Add your real frames with photos
- [ ] Test the booking flow

### Prepare for Production
- [ ] Read `DEPLOYMENT.md` for deployment checklist
- [ ] Get a custom domain (optional)
- [ ] Set up Vercel account for hosting

## 🆘 Troubleshooting

### Error: "Cannot find module..."
**Solution:** Run `pnpm install` or `npm install`

### Studio won't load
**Solution:** 
1. Check your Project ID in `.env.local`
2. Make sure you're logged into Sanity
3. Clear browser cache and reload

### No frames showing in catalog
**Solution:**
1. Make sure you published the frame (not just saved)
2. Check "In Stock" is checked
3. Refresh the page

### Appointment submission fails
**Solution:**
1. Check your API token in `.env.local`
2. Verify token has "Editor" permissions
3. Check browser console for errors

## 📚 Learn More

- **Full Documentation:** See `README.md`
- **Deployment Guide:** See `DEPLOYMENT.md`
- **Project Overview:** See `PROJECT_SUMMARY.md`

## 💡 Tips

1. **Testing:** Create a few test appointments with your own info
2. **Content:** Take photos of frames with good lighting, plain background
3. **Backup:** Export your Sanity data regularly
4. **Updates:** Keep frame catalog fresh, remove old items

## 🎯 Quick Reference

| Page | URL | Purpose |
|------|-----|---------|
| Homepage | http://localhost:3000 | Client-facing landing page |
| Catalog | http://localhost:3000/catalog | Browse frames |
| Book | http://localhost:3000/book | Schedule appointment |
| Admin | http://localhost:3000/admin | Manage appointments |
| Studio | http://localhost:3000/studio | Content management |

## ✅ Checklist for Going Live

Before deploying to production:

- [ ] All test data removed
- [ ] Real frames uploaded with good photos
- [ ] Business name updated throughout
- [ ] Contact info verified
- [ ] Test booking flow end-to-end
- [ ] Admin dashboard tested
- [ ] .env.local has correct values
- [ ] Read DEPLOYMENT.md

---

**Need Help?** Check the full README.md or create an issue on GitHub.

**Ready to Deploy?** Follow the instructions in DEPLOYMENT.md.
