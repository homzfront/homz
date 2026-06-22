import he from "he";

function stripHtml(html) {
  if (!html) return "";
  const decoded = he.decode(html);
  return decoded.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function capitalizeFirstLetter(str) {
  if (str && typeof str === "string") {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return "";
}

async function getProperty(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/public/properties/single/${id}`,
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
  const property = await getProperty(id);

  if (!property) {
    return {
      title: "Property Listing | Homz.ng",
      description:
        "View verified property listings for sale, rent and shortlet across Nigeria on Homz.ng.",
    };
  }

  const location = [property.area, property.state].filter(Boolean).join(", ");

  const action =
    property.listingType === "Sale"
      ? "for Sale"
      : property.listingType === "Rent"
      ? "for Rent"
      : property.listingType
      ? `for ${capitalizeFirstLetter(property.listingType)}`
      : "";

  const bedroomLabel = property.numberOfRooms
    ? `${property.numberOfRooms} Bedroom `
    : "";

  const baseTitle = property.title || property.name || "Property";

  const title = `${bedroomLabel}${baseTitle} ${action} in ${
    location || "Nigeria"
  } | Homz.ng`
    .replace(/\s+/g, " ")
    .trim();

  const plainDescription = stripHtml(property.description);
  const description = plainDescription
    ? `${plainDescription.slice(0, 150).trim()}${
        plainDescription.length > 150 ? "..." : ""
      } View photos, price and contact details on Homz.ng.`
    : `${bedroomLabel}property ${action} in ${
        location || "Nigeria"
      }. View photos, price and contact details on Homz.ng.`.replace(/\s+/g, " ");

  const image = property?.coverPhoto?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default function PropertyDetailLayout({ children }) {
  return children;
}