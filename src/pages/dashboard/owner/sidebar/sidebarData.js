import Dashboard from '@/components/icons/dashboardMobile/dashboard'
import Maintenance from '@/components/icons/dashboardMobile/maintenance '
import Payment from '@/components/icons/dashboardMobile/payment'
import PropertyListing from '@/components/icons/dashboardMobile/propertyListing'
import PropertyManagement from '@/components/icons/dashboardMobile/propertyManagement'
import Settings from '@/components/icons/dashboardMobile/settings'
import Support from '@/components/icons/dashboardMobile/support'
import Switch from '@/components/icons/dashboardMobile/switch'
import Tenants from '@/components/icons/dashboardMobile/tenants'
import Profile from "@/components/icons/dashboardMobile/profile";


export const Data = [
    {
      id: 1,
      image: <Dashboard />,
      image2: <Dashboard className='text-white fill-white' />,
      link: "/dashboard/property-owner/dashboard",
      name: "Dashboard",
      coming: null,
      active: false,
    },
    {
      id: 2,
      image: <Tenants />,
      image2: <Tenants className='text-white fill-white' />,
      link: "/dashboard/property-owner/tenants",
      name: "Tenants",
      coming: null,
      active: false,
    },
    {
      id: 3,
      image: <PropertyManagement />,
      image2: <PropertyManagement className='text-BlueHomz fill-white' />,
      link: "/dashboard/property-owner/estates",
      name: "Property Management",
      coming: null,
      active: false,
    },
    {
      id: 4,
      image: <PropertyListing />,
      image2: <PropertyListing className='text-BlueHomz fill-white' />,
      link: "/dashboard/property-owner/propertylisting",
      name: "Property Listing",
      coming: null,
      active: false,
    },
    {
      id: 5,
      image: <Payment />,
      image2: <Payment className='text-BlueHomz fill-white' />,
      link: "/dashboard/property-owner/payments",
      name: "Payments",
      coming: null,
      active: false,
    },
    {
      id: 6,
      image: <Maintenance />,
      image2: <Maintenance className='text-white fill-white' />,
      link: "/dashboard/property-owner/maintenance",
      name: "Maintenance",
      coming: null,
      active: false,
    },
    {
      id: 7,
      image: <Support />,
      image2: <Support className='text-white fill-white' />,
      link: "/dashboard/property-owner/support",
      name: "Support",
      coming: null,
      active: false,
    },
  ];

  export const Data2 = [
    {
      id: 1,
      image: <Profile />,
      image2: <Profile className='text-white fill-white' />,
      link: "/dashboard/property-owner/profile",
      name: "Profile",
    },
    // {
    //   id: 2,
    //   image: <Settings />,
    // image2: <Settings className='text-white' />,
    //   link: "/dashboard/property-owner/setting",
    //   name: "Setting",
    // },
  ];

  export const Data3 = [
    {
      id: 1,
      image: <Switch />,
      link: "/switch-profile",
      name: "Switch",
    },
  ];