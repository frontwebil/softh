"use client";

import { useState } from "react";
import { toast } from "sonner";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
};

export const TESTIMONIALS: Testimonial[] = [
  { id: "1", name: "", role: "", rating: 5, text: "" },
  { id: "2", name: "", role: "", rating: 5, text: "" },
  { id: "3", name: "", role: "", rating: 5, text: "" },
];

export function TestimonialsEditor({
  initialTestimonials = TESTIMONIALS,
}: {
  initialTestimonials?: Testimonial[];
}) {
  const [items, setItems] = useState<Testimonial[]>(initialTestimonials);
  const [saving, setSaving] = useState(false);

  const change = <K extends keyof Testimonial>(
    id: string,
    field: K,
    value: Testimonial[K],
  ) =>
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );

  const clear = (id: string) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, name: "", role: "", rating: 5, text: "" }
          : item,
      ),
    );

  const handleSave = async () => {
    setSaving(true);
    try {
      // TODO: підключити бекенд — POST /api/admin/testimonials з `items`
      await new Promise((resolve) => setTimeout(resolve, 400));
      toast.success("Відгуки збережено");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="admin-title">Редагування відгуків</h1>
          <p className="admin-subtitle">
            Три відгуки, які показуються на головній сторінці.
          </p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Зберігаю…" : "Зберегти зміни"}
        </button>
      </div>

      <div className="admin-cards">
        {items.map((item, index) => (
          <div key={item.id} className="admin-card">
            <div className="admin-card-top">
              <span className="admin-card-label">Відгук {index + 1}</span>
              <button
                type="button"
                className="admin-btn admin-btn--secondary admin-btn--sm"
                onClick={() => clear(item.id)}
              >
                Очистити
              </button>
            </div>

            <div className="admin-field">
              <label htmlFor={`name-${item.id}`}>Ім&apos;я</label>
              <input
                id={`name-${item.id}`}
                className="admin-input"
                placeholder="Олена К."
                value={item.name}
                onChange={(event) =>
                  change(item.id, "name", event.target.value)
                }
              />
            </div>

            <div className="admin-field">
              <label htmlFor={`role-${item.id}`}>Підпис / послуга</label>
              <input
                id={`role-${item.id}`}
                className="admin-input"
                placeholder="Ортодонтичне лікування"
                value={item.role}
                onChange={(event) =>
                  change(item.id, "role", event.target.value)
                }
              />
            </div>

            <div className="admin-field">
              <label>Оцінка</label>
              <div className="admin-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    aria-label={`${star} з 5`}
                    className={`admin-star${star <= item.rating ? " on" : ""}`}
                    onClick={() => change(item.id, "rating", star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="admin-field">
              <label htmlFor={`text-${item.id}`}>Текст відгуку</label>
              <textarea
                id={`text-${item.id}`}
                className="admin-input admin-textarea"
                placeholder="Текст відгуку…"
                value={item.text}
                onChange={(event) =>
                  change(item.id, "text", event.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="admin-save-bar">
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Зберігаю…" : "Зберегти зміни"}
        </button>
        <span className="admin-hint">
          Дані поки що зберігаються лише в стані компонента.
        </span>
      </div>
    </>
  );
}
