# 🏠 Homz - Your Trusted Partner in Real Estate# 🏠 Homz - Your Trusted Partner in Real Estate



![Homz Logo](./public/Homz_colorless.png)![Homz Logo](./public/Homz_colorless.png)



## 📋 Overview## 📋 Overview



Homz is a comprehensive real estate platform that simplifies property transactions for Landlords, Property Managers, and Tenants. Built with Next.js 14, Homz provides a seamless experience for finding, managing, and renting properties across Nigeria.Homz is a comprehensive real estate platform that simplifies property transactions for Landlords, Property Managers, and Tenants. Built with Next.js 14, Homz provides a seamless experience for finding, managing, and renting properties across Nigeria.



### 🌟 Key Features### 🌟 Key Features



- **Property Listings**: Browse verified homes, land, and shortlets for sale or rent- **Property Listings**: Browse verified homes, land, and shortlets for sale or rent

- **Advanced Search & Filtering**: Search by location, property type, price range, and amenities- **Advanced Search & Filtering**: Search by location, property type, price range, and amenities

- **Property Management Dashboard**: Manage properties, tenants, and rent collection- **Property Management Dashboard**: Manage properties, tenants, and rent collection

- **Tenant Services**: Pay rent, save, pay bills, and communicate with property management- **Tenant Services**: Pay rent, save, pay bills, and communicate with property management

- **Enterprise Solutions**: Full property management suite for property managers- **Enterprise Solutions**: Full property management suite for property managers

- **Featured Properties**: Showcase promoted listings with priority placement- **Featured Properties**: Showcase promoted listings with priority placement

- **Responsive Design**: Optimized for mobile, tablet, and desktop experiences- **Responsive Design**: Optimized for mobile, tablet, and desktop experiences



## 🚀 Getting Started## 🚀 Getting Started



### Prerequisites### Prerequisites



- Node.js 18.x or higher- Node.js 18.x or higher

- npm, yarn, pnpm, or bun package manager- npm, yarn, pnpm, or bun package manager



### Installation### Installation



1. Clone the repository:1. Clone the repository:

```bash

```bashgit clone https://github.com/homzfront/homz.git

git clone https://github.com/homzfront/homz.gitcd homz

cd homz```

```

2. Install dependencies:

2. Install dependencies:```bash

npm install

```bash# or

npm installyarn install

# or# or

yarn installpnpm install

# or```

pnpm install

```3. Create a `.env.local` file in the root directory with required environment variables:

```env

3. Create a `.env.local` file in the root directory with required environment variables:NEXT_PUBLIC_API_URL=your_api_url

# Add other environment variables as needed

```env```

NEXT_PUBLIC_API_URL=your_api_url

# Add other environment variables as needed4. Run the development server:

``````bash

npm run dev

4. Run the development server:# or

yarn dev

```bash# or

npm run devpnpm dev

# or# or

yarn devbun dev

# or```

pnpm dev

# or5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

bun dev

```## 🏗️ Project Structure



5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.```

homz/

## 🏗️ Project Structure├── src/

│   ├── app/                    # Next.js 14 App Router

```│   │   ├── (properties)/       # Property listing routes

homz/│   │   │   ├── (listing)/      # Listing pages (rent, sales, land, shortlet)

├── src/│   │   │   └── components/     # Property-specific components

│   ├── app/                    # Next.js 14 App Router│   │   ├── dashboard/          # Dashboard system (5 types)

│   │   ├── (properties)/       # Property listing routes│   │   │   ├── tenant/         # Tenant dashboard

│   │   │   ├── (listing)/      # Listing pages (rent, sales, land, shortlet)│   │   │   ├── property-owner/ # Property owner/landlord dashboard

│   │   │   └── components/     # Property-specific components│   │   │   ├── enterprise-property/ # Property manager dashboard

│   │   ├── dashboard/          # Dashboard system (5 types)│   │   │   ├── list_Property/  # Property listing dashboard

│   │   │   ├── tenant/         # Tenant dashboard│   │   │   └── security/       # Security personnel dashboard

│   │   │   ├── property-owner/ # Property owner/landlord dashboard│   │   ├── enterprise/         # Enterprise management features

│   │   │   ├── enterprise-property/ # Property manager dashboard│   │   ├── landlord/           # Landlord-specific pages

│   │   │   ├── list_Property/  # Property listing dashboard│   │   ├── tenant/             # Tenant-specific pages

│   │   │   └── security/       # Security personnel dashboard│   │   └── layout.js           # Root layout

│   │   ├── enterprise/         # Enterprise management features│   ├── api/                    # API service functions

│   │   ├── landlord/           # Landlord-specific pages│   ├── components/             # Reusable components

│   │   ├── tenant/             # Tenant-specific pages│   │   ├── auth/               # Authentication components

│   │   └── layout.js           # Root layout│   │   ├── general/            # General UI components

│   ├── api/                    # API service functions│   │   ├── layout/             # Layout components (Header, Footer)

│   ├── components/             # Reusable components│   │   └── shared/             # Shared components

│   │   ├── auth/               # Authentication components│   ├── hooks/                  # Custom React hooks

│   │   ├── general/            # General UI components│   ├── store/                  # Zustand state management

│   │   ├── layout/             # Layout components (Header, Footer)│   ├── utils/                  # Utility functions

│   │   └── shared/             # Shared components│   └── validation/             # Form validation schemas

│   ├── hooks/                  # Custom React hooks├── public/                     # Static assets

│   ├── store/                  # Zustand state management└── package.json

│   ├── utils/                  # Utility functions```

