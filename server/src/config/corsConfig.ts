const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";
export const corsOptions = {
  origin: frontend_url,
  methods: ["GET", "POST"],
  credentials: true,
};
