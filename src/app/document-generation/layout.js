import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "Generate Property Documents Online - Tenancy Agreements",
  description: "Create professional property documents instantly. Generate tenancy agreements, rent receipts, and quit notices with our compliant document generation tool. Try it free.",
  openGraph: {
    title: "Generate Property Documents Online - Tenancy Agreements",
    description: "Create professional property documents instantly. Generate tenancy agreements, rent receipts, and quit notices with our compliant document generation tool. Try it free.",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Generate Property Documents Online - Tenancy Agreements",
    description: "Create professional property documents instantly. Generate tenancy agreements, rent receipts, and quit notices with our compliant document generation tool. Try it free.",
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