│   └── validation/             # Form validation schemas

├── public/                     # Static assets## 🎨 Tech Stack

└── package.json

```- **Framework**: Next.js 14 (App Router)

- **Language**: JavaScript

## 🎨 Tech Stack- **Styling**: Tailwind CSS

- **State Management**: Zustand

- **Framework**: Next.js 14 (App Router)- **Animations**: Framer Motion

- **Language**: JavaScript- **Forms**: React Hook Form

- **Styling**: Tailwind CSS- **Data Fetching**: TanStack Query (React Query)

- **State Management**: Zustand- **UI Components**: Flowbite React, React Loading Skeleton

- **Animations**: Framer Motion- **Image Carousel**: React Slick

- **Forms**: React Hook Form- **Icons**: Custom SVG components

- **Data Fetching**: TanStack Query (React Query)

- **UI Components**: Flowbite React, React Loading Skeleton## 📱 Key Pages & Routes

- **Image Carousel**: React Slick

- **Icons**: Custom SVG components### Public Routes

- `/` - Homepage with search and featured properties

## 📱 Key Pages & Routes- `/all` - All properties listing

- `/rent` - Properties for rent

### Public Routes- `/sales` - Properties for sale

- `/land` - Land listings

- `/` - Homepage with search and featured properties- `/shortlet` - Shortlet properties

- `/all` - All properties listing- `/property/[slug]` - Individual property details

- `/rent` - Properties for rent

- `/sales` - Properties for sale### Dynamic Routes

- `/land` - Land listings- `/rent/[location]` - Properties for rent by location

- `/shortlet` - Shortlet properties- `/rent/[location]/[propertyType]` - Filtered by location and type

- `/property/[slug]` - Individual property details- Similar patterns for sales, land, and shortlet



### Dynamic Routes### Protected Routes - Dashboard System



- `/rent/[location]` - Properties for rent by locationHomz provides **5 specialized dashboards** for different user types:

- `/rent/[location]/[propertyType]` - Filtered by location and type

- Similar patterns for sales, land, and shortlet#### 1. 🏢 **Tenant Dashboard** (`/dashboard/tenant`)

Complete tenant management portal with:

### Protected Routes - Dashboard System- **Dashboard**: Overview and analytics

- **Finance**: Rent payments and transactions

Homz provides **5 specialized dashboards** for different user types:  - Activities: Payment history and records

- **Maintenance**: Submit and track maintenance requests

#### 1. 🏢 **Tenant Dashboard** (`/dashboard/tenant`)- **Estate Information**: View estate details and join estates

- **Access Control**: Manage property access

Complete tenant management portal with:- **Profile**: Update personal information

- **Notifications**: Receive updates and alerts

- **Dashboard**: Overview and analytics- **Settings**: Configure account preferences

- **Finance**: Rent payments and transactions- **Support**: Get help and assistance

  - Activities: Payment history and records

- **Maintenance**: Submit and track maintenance requests#### 2. 🏠 **Property Owner Dashboard** (`/dashboard/property-owner`)

- **Estate Information**: View estate details and join estatesLandlord management suite featuring:

- **Access Control**: Manage property access- **Dashboard**: Property performance overview

- **Profile**: Update personal information- **Estates**: Manage multiple estates

- **Notifications**: Receive updates and alerts  - Estate Info: Detailed estate information

- **Settings**: Configure account preferences  - Estate Dashboard: Individual estate analytics

- **Support**: Get help and assistance  - Tenants: View tenants per estate

- **Tenants**: Tenant management

#### 2. 🏠 **Property Owner Dashboard** (`/dashboard/property-owner`)  - Tenant Profiles: View individual tenant details

- **Payments**: Rent collection and financial tracking

Landlord management suite featuring:  - Activities: Transaction history

- **Maintenance**: Handle maintenance requests

- **Dashboard**: Property performance overview- **Letter Head**: Generate official documents

- **Estates**: Manage multiple estates- **Notifications**: Property and tenant alerts

  - Estate Info: Detailed estate information- **Profile**: Owner account management

  - Estate Dashboard: Individual estate analytics- **Settings**: Configure dashboard preferences

  - Tenants: View tenants per estate- **Support**: Access help resources

- **Tenants**: Tenant management

  - Tenant Profiles: View individual tenant details#### 3. 🏗️ **Enterprise Property Management Dashboard** (`/dashboard/enterprise-property`)

- **Payments**: Rent collection and financial trackingFull-featured property management platform with:

  - Activities: Transaction history- **Dashboard**: Comprehensive analytics

- **Maintenance**: Handle maintenance requests- **Estates**: Multi-property estate management

- **Letter Head**: Generate official documents- **Tenants**: Advanced tenant management

- **Notifications**: Property and tenant alerts  - Tenant Profiles: Detailed tenant information

- **Profile**: Owner account management  - Tenant Poll: Create and manage tenant surveys

- **Settings**: Configure dashboard preferences    - Create Poll: Design new polls

- **Support**: Access help resources    - Poll Questions: Manage survey questions

    - Poll Preview: Review before publishing

#### 3. 🏗️ **Enterprise Property Management Dashboard** (`/dashboard/enterprise-property`)    - Poll Responses: View tenant feedback

  - Reminders: Set up tenant reminders

Full-featured property management platform with:  - Access Records: Track property access

- **Payments**: Revenue and rent collection

- **Dashboard**: Comprehensive analytics- **Expenses**: Track operational costs

- **Estates**: Multi-property estate management- **Maintenance**: Facility management system

- **Tenants**: Advanced tenant management- **Request**: Handle tenant requests

  - Tenant Profiles: Detailed tenant information- **Document Generation**: Create official documents

  - Tenant Poll: Create and manage tenant surveys- **Letter Head**: Professional correspondence

    - Create Poll: Design new polls- **Notifications**: System-wide alerts

    - Poll Questions: Manage survey questions- **Profile**: Company profile management

    - Poll Preview: Review before publishing- **Settings**: Enterprise configurations

    - Poll Responses: View tenant feedback- **Support**: Priority support access

  - Reminders: Set up tenant reminders

  - Access Records: Track property access#### 4. 📋 **Property Listing Dashboard** (`/dashboard/list_Property`)

- **Payments**: Revenue and rent collectionDedicated property listing management:

- **Expenses**: Track operational costs- **Dashboard**: Listing analytics

- **Maintenance**: Facility management system- **Add Property**: Create new property listings

- **Request**: Handle tenant requests- **Properties**: View all listed properties

- **Document Generation**: Create official documents- **Edit Property**: Update property details

- **Letter Head**: Professional correspondence- **Preview Property**: Review listings before publishing

- **Notifications**: System-wide alerts- **Profile**: Lister profile management

- **Profile**: Company profile management

- **Settings**: Enterprise configurations#### 5. 🔐 **Security Dashboard** (`/dashboard/security`)

- **Support**: Priority support accessSecurity personnel management portal:

- **Dashboard**: Security overview

#### 4. 📋 **Property Listing Dashboard** (`/dashboard/list_Property`)- **Access Records**: Log and monitor property access

- **Profile**: Security personnel profile

Dedicated property listing management:- **Support**: Security-specific assistance



- **Dashboard**: Listing analytics## 🔑 Key Features Implementation

- **Add Property**: Create new property listings

- **Properties**: View all listed properties### Search & Filter System

- **Edit Property**: Update property details- Advanced filtering by location, property type, price range, bedrooms

- **Preview Property**: Review listings before publishing- URL-based filter persistence

- **Profile**: Lister profile management- Real-time search with debouncing

- Context-aware navigation between listing types

#### 5. 🔐 **Security Dashboard** (`/dashboard/security`)

### Property Management

Security personnel management portal:- Create, edit, and delete property listings

- Upload multiple property images with carousel display

- **Dashboard**: Security overview- Mark properties as featured/promoted

- **Access Records**: Log and monitor property access- Track property views, clicks, and engagement metrics

- **Profile**: Security personnel profile

- **Support**: Security-specific assistance### State Management

- Centralized property store with Zustand

## 🔑 Key Features Implementation- Filter state synchronization with URL parameters

- Pagination state management

### Search & Filter System- User authentication state



- Advanced filtering by location, property type, price range, bedrooms### Performance Optimizations

- URL-based filter persistence- Image optimization with Next.js Image component

- Real-time search with debouncing- Lazy loading with skeleton loaders

- Context-aware navigation between listing types- Debounced search and filter updates

- Optimized API calls with React Query

### Property Management

## 🛠️ Available Scripts

- Create, edit, and delete property listings

- Upload multiple property images with carousel display```bash

