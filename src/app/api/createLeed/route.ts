import { NextResponse } from "next/server";
type ContactWay = "phoneCall" | "telegram" | "viber" | "whatsapp";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      phone?: string;
      message?: string;
      contactWay: ContactWay;
    };

    const { name, phone, message, contactWay } = body;

    if (!name || !phone) {
      return NextResponse.json({
        success: false,
        message: "Відсутній номер телефону і Ім'я",
      });
    }

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Telegram environment variables are missing");

      return NextResponse.json({
        success: false,
        message: "Помилка налаштування серверу",
      });
    }

    const contactWayLabels: Record<ContactWay, string> = {
      phoneCall: "Телефонний дзвінок",
      telegram: "Telegram",
      viber: "Viber",
      whatsapp: "WhatsApp",
    };

    const messageTelegram = `
<b>📩 Нова заявка с сайту</b>

<b>👤 Прізвище та ім'я:</b> ${escapeHtml(name)}
<b>📞 Номер телефону:</b> ${escapeHtml(phone)}
<b>📧 Запит:</b> ${escapeHtml(message || "")}
<b>💬 Бажаний спосіб зв'язку:</b> ${escapeHtml(contactWayLabels[contactWay])}
    `.trim();

    console.log(messageTelegram);

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: messageTelegram,
          parse_mode: "HTML",
        }),
      },
    );

    const telegramData = await telegramResponse.json();
    console.log(telegramData);

    return NextResponse.json({
      success: true,
      message: "Заявку відправленно!",
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json({
      success: false,
      message: "Помилка при відправці",
    });
  }
}
