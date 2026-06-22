import Footer from "/src/components/layout/Footer";
import Header from "/src/components/layout/Header";

async function getMarketerProfile(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listingProperty/${id}/marketer`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const marketer = await getMarketerProfile(id);
  const businessName = marketer?.businessInfo?.businessName;
  const businessDescription = marketer?.businessInfo?.businessDescription;

  const title = businessName
    ? `${businessName} | Property Agent on Homz.ng`
    : "Property Agent Profile | Homz.ng";

  const description = businessDescription
    ? `${businessDescription.slice(0, 150).trim()}${
        businessDescription.length > 150 ? "..." : ""
      } View verified property listings on Homz.ng.`
    : "View this agent's verified property listings for rent, sale and shortlet on Homz.ng, Nigeria's trusted real estate platform.";

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer/>
    </div>
  );
}