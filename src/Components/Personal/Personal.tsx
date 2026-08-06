"use client";

import "./style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const doctors = [
  {
    id: 1,
    name: "Ім'я лікаря",
    specialization: "Імплантологія та хірургія",
    experience: "14 років досвіду",
    image: "/doctors/doctor-1.webp",
    services: ["Кісткова пластика", "Зубні імплантати", "Складні видалення"],
  },
  {
    id: 2,
    name: "Ім'я лікаря",
    specialization: "Терапевтична стоматологія",
    experience: "11 років досвіду",
    image: "/doctors/doctor-2.webp",
    services: [
      "Лікування карієсу",
      "Естетичні реставрації",
      "Ендодонтичне лікування",
    ],
  },
  {
    id: 3,
    name: "Ім'я лікаря",
    specialization: "Ортодонтія",
    experience: "9 років досвіду",
    image: "/doctors/doctor-3.webp",
    services: ["Брекет-системи", "Елайнери", "Виправлення прикусу"],
  },
  {
    id: 4,
    name: "Ім'я лікаря",
    specialization: "Ортопедична стоматологія",
    experience: "15 років досвіду",
    image: "/doctors/doctor-4.webp",
    services: ["Керамічні коронки", "Вініри", "Протезування"],
  },
  {
    id: 5,
    name: "Ім'я лікаря",
    specialization: "Дитяча стоматологія",
    experience: "8 років досвіду",
    image: "/doctors/doctor-5.webp",
    services: [
      "Лікування молочних зубів",
      "Профілактика карієсу",
      "Гігієна порожнини рота",
    ],
  },
  {
    id: 6,
    name: "Ім'я лікаря",
    specialization: "Пародонтологія",
    experience: "12 років досвіду",
    image: "/doctors/doctor-6.webp",
    services: ["Лікування ясен", "Закритий кюретаж", "Плазмотерапія"],
  },
  {
    id: 7,
    name: "Ім'я лікаря",
    specialization: "Гігієна та профілактика",
    experience: "7 років досвіду",
    image: "/doctors/doctor-7.webp",
    services: ["Професійна чистка", "Відбілювання зубів", "Фторування"],
  },
  {
    id: 8,
    name: "Ім'я лікаря",
    specialization: "Щелепно-лицева хірургія",
    experience: "16 років досвіду",
    image: "/doctors/doctor-8.webp",
    services: [
      "Видалення зубів мудрості",
      "Хірургічне лікування кіст",
      "Пластика вуздечки",
    ],
  },
];

export function Personal() {
  return (
    <section className="personal">
      <div className="container">
        <div className="personal-top">
          <div className="personal-top-left">
            <div className="personal-top-left-line">
              <div className="line"></div>
              <p>спеціалісти</p>
            </div>
            <h2 className="personal-top-left-title">
              Команда,{" "}
              <span style={{ fontStyle: "italic" }}>якій довіряють</span>{" "}
            </h2>
          </div>
          <div className="personal-top-right">
            <p>
              Ви отримуєте зрозумілі пояснення, кілька варіантів лікування та
              комплексний погляд на складні випадки
            </p>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={4}
          breakpoints={{
            320: {
              slidesPerView: 1.1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
        >
          {doctors.map((el) => (
            <SwiperSlide key={el.id}>
              <div className="personal-card">
                <div className="personal-card-img"></div>

                <h3 className="personal-card-name">{el.name}</h3>

                <p className="personal-card-specialization">
                  {el.specialization}
                </p>

                <div className="personal-card-more">
                  <h3 className="personal-card-more-title">{el.experience}</h3>

                  <div className="personal-card-more-list">
                    {el.services.map((service, i) => (
                      <div className="personal-card-more-list-item" key={i}>
                        <div className="personal-card-more-list-disc-item" />
                        <p className="personal-card-more-list-item-text">
                          {service}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
