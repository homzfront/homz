import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "Property Management Software for Landlords - Homz.ng",
  description: "Streamline your landlord operations with Homz.ng's property management platform. Collect rent on time, verify tenants, and monitor all properties in one dashboard. Get started today.",
  openGraph: {
    title: "Property Management Software for Landlords - Homz.ng",
    description: "Streamline your landlord operations with Homz.ng's property management platform. Collect rent on time, verify tenants, and monitor all properties in one dashboard. Get started today.",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Property Management Software for Landlords - Homz.ng",
    description: "Streamline your landlord operations with Homz.ng's property management platform. Collect rent on time, verify tenants, and monitor all properties in one dashboard. Get started today.",
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
