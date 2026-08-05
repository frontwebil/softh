"use client";

import Link from "next/link";
import "./style.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";

export function Contacts() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    message: "",
    contactWay: "phoneCall",
  });

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(data);
  };

  return (
    <section className="contacts">
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
          <form className="appointment-form" onSubmit={handleSubmit}>
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

            <button type="submit" className="appointment-submit">
              <span>НАДІСЛАТИ ЗАПИТ</span>

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
          </form>
        </div>
      </div>
    </section>
  );
}
