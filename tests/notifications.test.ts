import assert from "node:assert/strict";
import test from "node:test";

import { buildReservationAcknowledgement, buildReservationNotification } from "@/lib/email";
import { buildReservationWhatsAppPayload } from "@/lib/whatsapp";

const reservation = {
  bookingReference: "SH-260814-ABC123",
  customerName: "Asha Sharma",
  customerEmail: "asha@example.com",
  customerPhone: "+9779856028155",
  routeName: "Muktinath Helicopter Tour",
  flightType: "Private flight",
  preferredDate: new Date("2026-09-15T12:00:00.000Z"),
  alternateDate: null,
  passengers: 3,
  pickupPoint: "Lakeside, Pokhara",
  customerNotes: "Morning preferred"
};

test("reservation emails address the business and customer separately", () => {
  const business = buildReservationNotification(reservation, "reservations@sharingheli.com");
  const customer = buildReservationAcknowledgement(reservation);

  assert.equal(business.to, "reservations@sharingheli.com");
  assert.equal(business.replyTo, reservation.customerEmail);
  assert.match(business.text, /WhatsApp: \+9779856028155/);
  assert.equal(customer.to, reservation.customerEmail);
  assert.match(customer.subject, new RegExp(reservation.bookingReference));
});

test("WhatsApp confirmation uses the approved template variable order", () => {
  const request = buildReservationWhatsAppPayload(reservation, {
    accessToken: "test-token",
    graphApiVersion: "v23.0",
    phoneNumberId: "123456789",
    templateName: "reservation_request_received",
    templateLanguage: "en"
  });

  assert.equal(request.url, "https://graph.facebook.com/v23.0/123456789/messages");
  assert.equal(request.body.to, "9779856028155");
  assert.equal(request.body.template.name, "reservation_request_received");
  assert.deepEqual(
    request.body.template.components[0].parameters.map((item) => item.text),
    ["Asha Sharma", "SH-260814-ABC123", "Muktinath Helicopter Tour", "15 September 2026", "3"]
  );
});
