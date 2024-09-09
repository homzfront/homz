import Footer from "/src/components/layout/Footer";
import Header from "/src/components/layout/Header";

export default function layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer/>
    </div>
  );
}
