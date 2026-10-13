// Edit these with the client's real details before going live.
export const site = {
  name: "Zeel Tiles & Sanitary",
  short: "ZEEL",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "hello@zeeltiles.in",
  address: "Showroom · Main Road, Gujarat, India",
  hours: "Mon–Sat · 9:30 am – 8:30 pm",
};

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
