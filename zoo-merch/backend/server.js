import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getProduct, buildProductQuery, pool } from "../backend/database.js";

const app = express();
app.use(cors());
app.use(express.json());

const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, "your_secret_key");
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  next();
};

app.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const [existingUser] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (existingUser.length > 0) {
    return res.status(400).json({ message: "Email is already registered" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await pool.query(
    "INSERT INTO users (email, password, first_name, last_name, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
    [email, hashedPassword, firstName, lastName]
  );

  console.log(result);

  res.status(201).json({ message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (user.length === 0) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user[0].password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { email: user.email, userId: user[0].id },
    "your_secret_key",
    {
      expiresIn: "1h",
    }
  );

  res.json({
    message: "Login successful",
    userId: user[0].id,
    token,
  });
});

app.get("/products", authenticateJWT, async (req, res, next) => {
  try {
    const { search = "", sort = "", filter = "" } = req.query;

    const { query, params } = buildProductQuery(search, sort, filter);

    console.log("Executing query:", query);
    console.log("With params:", params);

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error.message);
    next(error);
  }
});

app.get("/products/:id", authenticateJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await getProduct(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something Broke!");
});

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
