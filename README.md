# OpticHome - Professional Eye Exam SchedulerThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



A modern, minimalist web application for managing home-based optical examinations and eyewear catalog. Built with Next.js 16, Sanity CMS, and Tailwind CSS.## Getting Started



## ✨ FeaturesFirst, run the development server:



### For Clients```bash

- 📸 **Frame Catalog** - Browse eyeglass frames with high-quality imagesnpm run dev

- 📅 **Easy Booking** - Schedule home eye exams with preferred date/time# or

- 🎯 **Frame Selection** - Select interested frames during bookingyarn dev

- 📱 **Mobile Responsive** - Works perfectly on all devices# or

pnpm dev

### For Business Owner# or

- 🏠 **Admin Dashboard** - View and manage all appointments in one placebun dev

- 💰 **Credit Tracking** - Track client payments and outstanding balances```

- 📊 **Appointment Status** - New Request, Confirmed, In Progress, Completed, Cancelled

- 📝 **Client Records** - Store prescription details, notes, and historyOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- 🖼️ **Easy Catalog Management** - Add/edit/delete frames via Sanity Studio

- 🔍 **No Coding Required** - Manage everything through visual interfacesYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.



## 🚀 Quick StartThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



### Prerequisites## Learn More

- Node.js 18+ installed

- A Sanity account (free tier available at [sanity.io](https://www.sanity.io))To learn more about Next.js, take a look at the following resources:



### Installation- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

1. **Clone the repository**

```bashYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

git clone <your-repo-url>

cd optic-scheduler## Deploy on Vercel

```

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

2. **Install dependencies**

```bashCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

pnpm install
# or
npm install
```

3. **Set up Sanity**
   - Go to [sanity.io/manage](https://www.sanity.io/manage)
   - Create a new project
   - Note your Project ID and Dataset name (usually "production")
   - Create an API token with "Editor" permissions

4. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Sanity credentials:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-11-25
SANITY_API_TOKEN=your_secret_token
```

5. **Run development server**
```bash
pnpm dev
```

6. **Access the application**
   - Main site: http://localhost:3000
   - Sanity Studio: http://localhost:3000/studio
   - Admin Dashboard: http://localhost:3000/admin

## 📁 Project Structure

```
optic-scheduler/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── catalog/page.tsx      # Frame catalog
│   │   ├── book/page.tsx         # Booking form
│   │   ├── admin/page.tsx        # Admin dashboard
│   │   ├── studio/               # Sanity Studio
│   │   └── api/
│   │       └── create-appointment/  # Booking API
│   ├── sanity/
│   │   ├── schemaTypes/          # Sanity schemas
│   │   │   ├── client.ts         # Client/Appointment schema
│   │   │   └── frame.ts          # Frame catalog schema
│   │   └── lib/
│   │       ├── client.ts         # Sanity client
│   │       └── image.ts          # Image URL builder
│   ├── lib/
│   │   └── validation.ts         # Validation utilities
│   └── test/                     # Test files
├── public/                       # Static assets
└── .env.local                    # Environment variables (create this)
```

## 🎨 Key Pages & Features

### 1. Homepage (`/`)
- Clean, minimalist landing page
- Two main CTAs: "View Frames" and "Book Exam"
- Professional, eye-catching design

### 2. Frame Catalog (`/catalog`)
- Grid layout of all available frames
- Filter by availability (only shows in-stock items)
- High-quality images with lazy loading
- Direct booking link for each frame

### 3. Booking Page (`/book`)
- Comprehensive form with validation
- Optional frame pre-selection from catalog
- Date/time picker for preferred appointments
- Email confirmation (expandable feature)

### 4. Admin Dashboard (`/admin`)
- **Stats Overview**: Total appointments, new requests, confirmed, credits owed
- **New Requests**: Highlighted section for immediate attention
- **Appointment Cards**: Full details including:
  - Client contact info
  - Appointment date/time
  - Address
  - Interested frame
  - Notes
  - Credit balance
- **Quick Edit**: Direct links to Sanity Studio for updates

### 5. Sanity Studio (`/studio`)
- Visual CMS for managing:
  - **Clients & Appointments**: Update status, add prescription details, track credits
  - **Glasses Catalog**: Upload/delete frames with drag-and-drop
  - **Credit History**: Log payments and charges

## 💳 Credit Tracking System

The app includes a built-in credit tracking system:

1. **Credit Balance Field**: Each client has a `creditBalance` (positive = owed to you)
2. **Credit History Array**: Track all transactions with date, amount, description
3. **Admin View**: See total credits owed across all clients
4. **Easy Updates**: Modify balances directly in Sanity Studio

### Example Workflow:
1. Complete exam and fitting → Add charge to credit history
2. Client makes payment → Add payment to credit history
3. Balance automatically visible in admin dashboard

## 🧪 Testing

Run tests with:
```bash
pnpm test          # Run tests once
pnpm test:ui       # Interactive UI
pnpm test:coverage # With coverage report
```

Tests include:
- Validation utilities
- Form input validation
- API route testing (expandable)
- Component rendering (expandable)

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SANITY_PROJECT_ID`
     - `NEXT_PUBLIC_SANITY_DATASET`
     - `NEXT_PUBLIC_SANITY_API_VERSION`
     - `SANITY_API_TOKEN`

3. **Deploy**
   - Vercel will automatically deploy on every push to main
   - Your site will be live at `https://your-project.vercel.app`

### Deploy Sanity Studio

Your Sanity Studio is automatically deployed with your Next.js app at `/studio`.

To deploy standalone:
```bash
pnpm sanity deploy
```

## 🔒 Security Best Practices

- ✅ API token is stored as a secret environment variable
- ✅ Input validation on both client and server
- ✅ Sanity token has minimum required permissions
- ⚠️ Consider adding authentication for `/admin` route in production
- ⚠️ Add rate limiting for API routes if needed

## 🛠️ Customization

### Change Brand Name
Edit `src/app/layout.tsx` and `src/app/page.tsx` to update "OpticHome" to your business name.

### Add More Frame Categories
Edit `src/sanity/schemaTypes/frame.ts` and add to the category list.

### Modify Appointment Statuses
Edit `src/sanity/schemaTypes/client.ts` status options.

### Customize Colors
Tailwind CSS is used throughout. Modify classes or extend `tailwind.config.js`.

## 📊 Analytics (Optional)

To add analytics, integrate:
- Google Analytics 4
- Vercel Analytics
- Plausible (privacy-friendly)

Add to `src/app/layout.tsx`.

## 🐛 Troubleshooting

### Build fails with "Module not found"
- Run `pnpm install` to ensure all dependencies are installed
- Check that `.env.local` has all required variables

### Images not loading
- Verify Sanity project ID is correct
- Check image URLs in browser console
- Ensure frames have uploaded photos

### Studio not accessible
- Check that route is at `/studio/[[...tool]]/page.tsx`
- Verify Sanity config in `sanity.config.ts`

## 📞 Support

For issues or questions:
1. Check existing issues on GitHub
2. Create a new issue with detailed description
3. Include error messages and steps to reproduce

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- CMS powered by [Sanity](https://www.sanity.io)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons from [Heroicons](https://heroicons.com)
