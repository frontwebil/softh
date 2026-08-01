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

/** Категорії прайсу. Послуги та ціни додаються через адмінку. */
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
  { id: "surgery", title: "Хірургічна стоматологія", items: [] },
  { id: "orthodontics", title: "Ортодонтичне лікування", items: [] },
  { id: "kids", title: "Дитяча стоматологія", items: [] },
];

const newId = () => Math.random().toString(36).slice(2, 10);

export function PricesEditor({
  initialCategories = PRICE_CATEGORIES,
}: {
  initialCategories?: PriceCategory[];
}) {
  const [categories, setCategories] =
    useState<PriceCategory[]>(initialCategories);
  const [openId, setOpenId] = useState<string | null>(
    initialCategories[0]?.id ?? null,
  );
  const [saving, setSaving] = useState(false);

  const updateCategory = (
    categoryId: string,
    updater: (category: PriceCategory) => PriceCategory,
  ) =>
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId ? updater(category) : category,
      ),
    );

  const addItem = (categoryId: string) =>
    updateCategory(categoryId, (category) => ({
      ...category,
      items: [...category.items, { id: newId(), name: "", price: "" }],
    }));

  const removeItem = (categoryId: string, itemId: string) =>
    updateCategory(categoryId, (category) => ({
      ...category,
      items: category.items.filter((item) => item.id !== itemId),
    }));

  const changeItem = (
    categoryId: string,
    itemId: string,
    field: "name" | "price",
    value: string,
  ) =>
    updateCategory(categoryId, (category) => ({
      ...category,
      items: category.items.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item,
      ),
    }));

  const handleSave = async () => {
    setSaving(true);
    try {
      // TODO: підключити бекенд — POST /api/admin/prices з `categories`
      await new Promise((resolve) => setTimeout(resolve, 400));
      toast.success("Прайс збережено");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="admin-title">Редагування прайсу</h1>
        </div>
      </div>

      <div className="admin-accordion">
        {categories.map((category) => {
          const open = openId === category.id;

          return (
            <div
              key={category.id}
              className={`admin-cat${open ? " open" : ""}`}
            >
              <button
                type="button"
                className="admin-cat-head"
                onClick={() => setOpenId(open ? null : category.id)}
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
                        onChange={(event) =>
                          changeItem(
                            category.id,
                            item.id,
                            "name",
                            event.target.value,
                          )
                        }
                      />
                      <input
                        className="admin-input admin-input--price"
                        placeholder="500 грн"
                        value={item.price}
                        onChange={(event) =>
                          changeItem(
                            category.id,
                            item.id,
                            "price",
                            event.target.value,
                          )
                        }
                      />
                      <button
                        type="button"
                        className="admin-btn admin-btn--danger admin-btn--sm"
                        onClick={() => removeItem(category.id, item.id)}
                      >
                        Видалити
                      </button>
                    </div>
                  ))}

                  <div className="admin-cat-actions">
                    <button
                      type="button"
                      className="admin-btn admin-btn--secondary admin-btn--sm"
                      onClick={() => addItem(category.id)}
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
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Зберігаю…" : "Зберегти зміни"}
        </button>
      </div>
    </>
  );
}
