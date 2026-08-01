"use client";

import { Testimonial } from "@/generated/prisma/client";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { Loader } from "../Loader/Loader";
import { useRouter } from "next/navigation";

export function TestimonialsEditor({
  Testimonials,
}: {
  Testimonials: Testimonial[];
}) {
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState(Testimonials);
  const router = useRouter();

  const onChange = (index: number, field: string, value: string) => {
    setTestimonials((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };
  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await axios.put("/api/testimonials/update", {
        testimonials,
      });

      toast.success("Зміни успішно збережено");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Помилка при збереженні");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div className="admin-head">
        <div>
          <h1 className="admin-title">Редагування відгуків</h1>
          <p className="admin-subtitle">
            Три відгуки, які показуються на головній сторінці.
          </p>
        </div>
      </div>
      <div className="admin-cards">
        {testimonials.map((item, index) => (
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
                onChange={(e) => onChange(index, "name", e.target.value)}
              />
            </div>

            <div className="admin-field">
              <label htmlFor={`role-${item.id}`}>Підпис / послуга</label>
              <input
                id={`role-${item.id}`}
                className="admin-input"
                placeholder="Ортодонтичне лікування"
                value={item.category}
                onChange={(e) => onChange(index, "category", e.target.value)}
              />
            </div>

            <div className="admin-field">
              <label htmlFor={`role-${item.id}`}>Дата</label>
              <input
                id={`role-${item.id}`}
                className="admin-input"
                placeholder="Березень 2025"
                value={item.date}
                onChange={(e) => onChange(index, "date", e.target.value)}
              />
            </div>

            <div className="admin-field">
              <label htmlFor={`text-${item.id}`}>Текст відгуку</label>
              <textarea
                id={`text-${item.id}`}
                className="admin-input admin-textarea"
                placeholder="Текст відгуку…"
                value={item.text}
                onChange={(e) => onChange(index, "text", e.target.value)}
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
          onClick={handleSubmit}
        >
          {loading ? "Зберігаю…" : "Зберегти зміни"}
        </button>
      </div>
    </>
  );
}
