````markdown
# 🏠 Homz - Your Trusted Partner in Real Estate

![Homz Logo](./public/Homz_colorless.png)

## 📋 Overview

Homz is a comprehensive real estate platform that simplifies property transactions for Landlords, Property Managers, and Tenants. Built with Next.js 14, Homz provides a seamless experience for finding, managing, and renting properties across Nigeria.

### 🌟 Key Features

- **Property Listings**: Browse verified homes, land, and shortlets for sale or rent
- **Advanced Search & Filtering**: Search by location, property type, price range, and amenities
- **Property Management Dashboard**: Manage properties, tenants, and rent collection
- **Tenant Services**: Pay rent, save, pay bills, and communicate with property management
- **Enterprise Solutions**: Full property management suite for property managers
- **Featured Properties**: Showcase promoted listings with priority placement
- **Responsive Design**: Optimized for mobile, tablet, and desktop experiences

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/homzfront/homz.git
cd homz
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory with required environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
# Add other environment variables as needed
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Project Structure

```
homz/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (properties)/       # Property listing routes
│   │   │   ├── (listing)/      # Listing pages (rent, sales, land, shortlet)
│   │   │   └── components/     # Property-specific components
│   │   ├── dashboard/          # Dashboard system (5 types)
│   │   │   ├── tenant/         # Tenant dashboard
│   │   │   ├── property-owner/ # Property owner/landlord dashboard
│   │   │   ├── enterprise-property/ # Property manager dashboard
│   │   │   ├── list_Property/  # Property listing dashboard
│   │   │   └── security/       # Security personnel dashboard
│   │   ├── enterprise/         # Enterprise management features
│   │   ├── landlord/           # Landlord-specific pages
│   │   ├── tenant/             # Tenant-specific pages
│   │   └── layout.js           # Root layout
│   ├── api/                    # API service functions
│   ├── components/             # Reusable components
│   │   ├── auth/               # Authentication components
│   │   ├── general/            # General UI components
│   │   ├── layout/             # Layout components (Header, Footer)
│   │   └── shared/             # Shared components
│   ├── hooks/                  # Custom React hooks
│   ├── store/                  # Zustand state management
│   ├── utils/                  # Utility functions
│   └── validation/             # Form validation schemas
├── public/                     # Static assets
└── package.json
```

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Data Fetching**: TanStack Query (React Query)
- **UI Components**: Flowbite React, React Loading Skeleton
- **Image Carousel**: React Slick
- **Icons**: Custom SVG components

## 📱 Key Pages & Routes

### Public Routes
- `/` - Homepage with search and featured properties
- `/all` - All properties listing
- `/rent` - Properties for rent
- `/sales` - Properties for sale
- `/land` - Land listings
- `/shortlet` - Shortlet properties
- `/property/[slug]` - Individual property details

### Dynamic Routes
- `/rent/[location]` - Properties for rent by location
- `/rent/[location]/[propertyType]` - Filtered by location and type
- Similar patterns for sales, land, and shortlet

### Protected Routes - Dashboard System

Homz provides **5 specialized dashboards** for different user types:

#### 1. 🏢 **Tenant Dashboard** (`/dashboard/tenant`)
Complete tenant management portal with:
- **Dashboard**: Overview and analytics
- **Finance**: Rent payments and transactions
  - Activities: Payment history and records
- **Maintenance**: Submit and track maintenance requests
- **Estate Information**: View estate details and join estates
- **Access Control**: Manage property access
- **Profile**: Update personal information
- **Notifications**: Receive updates and alerts
- **Settings**: Configure account preferences
- **Support**: Get help and assistance

#### 2. 🏠 **Property Owner Dashboard** (`/dashboard/property-owner`)
Landlord management suite featuring:
- **Dashboard**: Property performance overview
- **Estates**: Manage multiple estates
  - Estate Info: Detailed estate information
  - Estate Dashboard: Individual estate analytics
  - Tenants: View tenants per estate
