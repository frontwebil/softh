"use client";

import { Testimonial } from "@/generated/prisma/client";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Loader } from "../Loader/Loader";
import { useRouter } from "next/navigation";

type EditableTestimonial = Testimonial & { isNew?: boolean };

export function TestimonialsEditor({
  Testimonials,
}: {
  Testimonials: Testimonial[];
}) {
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState<EditableTestimonial[]>(
    Testimonials,
  );
  const router = useRouter();

  const onChange = (
    index: number,
    field: keyof Testimonial,
    value: string | boolean,
  ) =>
    setTestimonials((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );

  const handleAdd = () =>
    setTestimonials((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "",
        category: "",
        date: "",
        text: "",
        order: prev.length,
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        isNew: true,
      },
    ]);

  const handleDelete = async (item: EditableTestimonial) => {
    if (!item.isNew) {
      try {
        await axios.delete(`/api/testimonials/${item.id}`);
      } catch (error) {
        console.error(error);
        toast.error("Не вдалося видалити відгук");
        return;
      }
    }

    setTestimonials((prev) => prev.filter((current) => current.id !== item.id));
    toast.success("Відгук видалено");
  };

  /** Око — одразу PUT на сервер */
  const handleToggleVisible = async (
    item: EditableTestimonial,
    index: number,
  ) => {
    const visible = !item.visible;
    onChange(index, "visible", visible);

    if (item.isNew) return;

    try {
      await axios.put(`/api/testimonials/${item.id}`, { visible });
    } catch (error) {
      console.error(error);
      toast.error("Не вдалося змінити видимість");
      onChange(index, "visible", item.visible);
    }
  };

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const { data } = await axios.put("/api/testimonials/update", {
        testimonials: testimonials.map((item) => ({
          id: item.isNew ? undefined : item.id,
          name: item.name,
          category: item.category,
          date: item.date,
          text: item.text,
          visible: item.visible,
        })),
      });

      setTestimonials(data.data as Testimonial[]);
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
            Відгуки на головній сторінці. Око — показувати чи ховати.
          </p>
        </div>
        <div className="admin-head-actions">
          <button
            type="button"
            className="admin-btn admin-btn--secondary"
            onClick={handleAdd}
          >
            + Відгук
          </button>
          <button
            type="button"
            className="admin-btn admin-btn--primary"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Зберігаю…" : "Зберегти зміни"}
          </button>
        </div>
      </div>
      <div className="admin-cards">
        {testimonials.map((item, index) => (
          <div
            key={item.id}
            className={`admin-card${item.visible ? "" : " hidden-row"}`}
          >
            <div className="admin-card-top">
              <span className="admin-card-label">Відгук {index + 1}</span>
              <div className="admin-card-top-actions">
                <button
                  type="button"
                  className="admin-eye"
                  title={
                    item.visible ? "Видимий на сайті" : "Прихований на сайті"
                  }
                  aria-label="Видимість відгуку"
                  onClick={() => handleToggleVisible(item, index)}
                >
                  {item.visible ? <LuEye size={17} /> : <LuEyeOff size={17} />}
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn--danger admin-btn--sm"
                  onClick={() => handleDelete(item)}
                >
                  Видалити
                </button>
              </div>
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
              <label htmlFor={`category-${item.id}`}>Підпис / послуга</label>
              <input
                id={`category-${item.id}`}
                className="admin-input"
                placeholder="Ортодонтичне лікування"
                value={item.category}
                onChange={(e) => onChange(index, "category", e.target.value)}
              />
            </div>

            <div className="admin-field">
              <label htmlFor={`date-${item.id}`}>Дата</label>
              <input
                id={`date-${item.id}`}
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
        <span className="admin-hint">
          «Зберегти» відправляє всі відгуки одним PUT-запитом.
        </span>
      </div>
    </>
  );
}
