export const contentSecurityPolicy = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      "https://cdn.jsdelivr.net",
      "https://cdnjs.cloudflare.com",
      "https://www.googletagmanager.com",
      "https://www.clarity.ms",
      "https://k.clarity.ms/",
      "https://unpkg.com",
      "https://a.clarity.ms",
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      "https://fonts.googleapis.com",
      "https://cdn.jsdelivr.net",
    ],
    imgSrc: [
      "'self'",
      "data:",
      "https://westmar.ca",
      "https://unpkg.com",
      "https://as1.ftcdn.net",
      "https://as2.ftcdn.net",
      "https://onekindesign.com",
      "https://www.googletagmanager.com",
      "https://ddfcdn.realtor.ca",
    ],
    fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
    connectSrc: [
      "'self'",
      "ws://localhost:3003",
      "http://localhost:3003",
      "https://tylerbradsen.com",
      "https://unpkg.com",
      "https://k.clarity.ms",
      "https://www.clarity.ms",
      "https://a.clarity.ms",
    ],
    frameSrc: ["https://maps.google.com", "https://www.google.com"],
  },
};

export const corsOptions = {
  origin: process.env.CORS_ORIGIN || "https://tylerbradsen.com",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Real-IP",
    "X-Forwarded-For",
    "X-Forwarded-Proto",
  ],
  credentials: true,
};
