import { generatePageMetadata } from "@/utils/urlParamsParser";

export async function generateMetadata() {
  return generatePageMetadata({}, "rent");
}

export default function RentLayout({ children }) {
  return children;
}