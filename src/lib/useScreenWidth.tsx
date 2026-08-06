import { useEffect, useState } from "react";

export function useScreenWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateWidth = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const newWidth = window.innerWidth;

        setWidth((prev) => (prev !== newWidth ? newWidth : prev));
      });
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return width;
}
