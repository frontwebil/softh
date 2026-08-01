"use client";

import Link from "next/link";
import "./style.css";
import { PiArrowUpRightBold } from "react-icons/pi";
import { useEffect, useState } from "react";

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
            <Link href={"/"} className="header-nav-link">
              Послуги
            </Link>
            <Link href={"/"} className="header-nav-link">
              Про Клініку
            </Link>
            <Link href={"/"} className="header-nav-link">
              Спеціалісти
            </Link>
            <Link href={"/"} className="header-nav-link">
              Ціни
            </Link>
            <Link href={"/"} className="header-nav-link">
              Відгуки
            </Link>
            <Link href={"/"} className="header-nav-link">
              Контакти
            </Link>
          </nav>
        </div>
        <div className="header-right">
          <a href="tel:+380982005055" className="header-right-phone">
            +38 (098) 200-50-55
          </a>
          <Link href={"/"} className="book-button">
            <p className="book-button-text">записатися</p>
            <PiArrowUpRightBold className="book-button-icon" />
          </Link>
        </div>
      </div>
    </header>
  );
}
