import express from "express";
import { handler } from "./dist/server/entry.mjs";
const app = express();
import "dotenv/config";

app.use(express.static(new URL("./public", import.meta.url).pathname));

app.use(express.json());
app.use("/page", handler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
