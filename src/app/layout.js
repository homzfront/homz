import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/utils/useReactQuery";
import GoogleAnalytics from "@/utils/googleAnalytics";
import "dotenv/config";

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Homz",
  description: "Homzng is a integrated estate management platform for property managers, Landlords & Tenants",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
        <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      ) : null}
      <body className={plus_Jakarta_Sans.className}>{children}
        {/* <ReactQueryProvider>{children}</ReactQueryProvider> */}
      </body>
    </html>
  );
}
