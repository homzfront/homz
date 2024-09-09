import Footer from "/src/components/layout/Footer";
import Header from "/src/components/layout/Header";
import useFacebookPixel from "@/utils/useFacebookPixels";

const RootLayout = ({ children }) => {
  useFacebookPixel();
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default RootLayout;


