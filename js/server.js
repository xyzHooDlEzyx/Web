import express from "express";
import cors from "cors";
import { pool } from "./database.js";
import {
  getZoosList,
  getZoo,
  createZoo,
  updateZoo,
  deleteZoo,
} from "./database.js";

const app = express();

app.use(cors());

app.use(express.json());

app.options("*", cors());

app.get("/zoos", async (req, res, next) => {
  const zoos = await getZoosList();
  res.json(zoos);
});

app.get("/zoos/search", async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const sort = req.query.sort || "asc";

    let zoos;

    if (search) {
      const [result] = await pool.query(
        `
        SELECT *
        FROM zoos
        WHERE zoo LIKE ?;
        `,
        [`%${search}%`]
      );
      zoos = result;
    } else {
      const [result] = await pool.query(
        `
        SELECT *
        FROM zoos
        ORDER BY zoo ${sort === "desc" ? "DESC" : "ASC"};
        `
      );
      zoos = result;
    }

    res.json(zoos);
  } catch (error) {
    next(error);
  }
});

app.get("/zoos/:id", async (req, res, next) => {
  const id = req.params.id;
  const zoo = await getZoo(id);
  res.json(zoo);
});

app.post("/zoos", async (req, res, next) => {
  const { zooName, visitors, animals } = req.body;
  const newZoo = await createZoo(zooName, visitors, animals);
  res.status(201).json(newZoo);
});

app.put("/zoos/:id", async (req, res, next) => {
  const { zooName, visitors, animals } = req.body;
  const result = await updateZoo(req.params.id, zooName, visitors, animals);
  res.json(result);
});

app.delete("/zoos/:id", async (req, res, next) => {
  const result = await deleteZoo(req.params.id);
  res.json(result);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
