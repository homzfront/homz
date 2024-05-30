import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/utils/googleAnalytics";
import "dotenv/config";

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: {
    default: "Homz.ng - The Best Real Estate Management Solution for Landlords, Tenants and Property Managers",
    template: "Homz - %s"
  },
  description: "Homz.ng is a comprehensive software solution simplifying real estate management. Find, manage, appraise, rent or sell properties with ease. Try Homz.ng today.",
  twitter: {
    card: "summary_large_image"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
        <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      ) : (
        <GoogleAnalytics ga_id="G-J2KVN3RH83" />
      )}
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/66506bcd9a809f19fb3480b0/1hul2a7ij';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();
            `,
          }}
        />
      </body>
      <body className={plus_Jakarta_Sans.className}>{children}
      </body>
    </html>
  );
}
