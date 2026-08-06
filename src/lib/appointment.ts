/**
 * Спільна логіка для CTA-кнопок: скрол до форми запису
 * та автозаповнення поля «Чим ми можемо Вам допомогти?».
 */

export const APPOINTMENT_FORM_ID = "appointment-form";
export const APPOINTMENT_EVENT = "softh:appointment-request";

export type AppointmentRequestDetail = {
  /** Текст, який підставиться у поле «Чим ми можемо Вам допомогти?» */
  message?: string;
};

/** Скролить до форми запису і (опційно) заповнює поле запиту. */
export function openAppointmentForm(message?: string) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<AppointmentRequestDetail>(APPOINTMENT_EVENT, {
      detail: { message },
    }),
  );

  document
    .getElementById(APPOINTMENT_FORM_ID)
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
}
