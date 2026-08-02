"use client";

import axios from "axios";
import "./style.css";
import { useEffect, useState } from "react";

export function Price() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data } = await axios.get("/api/service/get-all");
        const services = data.data;

        setServices(services);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTestimonials();
  }, []);

  console.log(services);

  return (
    <section className="price">
      <div className="container"></div>
    </section>
  );
}
