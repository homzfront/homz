import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "dotenv/config";
import { GoogleTagManager } from '@next/third-parties/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import Head from 'next/head';
import Script from "next/script";

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
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
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', ${process.env.NEXT_PUBLIC_PIXEL_ID});
              fbq('track', 'PageView');
            `,
          }}
        ></Script>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_PIXEL_ID}&ev=PageView&noscript=1`} alt="" />
        </noscript>
        <Script
          id="googleConsole"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-PK8L8G7X')`,
          }}
        ></Script>
      </Head>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER} />
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
      <body className={plus_Jakarta_Sans.className}>{children}</body>
    </html>
  );
}
