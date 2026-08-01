import "./style.css";

export const advantages = [
  {
    id: "01",
    title: "ЗРОЗУМІЛИЙ ПЛАН",
    description: "Ви знаєте, що ми робимо, навіщо і який результат очікувати.",
  },
  {
    id: "02",
    title: "УЗГОДЖЕНА ВАРТІСТЬ",
    description: "Обговорюємо бюджет до початку лікування.",
  },
  {
    id: "03",
    title: "АРГУМЕНТОВАНІ РІШЕННЯ",
    description: "Рекомендуємо лише те, що справді потрібно.",
  },
  {
    id: "04",
    title: "КОНТРОЛЬ РЕЗУЛЬТАТУ",
    description: "Супроводжуємо вас від консультації до завершення лікування.",
  },
];

export function Advantages() {
  return (
    <section className="advantages">
      <div className="container">
        <div className="advantages-top">
          <h2 className="advantages-top-title">
            Спокій починається <br />
            <span>з ясності</span>
          </h2>
          <p className="advantages-top-text">
            Проводимо точну діагностику, пояснюємо можливі варіанти та складаємо
            зрозумілий план лікування ще до початку процедур
          </p>
        </div>
        <div className="advantages-cards">
          {advantages.map((el) => (
            <div className="advantages-card" key={el.id}>
              <p className="advantages-card-count">( {el.id} )</p>
              <div className="advantages-card-flex">
                <h3 className="advantages-card-title">{el.title}</h3>
                <p className="advantages-card-text">{el.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
