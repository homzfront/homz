import { generatePageMetadata } from "@/utils/urlParamsParser";

export async function generateMetadata() {
  return generatePageMetadata({}, "shortlet");
}

export default function ShortletLayout({ children }) {
  return children;
}