import AboutUs from "./about-us/page";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ContactPage from "./contact-page/page";
import LandingPagePM from "./landing-page-property/page";
import LandingPageTenant from "./landing-page-tenant/page";
import LandingPagePO from "./landingPage-PropertyOwner/page";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="m-auto max-w-[1440px]">
        <ContactPage />
        {/* <LandingPageTenant/> */}
        {/* <AboutUs/> */}
        {/* <LandingPagePM/> */}
        {/* <LandingPagePO/> */}
      </div>
      <Footer />
    </div>
  );
}
