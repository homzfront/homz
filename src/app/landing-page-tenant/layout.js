import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
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
