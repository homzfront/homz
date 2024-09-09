import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const RootLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default RootLayout;