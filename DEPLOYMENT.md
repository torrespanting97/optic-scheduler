# Deployment Checklist

Use this checklist before deploying to production.

## Pre-Deployment

### Environment Variables
- [ ] All environment variables are set in Vercel/hosting platform
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- [ ] `NEXT_PUBLIC_SANITY_DATASET` is set to `production`
- [ ] `SANITY_API_TOKEN` has correct permissions (Editor)
- [ ] API token is kept secret (not in git)

### Sanity CMS
- [ ] Sanity project is created
- [ ] Dataset is initialized
- [ ] At least one frame is added to catalog for testing
- [ ] Sanity Studio is accessible locally at `/studio`
- [ ] CORS origins include your production domain

### Code Quality
- [ ] No console errors in browser
- [ ] All TypeScript errors resolved
- [ ] Run `pnpm build` successfully
- [ ] Test all pages locally
- [ ] Verify responsive design on mobile

### Testing
- [ ] Homepage loads correctly
- [ ] Catalog page displays frames
- [ ] Booking form submits successfully
- [ ] Admin dashboard shows appointments
- [ ] Sanity Studio loads and allows edits

### Content
- [ ] Update brand name from "OpticHome" if needed
- [ ] Add real frames with photos to catalog
- [ ] Customize homepage copy
- [ ] Add business contact information

### Security
- [ ] API routes validate input
- [ ] Sensitive data is not exposed in client
- [ ] Consider adding auth for `/admin` route
- [ ] Rate limiting considered for API routes

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy to Vercel
1. Go to https://vercel.com
2. Import GitHub repository
3. Add environment variables
4. Click Deploy

### 3. Configure Sanity CORS
1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to API settings
4. Add your production URL to CORS origins
   - `https://your-domain.vercel.app`

### 4. Test Production
- [ ] Visit production URL
- [ ] Test booking form
- [ ] Check admin dashboard
- [ ] Verify Sanity Studio works at `/studio`
- [ ] Test on mobile device

## Post-Deployment

### Monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Enable Vercel Analytics
- [ ] Monitor API usage in Sanity dashboard

### Optimization
- [ ] Check Lighthouse scores
- [ ] Optimize images if needed
- [ ] Review performance metrics

### Documentation
- [ ] Update README with production URL
- [ ] Document any custom configurations
- [ ] Share admin credentials securely

### Backup
- [ ] Export Sanity dataset regularly
- [ ] Keep backups of environment variables
- [ ] Document deployment process

## Optional Enhancements

### Future Features
- [ ] Email notifications for new appointments
- [ ] SMS reminders for appointments
- [ ] Client portal for viewing prescription history
- [ ] Payment integration (Stripe, PayPal)
- [ ] Calendar integration (Google Calendar)
- [ ] Photo gallery for completed work
- [ ] Client testimonials section
- [ ] Multi-language support

### SEO
- [ ] Add sitemap.xml
- [ ] Add robots.txt
- [ ] Optimize meta descriptions
- [ ] Add structured data (Schema.org)
- [ ] Create social media preview images

### Security Enhancements
- [ ] Add authentication for admin routes
- [ ] Implement rate limiting
- [ ] Add CAPTCHA to booking form
- [ ] Enable Vercel Web Application Firewall
- [ ] Regular security audits

## Troubleshooting

### Common Issues

**Build fails on Vercel**
- Check environment variables are set
- Verify all dependencies are in package.json
- Check build logs for specific errors

**Sanity Studio not loading**
- Verify CORS settings in Sanity
- Check environment variables
- Clear browser cache

**Images not displaying**
- Verify Sanity project ID
- Check image URLs in network tab
- Ensure frames have photos uploaded

**API errors**
- Check Sanity token permissions
- Verify API version in env vars
- Check network tab for error details

## Support Contacts

- Vercel Support: https://vercel.com/support
- Sanity Support: https://www.sanity.io/help
- Next.js Docs: https://nextjs.org/docs

## Notes

Add any project-specific notes or configurations here:

---

Last Updated: [Date]
Deployed By: [Name]
Production URL: [URL]
