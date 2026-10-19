import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Brands from "./components/Brands";
import Products from "./components/Products";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import EnquiryPopup from "./components/EnquiryPopup";
export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Brands />
        <Products />
        <About />
        <EnquiryPopup />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
