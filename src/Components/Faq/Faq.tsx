import Image from "next/image";

export function Faq() {
  return (
    <section className="faq">
      <div className="container">
        <div className="faq-left-img">
          <Image
            src={"/Faq/main.webp"}
            width={1000}
            height={1000}
            alt="Фото кабінету"
          />
        </div>
        <div className="faq-right-content">
          <div className="faq-right-content-top">
            <div className="line"></div>
            <p>FAQ</p>
          </div>
          <div className="faq-right-content-top-text">
            <h2 className="faq-right-content-top-text-title">
              <span>Відповіді</span>
              на <br /> поширенні запитання
            </h2>
            <p className="faq-right-content-top-text-description">
              Зібрали відповіді про консультацію, діагностику, вартість,
              гарантії та підготовку до першого візиту.
            </p>
          </div>
          <div className="faq-right-content-questions">
            <div className="faq-right-content-question-card">
              <div className="faq-right-content-question-card-top"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
