"use client";

import Link from "next/link";
import "./style.css";
import { PiArrowUpRightBold } from "react-icons/pi";
import { openAppointmentForm } from "@/lib/appointment";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/#services", label: "Послуги" },
  { href: "/#about", label: "Про Клініку" },
  { href: "/#steps", label: "Етапи лікування" },
  { href: "/#price", label: "Ціни" },
  { href: "/#testimonials", label: "Відгуки" },
  { href: "/#contacts", label: "Контакти" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className={isScrolled || isOpen ? "scrolled" : ""}>
      <div className="container">
        <div className="header-left">
          <Link href="/" className="logo" aria-label="SOFTH СТО — Головна">
            SOFTH <span>СТО</span>
          </Link>
          <nav className="header-nav">
            {NAV_LINKS.map(({ href, label }) => (
              <Link href={href} className="header-nav-link" key={href}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="header-right">
          <a href="tel:+380982005055" className="header-right-phone">
            +38 (098) 200-50-55
          </a>
          <button
            type="button"
            className="book-button"
            onClick={() => openAppointmentForm()}
          >
            <p className="book-button-text">записатися</p>
            <PiArrowUpRightBold className="book-button-icon" />
          </button>
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className={`burger-bg ${isOpen ? "open" : ""}`}
          >
            <button
              type="button"
              className={`burger ${isOpen ? "open" : ""}`}
              aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
              aria-expanded={isOpen}
            >
              <span />
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`mobile-menu-overlay ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`mobile-menu ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Меню навігації"
        aria-hidden={!isOpen}
      >
        <nav className="mobile-menu-nav">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              href={href}
              className="mobile-menu-link"
              key={href}
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="mobile-menu-bottom">
          <a
            href="tel:+380982005055"
            className="mobile-menu-phone"
            tabIndex={isOpen ? 0 : -1}
          >
            +38 (098) 200-50-55
          </a>
          <button
            type="button"
            className="book-button"
            tabIndex={isOpen ? 0 : -1}
            onClick={() => {
              setIsOpen(false);
              openAppointmentForm();
            }}
          >
            <p className="book-button-text">записатися</p>
            <PiArrowUpRightBold className="book-button-icon" />
          </button>
        </div>
      </div>
    </header>
  );
}
