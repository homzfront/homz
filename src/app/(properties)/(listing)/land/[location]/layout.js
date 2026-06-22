import { generatePageMetadata } from "@/utils/urlParamsParser";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  return generatePageMetadata(resolvedParams, "land");
}

export default function LandLocationLayout({ children }) {
  return children;
}