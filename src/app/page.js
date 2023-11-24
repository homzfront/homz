import ContactPage from "./contact-page/page";
import LandingPagePM from "./landing-page-property/page";
import LandingPageTenant from "./landing-page-tenant/page";
// import LandingPageTenant from "./landing-page-tenant/page";



export default function Home() {
  return (
    <div className="m-auto max-w-[1160px] p-4">
      <div>
        <ContactPage/>
        {/* <LandingPagePM/> */}
      </div>
    </div>
  )
}
