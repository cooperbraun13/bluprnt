import app from "./server";
import "./config/database"; // Initialize database connection

const port = Number(process.env.PORT) || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${port}`);
});
