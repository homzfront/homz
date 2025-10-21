import Footer from "/src/components/layout/Footer";
import Header from "/src/components/layout/Header";

export const metadata = {
  title: 'Explore Properties Across Nigeria',
  description: 'Browse verified homes, land, and shortlets for sale or rent in top Nigerian locations.', // ← Your custom tag
  openGraph: {
    title: 'Explore Properties Across Nigeria',
    description: 'Browse verified homes, land, and shortlets for sale or rent in top Nigerian locations.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore Properties Across Nigeria',
    description: 'Browse verified homes, land, and shortlets for sale or rent in top Nigerian locations.',
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