- Mark properties as featured/promoted# Development

- Track property views, clicks, and engagement metricsnpm run dev          # Start development server



### State Management# Production

npm run build        # Build for production

- Centralized property store with Zustandnpm start            # Start production server

- Filter state synchronization with URL parameters

- Pagination state management# Linting

- User authentication statenpm run lint         # Run ESLint



### Performance Optimizations# Sitemap

npm run postbuild    # Generate sitemap after build

- Image optimization with Next.js Image component```

- Lazy loading with skeleton loaders

- Debounced search and filter updates## 🌐 Environment Variables

- Optimized API calls with React Query

Required environment variables:

## 🛠️ Available Scripts- `NEXT_PUBLIC_API_URL` - Backend API base URL

- Add others as needed for your deployment

```bash

# Development## 📦 Build & Deployment

npm run dev          # Start development server

### Production Build

# Production```bash

npm run build        # Build for productionnpm run build

npm start            # Start production servernpm start

```

# Linting

npm run lint         # Run ESLint### Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

# Sitemap

npm run postbuild    # Generate sitemap after build1. Push your code to GitHub

```2. Import your repository to Vercel

3. Configure environment variables

## 🌐 Environment Variables4. Deploy!



Required environment variables:Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



- `NEXT_PUBLIC_API_URL` - Backend API base URL## 🤝 Contributing

