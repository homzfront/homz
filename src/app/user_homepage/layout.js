import Footer from "/src/components/layout/Footer";
import Header from "/src/components/layout/Header";
import useFacebookPixel from "@/utils/useFacebookPixels";

export default function layout({ children }) {
  useFacebookPixel();
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
