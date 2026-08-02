import Image from "next/image";
import "./style.css";

export const advantages = [
  {
    id: 1,
    text: "Делікатне спілкування",
  },
  {
    id: 2,
    text: "Сучасна анестезія",
  },
  {
    id: 3,
    text: "Спокійна приватна атмосфера",
  },
  {
    id: 4,
    text: "Підтримка після лікування",
  },
];

export function ComfortBanner() {
  return (
    <section className="comfort-banner">
      <Image src={"/ComfortBanner/bg-2.webp"} fill alt="" draggable={false} />
      <div className="container">
        <div className="banner-content">
          <div className="banner-content-top">
            <div className="line"></div>
            <p className="banner-content-top-text">Комфорт пацієнта</p>
          </div>
          <h2 className="banner-title">
            Візит до стоматолога <br />
            <span>без зайвого стресу</span>
          </h2>
          <p className="banner-text">
            Ми пояснюємо кожен етап, даємо вам час поставити запитання та
            адаптуємо процес лікування відповідно до вашого рівня комфорту
          </p>

          <div className="banner-cards">
            {advantages.map((el) => (
              <div className="banner-card" key={el.id}>
                <img src="/ComfortBanner/icon.svg" alt="" />
                <p>{el.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
