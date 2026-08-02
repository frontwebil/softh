"use client";

import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { Testimonial } from "@/generated/prisma/client";
import { PiArrowUpRightBold } from "react-icons/pi";
import Link from "next/link";

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data } = await axios.get("/api/testimonials/get-all");

        setTestimonials(data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTestimonials();
  }, []);

  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials-top">
          <div className="testimonials-top-left">
            <div className="testimonials-top-left-top">
              <div className="line"></div>
              <p>Відгуки</p>
            </div>
            <h2 className="testimonials-top-left-title">
              <span>Довіра</span>, підтверджена досвідом пацієнтів
            </h2>
          </div>
          <div className="testimonials-top-right">
            <h3 className="testimonials-top-right-rating">5.0</h3>
            <div className="testimonials-stars">
              <img src="/Testimonials/star.svg" alt="star" />
              <img src="/Testimonials/star.svg" alt="star" />
              <img src="/Testimonials/star.svg" alt="star" />
              <img src="/Testimonials/star.svg" alt="star" />
              <img src="/Testimonials/star.svg" alt="star" />
            </div>
            <p className="testimonials-top-right-based">
              На основі перевірених відгуків у Google
            </p>
          </div>
        </div>
        {testimonials.length > 0 && (
          <div className="testimonials-cards">
            {testimonials.map((item, i) => (
              <div className="testimonials-card" key={i}>
                <div className="">
                  <div className="testimonials-card-top">
                    <div className="testimonials-stars">
                      <img src="/Testimonials/star.svg" alt="star" />
                      <img src="/Testimonials/star.svg" alt="star" />
                      <img src="/Testimonials/star.svg" alt="star" />
                      <img src="/Testimonials/star.svg" alt="star" />
                      <img src="/Testimonials/star.svg" alt="star" />
                    </div>
                    <p className="testimonials-card-top-date">{item.date}</p>
                  </div>
                  <div className="testimonials-card-text">{item.text}</div>
                </div>

                <div className="testimonials-card-under">
                  <div className="testimonials-card-under-left">
                    <p className="testimonials-card-under-left-name">
                      {item.name}
                    </p>
                    <p className="testimonials-card-under-left-category">
                      {item.category}
                    </p>
                  </div>
                  <div className="testimonials-card-under-logo">
                    {item.name[0].toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <Link
          href={
            "https://www.google.com/search?sca_esv=b2331d7122fe79eb&sxsrf=APpeQnthqThmaTTfKPtniHwp2SZsXJlm5Q:1785626628790&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_yRO54IQa_h344GWdsDkGWxkDEh6A50HcRGpeNvkb52lC2BUw5O5O2LPvgS8wqOpXN_1joewRBeMwfqBLPPVXDXmAaIjGtkZmEnL4y341Hhwd4GXq8lTzX8jQAf0-rEElP6vydA%3D&q=%D0%A1%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F+SofthCTO+%D0%92%D1%96%D0%B4%D0%B3%D1%83%D0%BA%D0%B8&sa=X&ved=2ahUKEwiC-qPHyYCWAxV0FhAIHQDyJ28Q0bkNegQILBAH"
          }
          target="_blank"
          className="testimonials-read-all"
        >
          <p>Читати всі відгуки</p>
          <PiArrowUpRightBold />
        </Link>
      </div>
    </section>
  );
}
