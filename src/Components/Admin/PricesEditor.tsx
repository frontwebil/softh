"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  LuChevronDown,
  LuChevronUp,
  LuEye,
  LuEyeOff,
} from "react-icons/lu";
import { Category, Service } from "@/generated/prisma/client";
import { Loader } from "../Loader/Loader";

export type EditableService = {
  id: string;
  category: Category;
  title: string;
  price: string;
  visible: boolean;
  isNew?: boolean;
};

export const PRICE_CATEGORIES: { id: Category; title: string }[] = [
  { id: "consultation", title: "Консультативно-діагностичні послуги" },
  { id: "therapy", title: "Терапевтична та ендодонтична стоматологія" },
  { id: "surgery", title: "Хірургічна стоматологія" },
  { id: "orthodontics", title: "Ортодонтичне лікування" },
  { id: "pediatric", title: "Дитяча стоматологія" },
  { id: "prosthetics", title: "Ортопедична стоматологія" },
];

const toEditable = (service: Service): EditableService => ({
  id: service.id,
  category: service.category,
  title: service.title,
  price: service.price,
  visible: service.visible,
});

export function PricesEditor({ Services }: { Services?: Service[] }) {
  const [loading, setLoading] = useState(false);
  const [openId, setOpenId] = useState<Category[]>([]);
  const [services, setServices] = useState<EditableService[]>(
    (Services ?? []).map(toEditable),
  );

  useEffect(() => {
    if (Services) return;

    axios
      .get("/api/service/get-all?all=1")
      .then(({ data }) => setServices((data.data as Service[]).map(toEditable)))
      .catch((error) => {
        console.error(error);
        toast.error("Не вдалося завантажити прайс");
      });
  }, [Services]);

  const byCategory = (category: Category) =>
    services.filter((service) => service.category === category);

  const handleChangeService = (
    id: string,
    field: "title" | "price",
    value: string,
  ) =>
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, [field]: value } : service,
      ),
    );

  const handleAddService = (category: Category) =>
    setServices((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        category,
        title: "",
        price: "",
        visible: true,
        isNew: true,
      },
    ]);

  /** Змінити порядок послуги всередині категорії (↑ / ↓) */
  const handleMoveService = (service: EditableService, direction: -1 | 1) =>
    setServices((prev) => {
      const sameCategory = prev.filter(
        (item) => item.category === service.category,
      );
      const position = sameCategory.findIndex(
        (item) => item.id === service.id,
      );
      const target = sameCategory[position + direction];

      if (!target) return prev;

      const next = [...prev];
      const from = next.findIndex((item) => item.id === service.id);
      const to = next.findIndex((item) => item.id === target.id);
      [next[from], next[to]] = [next[to], next[from]];

      return next;
    });

  const handleDeleteService = async (service: EditableService) => {
    if (!service.isNew) {
      try {
        await axios.delete(`/api/service/${service.id}`);
      } catch (error) {
        console.error(error);
        toast.error("Не вдалося видалити послугу");
        return;
      }
    }

    setServices((prev) => prev.filter((item) => item.id !== service.id));
    toast.success("Послугу видалено");
  };

  /** Око послуги — одразу PUT на сервер */
  const handleToggleService = async (service: EditableService) => {
    const visible = !service.visible;

    setServices((prev) =>
      prev.map((item) =>
        item.id === service.id ? { ...item, visible } : item,
      ),
    );

    if (service.isNew) return;

    try {
      await axios.put(`/api/service/${service.id}`, { visible });
    } catch (error) {
      console.error(error);
      toast.error("Не вдалося змінити видимість");
      setServices((prev) =>
        prev.map((item) =>
          item.id === service.id ? { ...item, visible: service.visible } : item,
        ),
      );
    }
  };

  /** Око категорії — ховає/показує всі послуги категорії */
  const handleToggleCategory = async (category: Category, visible: boolean) => {
    setServices((prev) =>
      prev.map((service) =>
        service.category === category ? { ...service, visible } : service,
      ),
    );

    try {
      await axios.put(`/api/service/category/${category}`, { visible });
    } catch (error) {
      console.error(error);
      toast.error("Не вдалося змінити видимість категорії");
    }
  };

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const { data } = await axios.put("/api/service/update", {
        services: services.map((service) => ({
          id: service.isNew ? undefined : service.id,
          category: service.category,
          title: service.title,
          price: service.price,
          visible: service.visible,
        })),
      });

      setServices((data.data as Service[]).map(toEditable));
      toast.success("Зміни успішно збережено");
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
          <h1 className="admin-title">Редагування прайсу</h1>
          <p className="admin-subtitle">
            Око — показувати чи ховати послугу, стрілки — порядок.
          </p>
        </div>
      </div>

      <div className="admin-accordion">
        {PRICE_CATEGORIES.map((category) => {
          const open = openId.includes(category.id);
          const items = byCategory(category.id);
          const categoryVisible =
            items.length > 0 && items.some((item) => item.visible);

          return (
            <div
              key={category.id}
              className={`admin-cat${open ? " open" : ""}${
                items.length > 0 && !categoryVisible ? " hidden-row" : ""
              }`}
            >
              <div className="admin-cat-head">
                <button
                  type="button"
                  className="admin-eye"
                  title={
                    categoryVisible
                      ? "Приховати всю категорію"
                      : "Показати всю категорію"
                  }
                  aria-label="Видимість категорії"
                  disabled={items.length === 0}
                  onClick={() =>
                    handleToggleCategory(category.id, !categoryVisible)
                  }
                >
                  {categoryVisible ? <LuEye size={17} /> : <LuEyeOff size={17} />}
                </button>

                <button
                  type="button"
                  className="admin-cat-main"
                  onClick={() =>
                    setOpenId((prev) =>
                      prev.includes(category.id)
                        ? prev.filter((id) => id !== category.id)
                        : [...prev, category.id],
                    )
                  }
                >
                  <span className="admin-cat-title">{category.title}</span>
                  <span className="admin-cat-count">
                    {items.length} послуг
                  </span>
                  <LuChevronDown className="admin-cat-chevron" size={18} />
                </button>
              </div>

              {open && (
                <div className="admin-cat-body">
                  {items.length === 0 && (
                    <p className="admin-empty">
                      Послуг ще немає — додайте першу.
                    </p>
                  )}

                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className={`admin-row${item.visible ? "" : " hidden-row"}`}
                    >
                      <span className="admin-row-index">
                        ({String(index + 1).padStart(2, "0")})
                      </span>
                      <div className="admin-order">
                        <button
                          type="button"
                          className="admin-order-btn"
                          title="Вище"
                          aria-label="Підняти вище"
                          disabled={index === 0}
                          onClick={() => handleMoveService(item, -1)}
                        >
                          <LuChevronUp size={14} />
                        </button>
                        <button
                          type="button"
                          className="admin-order-btn"
                          title="Нижче"
                          aria-label="Опустити нижче"
                          disabled={index === items.length - 1}
                          onClick={() => handleMoveService(item, 1)}
                        >
                          <LuChevronDown size={14} />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="admin-eye"
                        title={
                          item.visible
                            ? "Видима на сайті"
                            : "Прихована на сайті"
                        }
                        aria-label="Видимість послуги"
                        onClick={() => handleToggleService(item)}
                      >
                        {item.visible ? (
                          <LuEye size={16} />
                        ) : (
                          <LuEyeOff size={16} />
                        )}
                      </button>
                      <input
                        className="admin-input admin-input--service"
                        placeholder="Назва послуги"
                        value={item.title}
                        onChange={(e) =>
                          handleChangeService(item.id, "title", e.target.value)
                        }
                      />
                      <input
                        className="admin-input admin-input--price"
                        placeholder="500 грн"
                        value={item.price}
                        onChange={(e) =>
                          handleChangeService(item.id, "price", e.target.value)
                        }
                      />
                      <button
                        type="button"
                        className="admin-btn admin-btn--danger admin-btn--sm"
                        onClick={() => handleDeleteService(item)}
                      >
                        Видалити
                      </button>
                    </div>
                  ))}

                  <div className="admin-cat-actions">
                    <button
                      type="button"
                      className="admin-btn admin-btn--secondary admin-btn--sm"
                      onClick={() => handleAddService(category.id)}
                    >
                      + Додати послугу
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
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
