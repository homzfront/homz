import Footer from "@/components/layout/Footer";
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
