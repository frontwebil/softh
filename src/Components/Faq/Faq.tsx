"use client";

import Image from "next/image";
import "./style.css";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { faqItems } from "@/lib/faqData";

export function Faq() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const handleClick = (i: number) => {
    if (i == activeQuestion) {
      setActiveQuestion(null);
      return;
    }
    setActiveQuestion(i);
  };

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="faq-left-img">
          <Image
            src={"/Faq/main.webp"}
            width={1000}
            height={1000}
            alt="Фото кабінету"
          />
        </div>
        <div className="faq-right-content">
          <div className="faq-right-content-top">
            <div className="line"></div>
            <p>FAQ</p>
          </div>
          <div className="faq-right-content-top-text">
            <h2 className="faq-right-content-top-text-title">
              <span>Відповіді</span> на <br /> поширені запитання
            </h2>
            <p className="faq-right-content-top-text-description">
              Зібрали відповіді про консультацію, діагностику, вартість,
              гарантії та підготовку до першого візиту.
            </p>
          </div>
          <div className="faq-right-content-questions">
            {faqItems.map((item, i) => (
              <div
                className="faq-right-content-question-card"
                key={i}
                onClick={() => handleClick(i)}
              >
                <div className="faq-right-content-question-card-top">
                  <h3 className="faq-right-content-question-card-top-title">
                    {item.title}
                  </h3>
                  <IoIosArrowDown
                    className={`price-left-card-top-right-icon ${activeQuestion == i ? "active" : ""}`}
                  />
                </div>
                <div
                  className={`faq-right-content-question-card-text ${activeQuestion == i ? "active" : ""}`}
                  style={{ whiteSpace: "pre-line" }}
                >
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
