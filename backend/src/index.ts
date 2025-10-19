import app from "./server";

const port = Number(process.env.PORT) || 3001;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
