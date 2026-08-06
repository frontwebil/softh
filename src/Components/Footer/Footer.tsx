import Link from "next/link";
import "./style.css";

const NAV_COLUMNS = [
  [
    { href: "/#services", label: "Послуги" },
    { href: "/#about", label: "Про Клініку" },
    { href: "/#personal", label: "Спеціалісти" },
  ],
  [
    { href: "/#price", label: "Ціни" },
    { href: "/#testimonials", label: "Відгуки" },
    { href: "/#contacts", label: "Контакти" },
  ],
];

const WORK_HOURS = [
  { day: "ПН - ПТ", time: "09:00 - 19:00" },
  { day: "Субота:", time: "10:00 - 18:00" },
  { day: "Неділя:", time: "Зачинено", closed: true },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link href="/" className="footer-logo" aria-label="SOFTH СТО — Головна">
            SOFTH <span>СТО</span>
          </Link>
          <Link href="/privacy-policy" className="footer-policy">
            Політика
            <br />
            конфіденційності
          </Link>
          <p className="footer-copy">© {new Date().getFullYear()} SofthCTO</p>
        </div>

        <div className="footer-col footer-col-nav">
          <p className="footer-col-title">Навігація</p>
          <div className="footer-nav">
            {NAV_COLUMNS.map((column, index) => (
              <ul className="footer-nav-list" key={index}>
                {column.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="footer-nav-link">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">Номер телефону</p>
          <a href="tel:+380982005055" className="footer-phone">
            +38 (098) 200-50-55
          </a>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">Адреса</p>
          <Link
            href="https://maps.app.goo.gl/fi7QUYzG3bm5BjSYA"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-address"
          >
            вулиця Авіаторів, 2Д,
            <br />
            Петропавлівська Борщагівка,
            <br />
            Київська область, 08129
          </Link>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">Години роботи</p>
          <ul className="footer-hours">
            {WORK_HOURS.map(({ day, time, closed }) => (
              <li className="footer-hours-row" key={day}>
                <span className="footer-hours-day">{day}</span>
                <span
                  className={
                    closed ? "footer-hours-time closed" : "footer-hours-time"
                  }
                >
                  {time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
