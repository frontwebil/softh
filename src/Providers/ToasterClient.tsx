"use client";

import dynamic from "next/dynamic";

const Toaster = dynamic(() => import("sonner").then((m) => m.Toaster), {
  ssr: false,
});

export function ToasterClient() {
  return (
    <Toaster
      position="top-right"
      theme="light"
      richColors
      duration={4000}
      toastOptions={{
        style: {
          background: "#FFFFFF",
          color: "#3C3C3C",
          border: "1px solid #D2CBAF",
          borderRadius: "18px",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.08)",
        },
      }}
    />
  );
}
