import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "All-in-One Property Management Software for Enterprises | Homz.ng",
  description:
    "Run your property management business on Homz.ng. Manage multiple properties, tenants, rent collection and finances from one dashboard built for Nigerian property managers.",
  keywords: [
    "property management software Nigeria",
    "enterprise property management",
    "rent collection software",
    "Homz.ng",
  ],
  alternates: {
    canonical: "/enterprise",
  },
  openGraph: {
    title: "All-in-One Property Management Software for Enterprises | Homz.ng",
    description:
      "Run your property management business on Homz.ng. Manage multiple properties, tenants, rent collection and finances from one dashboard.",
  },
  twitter: {
    card: "summary_large_image",
    title: "All-in-One Property Management Software for Enterprises | Homz.ng",
    description:
      "Run your property management business on Homz.ng. Manage multiple properties, tenants, rent collection and finances from one dashboard.",
  },
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