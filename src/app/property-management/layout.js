import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "Property Management Software for Managers - Homz Enterprise",
  description: "Scale your property management business with Homz Enterprise. Manage multiple properties, tenants, and finances in one platform. Transparent pricing with up to 20% savings.",
  openGraph: {
    title: "Property Management Software for Managers - Homz Enterprise",
    description: "Scale your property management business with Homz Enterprise. Manage multiple properties, tenants, and finances in one platform. Transparent pricing with up to 20% savings.",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Property Management Software for Managers - Homz Enterprise",
    description: "Scale your property management business with Homz Enterprise. Manage multiple properties, tenants, and finances in one platform. Transparent pricing with up to 20% savings.",
  }
};

export default function PropertyManagementLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer/>
    </div>
  );
}