import Link from "next/link";
import "./style.css";
import { PiArrowUpRightBold } from "react-icons/pi";

export const services = [
  {
    id: "01",
    title: "КОНСУЛЬТАЦІЯ ТА ДІАГНОСТИКА",
    description:
      "Первинна оцінка стану зубів і ротової порожнини, визначення проблеми та складання попереднього плану лікування.",
  },
  {
    id: "02",
    title: "ТЕРАПЕВТИЧНА ТА ЕНДОДОНТИЧНА СТОМАТОЛОГІЯ",
    description:
      "Лікування карієсу, відновлення пошкоджених зубів і лікування кореневих каналів для збереження власного зуба.",
  },
  {
    id: "03",
    title: "ХІРУРГІЧНА СТОМАТОЛОГІЯ ТА ІМПЛАНТАЦІЯ",
    description:
      "Видалення зубів різного рівня складності та встановлення імплантів для відновлення втрачених зубів.",
  },
  {
    id: "04",
    title: "ОРТОДОНТИЧНЕ ЛІКУВАННЯ",
    description:
      "Корекція прикусу та положення зубів за допомогою брекет-систем, елайнерів і функціональних ортодонтичних апаратів.",
  },
  {
    id: "05",
    title: "ДИТЯЧА СТОМАТОЛОГІЯ",
    description:
      "Профілактика, адаптація та лікування молочних зубів із врахуванням віку й емоційного комфорту дитини.",
  },
  {
    id: "06",
    title: "ОРТОПЕДИЧНА СТОМАТОЛОГІЯ",
    description:
      "Відновлення форми, функції та естетики зубів за допомогою коронок, вінірів і знімних протезів.",
  },
];

export function Services() {
  return (
    <section className="services">
      <div className="container">
        <div className="services-top">
          <h2 className="services-top-title">
            Повний комплекс послуг
            <br />
            <span>в одному місці</span>
          </h2>
          <p className="services-top-text">
            Проводимо точну діагностику, пояснюємо можливі варіанти та складаємо
            зрозумілий план лікування ще до початку процедур
          </p>
        </div>
        <div className="services-cards">
          {services.map((el) => (
            <div className="services-card" key={el.id}>
              <p className="services-card-count">( {el.id} )</p>
              <div className="services-card-flex">
                <h3 className="services-card-title">{el.title}</h3>
                <p className="services-card-text">{el.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="see-price-button">
          <Link href={"/"} className="book-button">
            <p className="book-button-text">переглянути прайс</p>
            <PiArrowUpRightBold className="book-button-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}
