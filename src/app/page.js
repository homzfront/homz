"use client";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import HomePage from "./user_homepage/page";
import { signIn, useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession();
  console.log("Session", session);
  return (

    <div>
      <Header />
      <div className="m-auto max-w-[1440px]">
        <HomePage />
      </div>
      <Footer />
    </div>

  );
}
