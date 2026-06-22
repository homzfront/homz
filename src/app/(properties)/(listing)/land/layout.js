import { generatePageMetadata } from "@/utils/urlParamsParser";

export async function generateMetadata() {
  return generatePageMetadata({}, "land");
}

export default function LandLayout({ children }) {
  return children;
}