- Add others as needed for your deployment

We welcome contributions! Please follow these steps:

## 📦 Build & Deployment

1. Fork the repository

### Production Build2. Create a feature branch (`git checkout -b feature/AmazingFeature`)

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)

```bash4. Push to the branch (`git push origin feature/AmazingFeature`)

npm run build5. Open a Pull Request

npm start

```## 📄 License



### Deploy on VercelThis project is proprietary and confidential.



The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):## 📞 Contact & Support



1. Push your code to GitHub- **Website**: [homz.ng](https://homz.ng)

2. Import your repository to Vercel- **Email**: support@homz.ng

3. Configure environment variables- **Phone**: 09160002460

4. Deploy!- **Address**: 1st Floor, Marina Hub Suite, Foresight House, 163/165, Broad Street, Lagos Nigeria



Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.## 🔗 Social Media



## 🤝 Contributing- [Instagram](https://www.instagram.com/homzng)

- [Facebook](https://www.facebook.com/homzng)

We welcome contributions! Please follow these steps:- [Twitter/X](https://twitter.com/homzng)

- [LinkedIn](https://linkedin.com/company/homzng)

1. Fork the repository- [Blog](http://blog.homz.ng/)

2. Create a feature branch (`git checkout -b feature/AmazingFeature`)

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)## 🙏 Acknowledgments

4. Push to the branch (`git push origin feature/AmazingFeature`)

5. Open a Pull Request- Certified by NDPC (Nigeria Data Protection Commission)

- Serving 2,000+ happy clients

## 📄 License- Featured properties from trusted landlords and property managers



This project is proprietary and confidential.---



## 📞 Contact & Support**Built with ❤️ by the Homz Team**

#   h o m z 

- **Website**: [homz.ng](https://homz.ng) 

- **Email**: support@homz.ng 
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
