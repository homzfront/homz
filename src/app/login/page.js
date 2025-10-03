import React from 'react';
import LoginComponent from './components/LoginComponent';

export const metadata = {
  title: "Log in to Your Homz Account - Property Management Portal",
  description: "Access your Homz.ng property management account. Log in to manage properties, collect rent, communicate with tenants, and access your dashboard. Secure login portal.",
  openGraph: {
    title: "Log in to Your Homz Account - Property Management Portal",
    description: "Access your Homz.ng property management account. Log in to manage properties, collect rent, communicate with tenants, and access your dashboard. Secure login portal.",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Log in to Your Homz Account - Property Management Portal",
    description: "Access your Homz.ng property management account. Log in to manage properties, collect rent, communicate with tenants, and access your dashboard. Secure login portal.",
  }
};

const LoginPage = () => {
  return <LoginComponent />;
};

export default LoginPage;