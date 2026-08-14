import { cleanMailHeader } from "@/lib/email";

export type ReservationWhatsAppData = {
  bookingReference: string;
  customerName: string;
  customerPhone: string;
  routeName: string;
  preferredDate: Date;
  passengers: number;
};

type WhatsAppConfig = {
  accessToken: string;
  graphApiVersion: string;
  phoneNumberId: string;
  templateName: string;
  templateLanguage: string;
};

function requiredConfig(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing WhatsApp configuration: ${name}`);
  return value;
}

export function getWhatsAppConfig(): WhatsAppConfig {
  const graphApiVersion = requiredConfig("WHATSAPP_GRAPH_API_VERSION");
  if (!/^v\d+\.\d+$/.test(graphApiVersion)) {
    throw new Error("WHATSAPP_GRAPH_API_VERSION must look like v23.0");
  }

  return {
    accessToken: requiredConfig("WHATSAPP_ACCESS_TOKEN"),
    graphApiVersion,
    phoneNumberId: requiredConfig("WHATSAPP_PHONE_NUMBER_ID"),
    templateName: requiredConfig("WHATSAPP_TEMPLATE_NAME"),
    templateLanguage: requiredConfig("WHATSAPP_TEMPLATE_LANGUAGE")
  };
}

function formatWhatsAppDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeZone: "Asia/Kathmandu"
  }).format(date);
}

export function buildReservationWhatsAppPayload(data: ReservationWhatsAppData, config: WhatsAppConfig) {
  return {
    url: `https://graph.facebook.com/${config.graphApiVersion}/${encodeURIComponent(config.phoneNumberId)}/messages`,
    body: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: data.customerPhone.replace(/\D/g, ""),
      type: "template",
      template: {
        name: config.templateName,
        language: { code: config.templateLanguage },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: cleanMailHeader(data.customerName) },
              { type: "text", text: cleanMailHeader(data.bookingReference) },
              { type: "text", text: cleanMailHeader(data.routeName) },
              { type: "text", text: formatWhatsAppDate(data.preferredDate) },
              { type: "text", text: String(data.passengers) }
            ]
          }
        ]
      }
    }
  };
}

export async function sendReservationWhatsApp(data: ReservationWhatsAppData) {
  const config = getWhatsAppConfig();
  const message = buildReservationWhatsAppPayload(data, config);
  const response = await fetch(message.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(message.body),
    signal: AbortSignal.timeout(12_000)
  });

  if (!response.ok) {
    throw new Error(`WhatsApp API rejected the message (HTTP ${response.status})`);
  }
}
