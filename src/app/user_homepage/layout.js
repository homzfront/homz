import Footer from "/src/components/layout/Footer";
import Header from "/src/components/layout/Header";

const RootLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default RootLayout;


