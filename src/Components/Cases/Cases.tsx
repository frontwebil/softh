"use client";

import { useState, useCallback } from "react";
import { BeforeAfterSlider } from "./BeforeAfterSlides/BeforeAfterSlides";
import "./style.css";

interface CaseItem {
  id: number;
  before: string;
  after: string;
  doctor: string;
  details: { label: string; text: string }[];
}

const cases: CaseItem[] = [
  {
    id: 1,
    before: "/Cases/before-1.webp",
    after: "/Cases/after-1.webp",
    doctor: "Dr. Nataliy Semeniuk",
    details: [
      {
        label: "запит",
        text: "Незадоволення виглядом усмішки, формою зубного ряду, потреба замінити застарілі конструкції.",
      },
    ],
  },
  {
    id: 2,
    before: "/Cases/before-1.webp",
    after: "/Cases/after-1.webp",
    doctor: "Dr. Olena Petrenko",
    details: [
      {
        label: "проблема",
        text: "Патологічна стертість зубів",
      },
      {
        label: "рішення",
        text: "Комплексне відновлення керамічними реставраціями",
      },
    ],
  },
];

export function Cases() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (index === current || fading) return;
      setFading(true);
      setTimeout(() => {
        setCurrent(index);
        setFading(false);
      }, 300);
    },
    [current, fading],
  );

  const prev = () => goTo((current - 1 + cases.length) % cases.length);
  const next = () => goTo((current + 1) % cases.length);

  const c = cases[current];

  return (
    <section className="cases">
      <div className="container">
        <div className="cases-top">
          <div className="cases-top-left">
            <div className="cases-top-left-line">
              <div className="line"></div>
              <p>кейси до / після</p>
            </div>
            <div className="cases-top-title">
              <span style={{ fontStyle: "italic" }}>Результат</span> , що <br />
              виглядає природно
            </div>
          </div>

          <div className="cases-top-right-text">
            Ми прагнемо не просто усунути проблему, а відновити здоров{"'"}я,
            функцію та природний вигляд усмішки
          </div>
        </div>

        {/* Slide */}
        <div className={`case-content${fading ? " case-content--fade" : ""}`}>
          <div className="case-item">
            <BeforeAfterSlider
              beforeSrc={c.before}
              afterSrc={c.after}
              beforeLabel="ДО"
              afterLabel="ПІСЛЯ"
            />
          </div>

          <div className="case-content-right">
            <h2 className="case-content-right-title">Деталі кейсу</h2>
            <div className="case-content-right-content">
              {c.details.map((d) => (
                <div key={d.label} className="case-content-right-content-list">
                  <h4 className="case-content-right-content-list-title">
                    {d.label}
                  </h4>
                  <p className="case-content-right-content-list-text">
                    {d.text}
                  </p>
                </div>
              ))}
              <div className="case-content-right-content-list">
                <h4 className="case-content-right-content-list-title">
                  ім{"'"}я лікуючого лікаря
                </h4>
                <p className="case-content-right-content-list-text">
                  {c.doctor}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="cases-controls">
          <button className="cases-arrow" onClick={prev} aria-label="Назад">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M13 4L7 10L13 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="cases-dots">
            {cases.map((_, i) => (
              <button
                key={i}
                className={`cases-dot${i === current ? " cases-dot--active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Слайд ${i + 1}`}
              />
            ))}
          </div>

          <button className="cases-arrow" onClick={next} aria-label="Вперед">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M7 4L13 10L7 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
