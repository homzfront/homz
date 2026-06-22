import { generatePageMetadata } from "@/utils/urlParamsParser";

export async function generateMetadata() {
  return generatePageMetadata({}, "sales");
}

export default function SalesLayout({ children }) {
  return children;
}