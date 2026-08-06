"use client";

import Link from "next/link";
import "./style.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import {
  APPOINTMENT_EVENT,
  APPOINTMENT_FORM_ID,
  type AppointmentRequestDetail,
} from "@/lib/appointment";
import axios from "axios";

export function Contacts() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    message: "",
    contactWay: "phoneCall",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  /** CTA-кнопки з інших секцій: підставити запит і сфокусувати поле */
  useEffect(() => {
    const handleRequest = (event: Event) => {
      const { message } =
        (event as CustomEvent<AppointmentRequestDetail>).detail ?? {};

      setStatus("idle");

      if (message) {
        setData((prev) => ({ ...prev, message }));
      }

      window.setTimeout(() => {
        messageRef.current?.focus({ preventScroll: true });
      }, 600);
    };

    window.addEventListener(APPOINTMENT_EVENT, handleRequest);

    return () => window.removeEventListener(APPOINTMENT_EVENT, handleRequest);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactWay = (
    way: "phoneCall" | "telegram" | "viber" | "whatsapp",
  ) => {
    setData((prev) => ({
      ...prev,
      contactWay: way,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === "loading") return;

    setStatus("loading");

    try {
      await axios.post("/api/createLeed", data);

      setStatus("success");
      setData({ name: "", phone: "", message: "", contactWay: "phoneCall" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="contacts" id="contacts">
      <div className="container">
        <div className="contacts-top">
          <div className="contacts-top-left">
            <div className="contacts-top-left-line">
              <div className="line"></div>
              <p>контакти та запис</p>
            </div>
            <h2 className="contacts-top-left-title">
              <span>Заплануйте візит</span> <br /> у зручний спосіб
            </h2>
          </div>
          <div className="contacts-top-right">
            <p className="contacts-top-right-text">
              Зателефонуйте, напишіть нам або залиште заявку — адміністратор
              уточнить деталі та допоможе обрати зручний час.
            </p>
          </div>
        </div>
        <div className="contacts-content">
          <div className="contacts-content-left">
            <div className="contacts-info">
              <div className="contacts-block">
                <span className="contacts-title">АДРЕСА</span>

                <Link
                  href={"https://maps.app.goo.gl/fi7QUYzG3bm5BjSYA"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contacts-text"
                >
                  вулиця Авіаторів, 2Д
                  <br />
                  Петропавлівська Борщагівка,
                  <br />
                  Київська область, 08129
                </Link>
              </div>

              <div className="contacts-block">
                <span className="contacts-title">ГОДИНИ РОБОТИ</span>

                <div className="contacts-schedule">
                  <div className="contacts-schedule-row">
                    <span>ПН - ПТ:</span>
                    <span>09:00 - 19:00</span>
                  </div>

                  <div className="contacts-schedule-row">
                    <span>Субота:</span>
                    <span>10:00 - 18:00</span>
                  </div>

                  <div className="contacts-schedule-row">
                    <span>Неділя:</span>
                    <span>Зачинено</span>
                  </div>
                </div>
              </div>

              <div className="contacts-block">
                <span className="contacts-title">КОНТАКТИ</span>

                <a href="tel:+380982005055" className="contacts-phone">
                  +38 (098) 200-50-55
                </a>
              </div>

              <div className="contacts-socials">
                <a
                  href="https://t.me/+380982005055"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contacts-social-btn"
                >
                  Telegram
                </a>

                <a
                  href="viber://chat?number=%2B380982005055"
                  className="contacts-social-btn"
                >
                  Viber
                </a>

                <a
                  href="https://wa.me/380982005055"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contacts-social-btn"
                >
                  WhatsApp
                </a>

                <a
                  href="https://www.instagram.com/softh_cto/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contacts-social-btn"
                >
                  Instagram
                </a>
              </div>
            </div>
            <div className="contacts-content-left-address">
              <div className="contacts-content-left-address-icon">
                <FaMapMarkerAlt />
              </div>
              <Link
                href={"https://maps.app.goo.gl/fi7QUYzG3bm5BjSYA"}
                className="contacts-content-left-address-text"
                target="_blank"
                rel="noopener noreferrer"
              >
                вулиця Авіаторів, 2Д Петропавлівська Борщагівка, <br />
                Київська область, 08129
              </Link>
              <Link
                href={"https://maps.app.goo.gl/fi7QUYzG3bm5BjSYA"}
                className="contacts-content-left-address-open"
                target="_blank"
                rel="noopener noreferrer"
              >
                Відкрити у Google Maps
              </Link>
            </div>
          </div>
          <form
            className="appointment-form"
            id={APPOINTMENT_FORM_ID}
            onSubmit={handleSubmit}
          >
            {status === "success" ? (
              <div className="appointment-success">
                <div className="appointment-success-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12.5L10 17.5L19 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p className="appointment-success-title">Дякуємо!</p>

                <p className="appointment-success-text">
                  Ми зв{"'"}яжемося з вами найближчим часом
                </p>

                <button
                  type="button"
                  className="appointment-success-again"
                  onClick={() => setStatus("idle")}
                >
                  Надіслати ще одну заявку
                </button>
              </div>
            ) : (
              <>
            <div>
              <h2 className="appointment-title">ЗАПИС НА ПРИЙОМ</h2>

              <p className="appointment-description">
                Зателефонуйте, напишіть нам або залиште заявку — адміністратор
                уточнить ваш запит і допоможе обрати відповідного лікаря.
              </p>

              <div className="appointment-row">
                <div className="appointment-field">
                  <label htmlFor="name">Прізвище та ім{"'"}я</label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Вкажіть Ваше повне ім'я"
                    value={data.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="appointment-field">
                  <label htmlFor="phone">Номер телефону</label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+38 (0__) ___-__-__"
                    value={data.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div className="appointment-field">
                <label htmlFor="request">Чим ми можемо Вам допомогти?</label>

                <textarea
                  id="request"
                  name="message"
                  ref={messageRef}
                  rows={1}
                  placeholder="Коротко опишіть свою проблему або запитання..."
                  value={data.message}
                  onChange={handleChange}
                />
              </div>

              <div className="appointment-contact-method">
                <span className="appointment-label">
                  Бажаний спосіб зв{"'"}язку
                </span>

                <div className="appointment-methods">
                  <button
                    type="button"
                    className={`appointment-method ${
                      data.contactWay === "phoneCall" ? "active" : ""
                    }`}
                    onClick={() => handleContactWay("phoneCall")}
                  >
                    Дзвінок
                  </button>

                  <button
                    type="button"
                    className={`appointment-method ${
                      data.contactWay === "telegram" ? "active" : ""
                    }`}
                    onClick={() => handleContactWay("telegram")}
                  >
                    Telegram
                  </button>

                  <button
                    type="button"
                    className={`appointment-method ${
                      data.contactWay === "viber" ? "active" : ""
                    }`}
                    onClick={() => handleContactWay("viber")}
                  >
                    Viber
                  </button>

                  <button
                    type="button"
                    className={`appointment-method ${
                      data.contactWay === "whatsapp" ? "active" : ""
                    }`}
                    onClick={() => handleContactWay("whatsapp")}
                  >
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {status === "error" && (
              <p className="appointment-error" role="alert">
                Не вдалося надіслати заявку. Спробуйте ще раз або
                зателефонуйте нам.
              </p>
            )}

            <button
              type="submit"
              className="appointment-submit"
              disabled={status === "loading"}
            >
              <span>
                {status === "loading" ? "НАДСИЛАЄМО..." : "НАДІСЛАТИ ЗАПИТ"}
              </span>

              <span className="appointment-submit-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 10L10 2M10 2H4M10 2V8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
