"use client";

import { useState } from "react";
import { toast } from "sonner";
import { LuChevronDown } from "react-icons/lu";

export type PriceItem = {
  id: string;
  name: string;
  price: string;
};

export type PriceCategory = {
  id: string;
  title: string;
  items: PriceItem[];
};

export const PRICE_CATEGORIES: PriceCategory[] = [
  {
    id: "consultation",
    title: "Консультативно-діагностичні послуги",
    items: [],
  },
  {
    id: "therapy",
    title: "Терапевтична та ендодонтична стоматологія",
    items: [],
  },
  {
    id: "surgery",
    title: "Хірургічна стоматологія",
    items: [],
  },
  {
    id: "orthodontics",
    title: "Ортодонтичне лікування",
    items: [],
  },
  {
    id: "pediatric",
    title: "Дитяча стоматологія",
    items: [],
  },
  {
    id: "prosthetics",
    title: "Ортопедична стоматологія",
    items: [],
  },
];

export function PricesEditor() {
  const [loading, setLoading] = useState(false);
  const [openId, setOpenId] = useState([""]);
  const [services, setServices] = useState(PRICE_CATEGORIES);

  const handleChangeService = (
    categoryId: string,
    serviceId: string,
    field: "name" | "price",
    value: string,
  ) => {
    setServices((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) =>
                item.id === serviceId ? { ...item, [field]: value } : item,
              ),
            }
          : category,
      ),
    );
  };

  const handleAddService = (id: string) => {
    setServices((prev) =>
      prev.map((category) =>
        category.id === id
          ? {
              ...category,
              items: [
                ...category.items,
                {
                  id: crypto.randomUUID(),
                  name: "",
                  price: "",
                },
              ],
            }
          : category,
      ),
    );
  };

  const handleDeleteService = (categoryId: string, serviceId: string) => {
    setServices((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.filter((item) => item.id !== serviceId),
            }
          : category,
      ),
    );
  };

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="admin-title">Редагування прайсу</h1>
        </div>
      </div>

      <div className="admin-accordion">
        {services.map((category) => {
          const open = openId.includes(category.id);

          return (
            <div
              key={category.id}
              className={`admin-cat${open ? " open" : ""}`}
            >
              <button
                type="button"
                className="admin-cat-head"
                onClick={() => {
                  if (openId.includes(category.id)) {
                    const openIdFiltered = openId.filter(
                      (el) => el !== category.id,
                    );
                    setOpenId(openIdFiltered);
                    return;
                  } else {
                    setOpenId([...openId, category.id]);
                  }
                }}
              >
                <span className="admin-cat-title">{category.title}</span>
                <span className="admin-cat-count">
                  {category.items.length} послуг
                </span>
                <LuChevronDown className="admin-cat-chevron" size={18} />
              </button>

              {open && (
                <div className="admin-cat-body">
                  {category.items.length === 0 && (
                    <p className="admin-empty">
                      Послуг ще немає — додайте першу.
                    </p>
                  )}

                  {category.items.map((item, index) => (
                    <div key={item.id} className="admin-row">
                      <span className="admin-row-index">
                        ({String(index + 1).padStart(2, "0")})
                      </span>
                      <input
                        className="admin-input admin-input--service"
                        placeholder="Назва послуги"
                        value={item.name}
                        onChange={(e) =>
                          handleChangeService(
                            category.id,
                            item.id,
                            "name",
                            e.target.value,
                          )
                        }
                      />
                      <input
                        className="admin-input admin-input--price"
                        placeholder="500 грн"
                        value={item.price}
                        onChange={(e) =>
                          handleChangeService(
                            category.id,
                            item.id,
                            "price",
                            e.target.value,
                          )
                        }
                      />
                      <button
                        type="button"
                        className="admin-btn admin-btn--danger admin-btn--sm"
                        onClick={() =>
                          handleDeleteService(category.id, item.id)
                        }
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
        <button type="button" className="admin-btn admin-btn--primary">
          {loading ? "Зберігаю…" : "Зберегти зміни"}
        </button>
      </div>
    </>
  );
}
