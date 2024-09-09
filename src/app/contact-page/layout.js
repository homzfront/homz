import Footer from "@/components/layout/Footer";
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
