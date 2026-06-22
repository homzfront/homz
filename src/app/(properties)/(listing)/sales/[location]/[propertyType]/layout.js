import { generatePageMetadata } from "@/utils/urlParamsParser";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  return generatePageMetadata(resolvedParams, "sales");
}

export default function SalesLocationTypeLayout({ children }) {
  return children;
}