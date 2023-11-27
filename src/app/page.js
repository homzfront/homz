import AboutUs from "./about-us/page";
import ContactPage from "./contact-page/page";
import LandingPagePM from "./landing-page-property/page";
import LandingPageTenant from "./landing-page-tenant/page";
import LandingPagePO from "./landingPage-PropertyOwner/page";



export default function Home() {
  return (
    <div className="m-auto max-w-[1440px]">
      <div>
        {/* <ContactPage/> */}
        {/* <LandingPageTenant/> */}
        {/* <AboutUs/> */}
        {/* <LandingPagePM/> */}
        <LandingPagePO/>
      </div>
    </div>
  )
}
