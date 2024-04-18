const SideBarData = [
  // {
  //   title: "User",
  //   path: "/second_release/user",
  //   icon: "/static/dashboard/enterprisemanager/sidebar/tenants.png",
  //   icon2: "/static/dashboard/enterprisemanager/sidebar/tenantswhite.png",

  //   // submenu: true,
  //   // subMenuItems: [
  //   //   { title: "Account", path: "/settings/account" },
  //   //   { title: "Privacy", path: "/settings/privacy" },
  //   // ],
  // },
  {
    title: "Tenants",
    paths: [
      "/second_release/Tenants/ManageTenants",
      "/second_release/Tenants/AccessRecords",
      "/second_release/Tenants/TenantPoll",
    ],
    icon: "/static/dashboard/enterprisemanager/sidebar/tenants.png",
    icon2: "/static/dashboard/enterprisemanager/sidebar/tenantswhite.png",
    submenu: true,
    subMenuItems: [
      {
        title: "Manage Tenants",
        path: "/second_release/Tenants/ManageTenants",
        icon: "/static/dashboard/enterprisemanager/sidebar/tenants.png",
        icon2: "/static/dashboard/enterprisemanager/sidebar/tenantswhite.png",
      },
      {
        title: "Access Control",
        path: "/second_release/Tenants/AccessRecords",
        icon: "/static/images/people.svg",
        icon2: "/static/images/people.svg",
      },
      {
        title: "Tenant Poll",
        path: "/second_release/Tenants/TenantPoll",
        icon: "/static/images/black_chart.svg",
        icon2: "/static/images/white_chart.svg",
      },
    ],
  },

  {
    title: "Access Control",
    path: "/second_release/AccessControl",
    icon: "/static/images/black_key.svg",
    icon2: "/static/images/key.svg",

    // submenu: true,
    // subMenuItems: [
    //   { title: "Account", path: "/settings/account" },
    //   { title: "Privacy", path: "/settings/privacy" },
    // ],
  },
  {
    title: "Tenant Poll",
    path: "/second_release/TenantPoll",
    icon: "/static/images/black_chart.svg",
    icon2: "/static/images/white_chart.svg",

    // submenu: true,
    // subMenuItems: [
    //   { title: "Account", path: "/settings/account" },
    //   { title: "Privacy", path: "/settings/privacy" },
    // ],
  },
  {
    title: "Settings",
    path: "/second_release/UserRole",
    icon: "/static/images/setting-2.svg",
    icon2: "/static/images/setting-2.svg",
  },
];

export default SideBarData ;
