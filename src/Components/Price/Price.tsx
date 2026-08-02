"use client";

import axios from "axios";
import "./style.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Service } from "@/generated/prisma/client";
import { IoIosArrowDown } from "react-icons/io";
import { Icon2 } from "../../../public/Request/Icon2";
import { Icon3 } from "../../../public/Request/Icon3";
import { Icon4 } from "../../../public/Request/Icon4";
import { Icon5 } from "../../../public/Request/Icon5";
import { Icon6 } from "../../../public/Request/Icon3 copy 3";
import { Icon1 } from "../../../public/Request/Icon1";

const PRICE_SECTIONS = [
  {
    key: "consultation",
    title: "Консультативно-діагностичні послуги",
    icon: Icon2,
  },
  {
    key: "therapy",
    title: "Терапевтична та ендодонтична стоматологія",
    icon: Icon3,
  },
  {
    key: "surgery",
    title: "Хірургічна стоматологія",
    icon: Icon4,
  },
  {
    key: "orthodontics",
    title: "Ортодонтичне лікування",
    icon: Icon5,
  },
  {
    key: "pediatric",
    title: "Дитяча стоматологія",
    icon: Icon6,
  },
  {
    key: "prosthetics",
    title: "Ортопедична стоматологія",
    icon: Icon1,
  },
] as const;

type GroupedServices = {
  consultation: Service[];
  therapy: Service[];
  surgery: Service[];
  orthodontics: Service[];
  pediatric: Service[];
  prosthetics: Service[];
};

export function Price() {
  const [services, setServices] = useState<GroupedServices>({
    consultation: [],
    therapy: [],
    surgery: [],
    orthodontics: [],
    pediatric: [],
    prosthetics: [],
  });
  const [opened, setOpened] = useState<string | null>("consultation");
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data } = await axios.get("/api/service/get-all");
        const services: Service[] = data.data;
        const grouped = services.reduce(
          (acc, service) => {
            acc[service.category].push(service);
            return acc;
          },
          {
            consultation: [] as Service[],
            therapy: [] as Service[],
            surgery: [] as Service[],
            orthodontics: [] as Service[],
            pediatric: [] as Service[],
            prosthetics: [] as Service[],
          },
        );

        setServices(grouped);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTestimonials();
  }, []);

  console.log(services);

  return (
    <section className="price">
      <div className="container">
        <div className="price-left">
          <div className="price-top">
            <div className="line"></div>
            <p>ціни на послуги</p>
          </div>
          <div className="price-left-text">
            <h2 className="price-left-text-title">
              Вартість, яку ви розумієте <br />
              <span>до початку лікування</span>
            </h2>
            <p className="price-left-text-description">
              Після діагностики ви отримуєте план із переліком процедур,
              послідовністю етапів та орієнтовним бюджетом. Жодних додаткових
              втручань без попереднього пояснення та погодження.
            </p>
          </div>

          <div className="price-left-cards">
            {PRICE_SECTIONS.map(({ key, title, icon: Icon }) => {
              const list = services[key];

              if (!list.length) return null;

              const isOpen = opened === key;

              return (
                <div className="price-left-card" key={key}>
                  <button
                    className="price-left-card-top"
                    onClick={() => setOpened(isOpen ? null : key)}
                  >
                    <div className="price-left-card-top-left">
                      <Icon />
                      <p>{title}</p>
                    </div>

                    <IoIosArrowDown
                      className={`price-left-card-top-right-icon ${
                        isOpen ? "active" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`price-left-card-content ${
                      isOpen ? "open" : ""
                    }`}
                  >
                    {list.map((el) => (
                      <div className="price-left-card-content-card" key={el.id}>
                        <div className="price-left-card-content-left">
                          <p>( {el.order + 1} )</p>
                          <h4>{el.title}</h4>
                        </div>

                        <div className="price-left-card-content-line" />

                        <div className="price-left-card-content-price">
                          {el.price} грн
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Image
          src={"/Price/main-img.webp"}
          width={1000}
          height={800}
          alt="Прайс Softh CTO"
          className="price-main-img"
        />
      </div>
    </section>
  );
}
