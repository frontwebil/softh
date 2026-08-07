"use client";

import Link from "next/link";
import "./style.css";
import Image from "next/image";
import { PiArrowUpRightBold, PiInstagramLogoFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { openAppointmentForm } from "@/lib/appointment";

export function Hero() {
  return (
    <section className="hero" id="hero">
      <Image
        src="/Hero/hero-bgv2.webp"
        alt="Стоматологія SOFTH СТО у Петропавлівській Борщагівці"
        fill
        priority
        className="hero-bg"
      />
      <div className="container">
        <div className="hero-content">
          <div className="hero-content-text-top-flex">
            <div className="line"></div>
            <p className="hero-content-text-top">Турбота про вашу усмішку</p>
          </div>
          <h1 className="hero-content-title">
            Стоматологія у Борщагівці, де ви розумієте{" "}
            <span>кожне рішення</span>
          </h1>
          <p className="hero-content-text">
            Клініка у Петропавлівській Борщагівці: проводимо точну діагностику, пояснюємо
            можливі варіанти та складаємо зрозумілий план лікування ще до
            початку процедур
          </p>
          <div className="hero-content-buttons">
            <button
              type="button"
              className="book-button"
              onClick={() => openAppointmentForm()}
            >
              <p className="book-button-text">Запис на консультацію</p>
              <PiArrowUpRightBold className="book-button-icon" />
            </button>
            <Link href={"/#services"} className="hero-content-see-services">
              Переглянути послуги
            </Link>
          </div>
        </div>

        <div className="hero-icons">
          <Link
            href={"https://maps.app.goo.gl/wDVMjNmgoq6kgpZP6"}
            target="_blank"
            className="hero-icon"
            rel="noopener noreferrer"
            aria-label="Відкрити клініку на Google Maps"
          >
            <FaLocationDot />
          </Link>
          <Link
            href={"https://www.instagram.com/softh_cto"}
            target="_blank"
            className="hero-icon"
            rel="noopener noreferrer"
            aria-label="Instagram SOFTH СТО"
          >
            <PiInstagramLogoFill />
          </Link>
        </div>
      </div>
    </section>
  );
}
