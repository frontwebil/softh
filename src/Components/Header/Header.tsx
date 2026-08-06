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

  return (
    <header className={isScrolled ? "scrolled" : ""}>
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
        </div>
      </div>
    </header>
  );
}
