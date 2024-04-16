import Dashboard from '@/components/icons/dashboardMobile/dashboard'
import Maintenance from '@/components/icons/dashboardMobile/maintenance '
import Payment from '@/components/icons/dashboardMobile/payment'
import PropertyManagement from '@/components/icons/dashboardMobile/propertyManagement'
import Settings from '@/components/icons/dashboardMobile/settings'
import Support from '@/components/icons/dashboardMobile/support'
import Switch from '@/components/icons/dashboardMobile/switch'
import Profile from "@/components/icons/dashboardMobile/profile";

export const Data = [
    {
        id: 1,
        image: <Dashboard />,
        image2: <Dashboard className='text-white fill-white' />,
        link: "/dashboard/tenant/dashboard",
        name: "Dashboard",
        coming: null,
        active: false,
    },
    {
        id: 2,
        image: <PropertyManagement />,
        image2: <PropertyManagement className='text-BlueHomz fill-white' />,
        link: "/dashboard/tenant/estateInformation",
        name: "Property Information",
        coming: null,
        active: false,
    },

    {
        id: 3,
        image: <Payment />,
        image2: <Payment className='text-BlueHomz fill-white' />,
        link: "/dashboard/tenant/finance",
        name: "Finance",
        coming: null,
        active: false,
    },
    {
        id: 4,
        image: <Maintenance />,
        image2: <Maintenance className='text-white fill-white' />,
        link: "/dashboard/tenant/maintenance",
        name: "Maintenance",
        coming: null,
        active: false,
    },
    {
        id: 5,
        image: <Support />,
        image2: <Support className='text-white fill-white' />,
        link: "/dashboard/tenant/support",
        name: "Support",
        coming: null,
        active: false,
    },
    {
        id: 6,
        image: <Profile />,
        image2: <Profile className='text-white fill-white' />,
        link: "/dashboard/tenant/profile",
        name: "Profile",
        coming: null,
        active: false,
    },
];

export const Data2 = [

    // {
    //   id: 2,
    //   image: <Settings />,
    // image2: <Settings className='text-white' />,
    //   link: "/dashboard/tenant/setting",
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