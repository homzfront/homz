import Footer from "/src/components/layout/Footer";
import Header from "/src/components/layout/Header";

export const metadata = {
  title: 'Property Management Software Nigeria - Rent, Facility & Estate',
  description: 'Your property management software for landlords, agents, facility/estate managers for document generation, finance, tracking and access control.', // ← Your custom tag
  openGraph: {
    title: 'Property Management Software Nigeria - Rent, Facility & Estate',
    description: 'Your property management software for landlords, agents, facility/estate managers for document generation, finance, tracking and access control.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Management Software Nigeria - Rent, Facility & Estate',
    description: 'Your property management software for landlords, agents, facility/estate managers for document generation, finance, tracking and access control.',
  }
}

export default function layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
