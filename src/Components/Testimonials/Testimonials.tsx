"use client";

import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { Testimonial } from "@/generated/prisma/client";
import { PiArrowUpRightBold } from "react-icons/pi";

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

  console.log(testimonials);

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
              Based on verified Google reviews
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
        <div className="testimonials-read-all">
          <p>Читати всі відгуки</p>
          <PiArrowUpRightBold />
        </div>
      </div>
    </section>
  );
}
