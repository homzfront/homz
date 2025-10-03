import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "Tenant Portal - Pay Rent, Request Maintenance | Homz.ng",
  description: "Enjoy convenient tenant services with Homz.ng. Pay rent online, request maintenance, communicate with landlords, and manage your tenancy all in one secure platform.",
  openGraph: {
    title: "Tenant Portal - Pay Rent, Request Maintenance | Homz.ng",
    description: "Enjoy convenient tenant services with Homz.ng. Pay rent online, request maintenance, communicate with landlords, and manage your tenancy all in one secure platform.",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tenant Portal - Pay Rent, Request Maintenance | Homz.ng",
    description: "Enjoy convenient tenant services with Homz.ng. Pay rent online, request maintenance, communicate with landlords, and manage your tenancy all in one secure platform.",
  }
};

export default function layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer/>
    </div>
  );
}
