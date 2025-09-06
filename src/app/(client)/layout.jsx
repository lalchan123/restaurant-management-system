import { Footer, FooterLinks, Navbar } from "@/components";
import { useShoppingContext } from "@/context";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <FooterLinks />
      <Footer />
    </>
  );
};

export default Layout;
