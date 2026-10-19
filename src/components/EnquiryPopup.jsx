
import { useEffect, useRef, useState } from "react";
import {
  X,
  Phone,
  MessageCircle,
  ArrowRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";

import "./EnquiryPopup.css";

const initialForm = {
  name: "",
  phone: "",
  address: "",
};

export default function EnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExitIntent, setIsExitIntent] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [form, setForm] = useState(initialForm);

  const exitShownRef = useRef(false);
  const submittedRef = useRef(false);

  // Open the popup after 5 seconds.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!submittedRef.current) {
        setIsOpen(true);
      }
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);

  // Hide the floating button when the footer becomes visible.
  useEffect(() => {
    const footer = document.querySelector("footer");

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  // Open the popup once when the pointer leaves through the top.
  useEffect(() => {
    const handleExitIntent = (event) => {
      if (
        event.clientY <= 0 &&
        !exitShownRef.current &&
        !submittedRef.current
      ) {
        exitShownRef.current = true;
        setIsExitIntent(true);
        setIsOpen(true);
      }
    };

    document.addEventListener("mouseout", handleExitIntent);

    return () => {
      document.removeEventListener("mouseout", handleExitIntent);
    };
  }, []);

  // Close popup using Escape.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsExitIntent(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closePopup = () => {
    setIsOpen(false);
    setIsExitIntent(false);
  };

  const openQuoteForm = () => {
    setIsExitIntent(false);
    setIsOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const phone = form.phone.replace(/\D/g, "");

    if (!form.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!form.address.trim()) {
      alert("Please enter your address.");
      return;
    }

    const message = [
      "NEW WEBSITE ENQUIRY",
      "",
      `Name: ${form.name.trim()}`,
      `Mobile: +91 ${phone}`,
      `Address: ${form.address.trim()}`,
    ].join("\n");

    const whatsappURL =
      `https://wa.me/919162512232?text=${encodeURIComponent(message)}`;

    submittedRef.current = true;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");

    setForm(initialForm);
    setIsOpen(false);
    setIsExitIntent(false);
  };

  return (
    <>
      {/* Popup backdrop */}
      <button
        type="button"
        aria-label="Close enquiry form"
        tabIndex={isOpen ? 0 : -1}
        onClick={closePopup}
        className={`enquiry-popup-backdrop ${
          isOpen ? "is-open" : ""
        }`}
      />

      {/* Single floating red chat button */}
      <button
        type="button"
        onClick={openQuoteForm}
        aria-label="Get a quote"
        aria-expanded={isOpen}
        className={`enquiry-quote-circle ${
          isOpen || isFooterVisible ? "is-hidden" : ""
        }`}
      >
        <MessageCircle
          className="enquiry-quote-icon"
          size={20}
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </button>

      {/* Enquiry popup */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        aria-hidden={!isOpen}
        className={`enquiry-popup-shell ${
          isOpen ? "is-open" : ""
        }`}
      >
        <div className="enquiry-popup-card">
          <header className="enquiry-popup-header">
            <div className="enquiry-header-content">
              <div>
                <p className="enquiry-eyebrow">
                  MUSHAD HARDWARE
                </p>

                <h2 id="enquiry-title" className="enquiry-title">
                  {isExitIntent
                    ? "Before you go..."
                    : "Get in Touch"}
                </h2>

                <p className="enquiry-description">
                  {isExitIntent
                    ? "Still need construction materials? Leave your details and we’ll get in touch."
                    : "Share your details and we’ll get in touch with you."}
                </p>
              </div>

              <button
                type="button"
                onClick={closePopup}
                aria-label="Close quote form"
                className="enquiry-close-button"
              >
                <X size={20} />
              </button>
            </div>
          </header>

          <form
            onSubmit={handleSubmit}
            className="enquiry-form-content"
          >
            {/* Full name */}
            <div className="enquiry-form-group">
              <label
                htmlFor="enquiry-name"
                className="enquiry-field-label"
              >
                01. Full Name
              </label>

              <input
                id="enquiry-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                maxLength={100}
                required
                className="enquiry-field"
              />
            </div>

            {/* Mobile number */}
            <div className="enquiry-form-group">
              <label
                htmlFor="enquiry-phone"
                className="enquiry-field-label"
              >
                02. Mobile Number
              </label>

              <div className="enquiry-phone-wrapper">
                <span className="enquiry-phone-prefix">
                  <Phone size={16} />
                  <span>+91</span>
                </span>

                <input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={handleChange}
                  pattern="[6-9][0-9]{9}"
                  maxLength={10}
                  required
                  className="enquiry-field enquiry-field-phone"
                />
              </div>
            </div>

            {/* Address */}
            <div className="enquiry-form-group">
              <label
                htmlFor="enquiry-address"
                className="enquiry-field-label"
              >
                03. Address
              </label>

              <div className="enquiry-address-wrapper">
                <MapPin
                  size={17}
                  className="enquiry-address-icon"
                />

                <textarea
                  id="enquiry-address"
                  name="address"
                  rows={3}
                  maxLength={500}
                  autoComplete="street-address"
                  placeholder="Enter your area and address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="enquiry-field enquiry-address-field"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="enquiry-submit-button"
            >
              <MessageCircle size={19} />
              <span>Request a Callback</span>
              <ArrowRight size={18} />
            </button>

            <div className="enquiry-footer-note">
              <CheckCircle2 size={15} />
              <span>
                Your details will open in WhatsApp for you to send.
              </span>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}