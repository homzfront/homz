"use client"
import { useRouter } from 'next/navigation';
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "dotenv/config";

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const metadata = {
  title: "Homz",
  description: "Homzng is an integrated estate management platform for property managers, Landlords & Tenants",
  icons: {
    icon: "/icon.png",
  },
 };

export default function RootLayout({ children }) {
  const router = useRouter(); // Initialize the router object

// console.log(process.env.timestamp);
  return (
    <html lang="en">
      <body className={plus_Jakarta_Sans.className}>
        {/* <NextTopLoader showSpinner={false} /> */}
        <link rel="stylesheet" href={`/styles.css${router.pathname === '/' ? '' : `?timestamp=${process.env.timestamp}`}`} />
        <script src={`/script.js${router.pathname === '/' ? '' : `?timestamp=${process.env.timestamp}`}`}></script>
        {children}
      </body>
    </html>
  );
}
