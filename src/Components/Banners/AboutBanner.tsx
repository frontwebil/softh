import Image from "next/image";
import "./style.css";

export function AboutBanner() {
  return (
    <section className="comfort-banner">
      <Image src={"/ComfortBanner/bg.webp"} fill alt="" draggable={false}/>
      <div className="container">
        <div className="banner-content">
          <div className="banner-content-top">
            <div className="line"></div>
            <p className="banner-content-top-text">
              ПРО{" "}
              <span className="banner-content-top-text-logo">
                softh<span> сто</span>
              </span>
            </p>
          </div>
          <h2 className="banner-title">
            Стоматологія, у якій <br />
            <span>важлива кожна деталь</span>
          </h2>
          <p className="banner-text">
            Ми поєднуємо точну діагностику, командну роботу лікарів і зрозумілий
            підхід до лікування. Пояснюємо кожен етап, пропонуємо обґрунтовані
            рішення та складаємо план з урахуванням вашого здоров’я, комфорту й
            очікуваного результату.
          </p>
          <p className="banner-text">
            У клініці доступні основні напрями стоматології для дорослих і дітей
            — від консультації та профілактики до складного лікування,
            імплантації, ортодонтії та протезування.
          </p>
        </div>
      </div>
    </section>
  );
}
