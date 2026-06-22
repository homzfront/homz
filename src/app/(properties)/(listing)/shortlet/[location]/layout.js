import { generatePageMetadata } from "@/utils/urlParamsParser";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  return generatePageMetadata(resolvedParams, "shortlet");
}

export default function ShortletLocationLayout({ children }) {
  return children;
}