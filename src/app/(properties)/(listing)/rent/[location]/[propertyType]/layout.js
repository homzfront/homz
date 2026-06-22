import { generatePageMetadata } from "@/utils/urlParamsParser";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  return generatePageMetadata(resolvedParams, "rent");
}

export default function RentLocationTypeLayout({ children }) {
  return children;
}