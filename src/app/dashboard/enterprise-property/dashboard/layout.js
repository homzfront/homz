"use client"
import React, { useState } from 'react';
import Header from '@/pages/dashboard/enterprise/header/header';
import Sidebar from '@/pages/dashboard/enterprise/sidebar/sidebar';
import '@/app/globals.css'; // Import your CSS file

const Layout = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div className={`dashboard ${sidebarActive ? 'active-sidebar' : ''}`}>
      <Header toggleSidebar={toggleSidebar} />
      {children}
      <Sidebar />
      <div className="toggle-button" onClick={toggleSidebar}>
        Toggle Sidebar
      </div>
    </div>
  );
};

export default Layout;
