"use client";

import { Testimonial } from "@/generated/prisma/client";
import { useState } from "react";

export function TestimonialsEditor({
  Testimonials,
}: {
  Testimonials: Testimonial[];
}) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="admin-title">Редагування відгуків</h1>
          <p className="admin-subtitle">
            Три відгуки, які показуються на головній сторінці.
          </p>
        </div>
      </div>

      <div className="admin-cards">
        {Testimonials.map((item, index) => (
          <div key={item.id} className="admin-card">
            <div className="admin-card-top">
              <span className="admin-card-label">Відгук {index + 1}</span>
            </div>

            <div className="admin-field">
              <label htmlFor={`name-${item.id}`}>Ім&apos;я</label>
              <input
                id={`name-${item.id}`}
                className="admin-input"
                placeholder="Олена К."
                value={item.name}
              />
            </div>

            <div className="admin-field">
              <label htmlFor={`role-${item.id}`}>Підпис / послуга</label>
              <input
                id={`role-${item.id}`}
                className="admin-input"
                placeholder="Ортодонтичне лікування"
                value={item.category}
              />
            </div>

            <div className="admin-field">
              <label htmlFor={`role-${item.id}`}>Дата</label>
              <input
                id={`role-${item.id}`}
                className="admin-input"
                placeholder="Березень 2025"
                value={item.date}
              />
            </div>

            <div className="admin-field">
              <label htmlFor={`text-${item.id}`}>Текст відгуку</label>
              <textarea
                id={`text-${item.id}`}
                className="admin-input admin-textarea"
                placeholder="Текст відгуку…"
                value={item.text}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="admin-save-bar">
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          disabled={loading}
        >
          {loading ? "Зберігаю…" : "Зберегти зміни"}
        </button>
      </div>
    </>
  );
}
