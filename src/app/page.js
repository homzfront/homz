import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import HomePage from "./(properties)/page";

export default function Home() {
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
