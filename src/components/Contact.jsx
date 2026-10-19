
import "./Contact.css";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

export default function Contact() {
  return (
    <section className="section contact-section" id="contact"  data-aos="fade-up">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">LET'S BUILD TOGETHER</span>
          <h2>
            Get in <span>Touch</span>
          </h2>
          <p>
            Need construction materials? Contact us for product enquiries
            and assistance.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left: Contact Information */}
       
<div className="contact-info">
  <a className="contact-card" href="tel:+919162512232">
    <span className="contact-icon">
      <img src="/Brands/Contact-img.png" alt="Phone" />
    </span>
    <span>
      <strong>Call Us</strong>
      <small>+91 91625 12232</small>
    </span>
    <ArrowUpRight className="contact-arrow" size={19} />
  </a>

  <a
    className="contact-card"
    href="https://wa.me/919162512232?text=Hello%2C%20I%20want%20to%20enquire%20about%20construction%20materials."
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="contact-icon">
      <img src="/Brands/whatsapp-img.png" alt="WhatsApp" />
    </span>
    <span>
      <strong>WhatsApp</strong>
      <small>Chat with our store</small>
    </span>
    <ArrowUpRight className="contact-arrow" size={19} />
  </a>

  <a className="contact-card" href="mailto:mushadconstruction@gmail.com">
    <span className="contact-icon">
      <img src="/Brands/gmail-img.png" alt="Email" />
    </span>
    <span>
      <strong>Email Us</strong>
      <small>mushadconstruction@gmail.com</small>
    </span>
    <ArrowUpRight className="contact-arrow" size={19} />
  </a>

  <a
    className="contact-card"
    href="https://www.google.com/maps/search/?api=1&query=Mushad+Hardware+and+Construction+Store%2C+Khodaibagh%2C+Saran%2C+Bihar"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="contact-icon">
      <img src="/Brands/location-img.png" alt="Store location" />
    </span>
    <span>
      <strong>Visit Our Store</strong>
      <small>Khodaibagh — get directions</small>
    </span>
    <ArrowUpRight className="contact-arrow" size={19} />
  </a>
</div>


          {/* Right: Google Map */}
          <div className="map-panel ">
            <iframe
              className="contact-map-iframe"
              title="Mushad Hardware and Construction Store location"
              src="https://maps.google.com/maps?q=Mushad%20Hardware%20and%20Construction%20Store%2C%20Khodaibagh%2C%20Saran%2C%20Bihar&t=&z=17&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
{/* 
            <div className="map-content">
              <span className="map-pin">
                <MapPin size={30} />
              </span>

              <h3>Find Our Store</h3>

              <p>
                Mushad Hardware and Construction Store
                <br />
                Khodaibagh, Saran, Bihar
              </p>

              <a
                className="btn btn-primary"
                href="https://www.google.com/maps/dir/?api=1&destination=Mushad+Hardware+and+Construction+Store%2C+Khodaibagh%2C+Saran%2C+Bihar"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions <ArrowUpRight size={18} />
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