- **Tenants**: Tenant management
  - Tenant Profiles: View individual tenant details
- **Payments**: Rent collection and financial tracking
  - Activities: Transaction history
- **Maintenance**: Handle maintenance requests
- **Letter Head**: Generate official documents
- **Notifications**: Property and tenant alerts
- **Profile**: Owner account management
- **Settings**: Configure dashboard preferences
- **Support**: Access help resources

#### 3. 🏗️ **Enterprise Property Management Dashboard** (`/dashboard/enterprise-property`)
Full-featured property management platform with:
- **Dashboard**: Comprehensive analytics
- **Estates**: Multi-property estate management
- **Tenants**: Advanced tenant management
  - Tenant Profiles: Detailed tenant information
  - Tenant Poll: Create and manage tenant surveys
    - Create Poll: Design new polls
    - Poll Questions: Manage survey questions
    - Poll Preview: Review before publishing
    - Poll Responses: View tenant feedback
  - Reminders: Set up tenant reminders
  - Access Records: Track property access
- **Payments**: Revenue and rent collection
- **Expenses**: Track operational costs
- **Maintenance**: Facility management system
- **Request**: Handle tenant requests
- **Document Generation**: Create official documents
- **Letter Head**: Professional correspondence
- **Notifications**: System-wide alerts
- **Profile**: Company profile management
- **Settings**: Enterprise configurations
- **Support**: Priority support access

#### 4. 📋 **Property Listing Dashboard** (`/dashboard/list_Property`)
Dedicated property listing management:
- **Dashboard**: Listing analytics
- **Add Property**: Create new property listings
- **Properties**: View all listed properties
- **Edit Property**: Update property details
- **Preview Property**: Review listings before publishing
- **Profile**: Lister profile management

#### 5. 🔐 **Security Dashboard** (`/dashboard/security`)
Security personnel management portal:
- **Dashboard**: Security overview
- **Access Records**: Log and monitor property access
- **Profile**: Security personnel profile
- **Support**: Security-specific assistance

## 🔑 Key Features Implementation

### Search & Filter System
- Advanced filtering by location, property type, price range, bedrooms
- URL-based filter persistence
- Real-time search with debouncing
- Context-aware navigation between listing types

### Property Management
- Create, edit, and delete property listings
- Upload multiple property images with carousel display
- Mark properties as featured/promoted
- Track property views, clicks, and engagement metrics

### State Management
- Centralized property store with Zustand
- Filter state synchronization with URL parameters
- Pagination state management
- User authentication state

### Performance Optimizations
- Image optimization with Next.js Image component
- Lazy loading with skeleton loaders
- Debounced search and filter updates
- Optimized API calls with React Query

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint

# Sitemap
npm run postbuild    # Generate sitemap after build
```

## 🌐 Environment Variables

Required environment variables:
- `NEXT_PUBLIC_API_URL` - Backend API base URL
- Add others as needed for your deployment

## 📦 Build & Deployment

### Production Build
```bash
npm run build
npm start
```

### Deploy on Vercel
The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Configure environment variables
4. Deploy!

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 📞 Contact & Support

- **Website**: [homz.ng](https://homz.ng)
- **Email**: support@homz.ng
- **Phone**: 09160002460
- **Address**: 1st Floor, Marina Hub Suite, Foresight House, 163/165, Broad Street, Lagos Nigeria

## 🔗 Social Media

- [Instagram](https://www.instagram.com/homzng)
- [Facebook](https://www.facebook.com/homzng)
- [Twitter/X](https://twitter.com/homzng)
- [LinkedIn](https://linkedin.com/company/homzng)
- [Blog](http://blog.homz.ng/)

## 🙏 Acknowledgments

- Certified by NDPC (Nigeria Data Protection Commission)
- Serving 2,000+ happy clients
- Featured properties from trusted landlords and property managers

---

**Built with ❤️ by the Homz Team**
#   h o m z 
 
 
````
