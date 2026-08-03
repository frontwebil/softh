import "./style.css";

const STEPS = [
  {
    id: "01",
    title: "Консультація",
    text: "Знайомимося з вашим запитом і проводимо первинний огляд",
  },
  {
    id: "02",
    title: "Діагностика",
    text: "Збираємо необхідну інформацію та визначаємо причину проблеми",
  },
  {
    id: "03",
    title: "План лікування",
    text: "Пояснюємо варіанти, етапи, терміни та орієнтовну вартість",
  },
  {
    id: "04",
    title: "Лікування",
    text: "Рухаємося за погодженим планом у комфортному для вас темпі",
  },
  {
    id: "05",
    title: "Контроль",
    text: "Перевіряємо результат і допомагаємо його зберегти",
  },
];

export function Steps() {
  return (
    <section className="steps">
      <div className="container">
        <div className="steps-top">
          <div className="line"></div>
          <p className="steps-top-text">Етапи лікування</p>
          <div className="line"></div>
        </div>

        <h2 className="steps-title">
          Ви завжди знаєте,
          <br />
          <span>що буде далі</span>
        </h2>

        <div className="steps-cards">
          <div className="steps-cards-line"></div>
          {STEPS.map((step) => (
            <div className="steps-card" key={step.id}>
              <div className="steps-card-head">
                <div className="steps-card-count">
                  <span>{step.id}</span>
                </div>
              </div>

              <h3 className="steps-card-title">{step.title}</h3>

              <p className="steps-card-text">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
