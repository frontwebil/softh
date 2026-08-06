"use client";

import Image from "next/image";
import { openAppointmentForm } from "@/lib/appointment";
import "./style.css";

import { PiArrowUpRightBold } from "react-icons/pi";
import { Icon1 } from "../../../public/Request/Icon1";
import { Icon2 } from "../../../public/Request/Icon2";
import { Icon3 } from "../../../public/Request/Icon3";
import { Icon4 } from "../../../public/Request/Icon4";
import { Icon5 } from "../../../public/Request/Icon5";
import { Icon6 } from "../../../public/Request/Icon3 copy 3";

export const treatmentReasons = [
  {
    id: 1,
    title: "Болить або турбує зуб",
    icon: Icon1,
  },
  {
    id: 2,
    title: "Потрібен профілактичний огляд",
    icon: Icon2,
  },
  {
    id: 3,
    title: "Хочу вирівняти зуби",
    icon: Icon3,
  },
  {
    id: 4,
    title: "Потрібно відновити втрачений зуб",
    icon: Icon4,
  },
  {
    id: 5,
    title: "Хочу покращити вигляд усмішки",
    icon: Icon5,
  },
  {
    id: 6,
    title: "Шукаю стоматолога для дитини",
    icon: Icon6,
  },
];

export function Request() {
  return (
    <section className="request" id="request">
      <div className="container">
        <Image
          src={"/Request/main-img.webp"}
          width={1000}
          height={8000}
          alt="Фото кабінету"
          className="request-main-img"
        />
        <div className="request-right-content">
          <div className="request-right-content-top">
            <div className="line"></div>
            <p>Вибір за потребою</p>
          </div>
          <div className="request-right-content-text">
            <h2>
              Розкажіть, <br />
              <span>що вас турбує</span>
            </h2>
            <p>
              Не потрібно самостійно визначати потрібну процедуру. Оберіть свій
              запит — лікар допоможе знайти рішення.
            </p>
          </div>
          <div className="request-right-content-cards">
            {treatmentReasons.map((el) => {
              const Icon = el.icon;

              return (
                <button
                  type="button"
                  className="request-right-content-card"
                  key={el.id}
                  onClick={() => openAppointmentForm(el.title)}
                  aria-label={`Записатися: ${el.title}`}
                >
                  <div className="request-right-content-card-left">
                    <div className="request-right-content-card-left-icon">
                      <Icon />
                    </div>

                    <p className="request-right-content-card-left-text">
                      {el.title}
                    </p>
                  </div>

                  <div className="request-right-content-card-right-icon">
                    <PiArrowUpRightBold className="request-right-button-icon" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
