import "./Footer.css";
import { HardHat, Phone, Mail, MapPin, MessageCircle, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    
<footer className="footer" data-aos="fade-up">

      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="brand-logo" href="#home">
             <img
            className="shop-logo h-14"
            src="/Brands/logo2.png"
            alt="Mushad Hardware and Construction Store Logo"
          />
            <span>
             <h3 className="font-bold">MUSHAD <p className="font-semibold text-sm">CONSTRUCTION & HARDWARE</p></h3>
             
               
            </span>

          </a>
          <p className="">
            Quality construction materials, dependable service, and trusted
            brands for your building projects.
          </p>
          
        </div>

        <div>
          <h3>Quick Links</h3>
          <a href="#home">Home</a>
          <a href="#brands">Brands</a>
          <a href="#products">Products</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>

        <div>
          <h3>Contact Us</h3>
          <a href="tel:+919162512232"><Phone size={16} /> +91 91625 12232</a>
          <a href="mailto:mushadconstruction@gmail.com"><Mail size={16} /> mushadconstruction@gmail.com</a>
          <a href="https://www.google.com/maps/search/?api=1&query=Khodaibagh" target="_blank" rel="noreferrer">
            <MapPin size={16} /> Khodaibagh,Chhapra,Saran
          </a>
        </div>
      </div>

      <div className="footer-bottom h-10  container">
        <p>© {new Date().getFullYear()} Mushad Construction and Hardware Store. All rights reserved.</p>
        <a className="back-top" href="#home" aria-label="Back to top">
          <ArrowUp size={18} />
        </a>
      </div>

      {/* <a
        className="whatsapp-float"
        href="https://wa.me/919162512232?text=Hello%20Mushad%20Hardware%20and%20Construction%20Store"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle size={25} />
      </a> */}
    </footer>
  );
}
