import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "dotenv/config";
import { GoogleTagManager } from '@next/third-parties/google';
import Head from 'next/head';
import Script from "next/script";
import dynamic from 'next/dynamic';
import GoogleAnalytics from "@/utils/googleAnalytics";

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const FacebookPixel = dynamic(() => import('@/libs/FBpixels'), {
  ssr: false,
});

export const metadata = {
  metadataBase: new URL('https://www.homz.ng'),
  title: {
    default: "Homz.ng - The Best Real Estate Management Solution for Landlords, Tenants and Property Managers",
    template: "Homz - %s"
  },
  description: "Homz.ng is a comprehensive software solution simplifying real estate management. Find, manage, appraise, rent or sell properties with ease. Try Homz.ng today.",
  twitter: {
    card: "summary_large_image"
  },
  openGraph: {
    site_name: "Homz.ng",
    url: "https://www.homz.ng",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE} />
        <noscript>
          <img
            height='1'
            width='1'
            style='display:none'
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_PIXEL_ID}&ev=PageView&noscript=1`}
            alt={'facebook pixel no script image'}
          />
        </noscript>
      </Head>
      <body className={plus_Jakarta_Sans.className}>
        <FacebookPixel />
        <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER} />
        <Script
          id="tawk-to"
          strategy="afterInteractive"
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
        {children}
      </body>
    </html>
  );
}

