import AboutUs from "./about-us/page";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="m-auto max-w-[1440px]">
        <AboutUs />
      </div>
      <Footer />
    </div>
  );
}
