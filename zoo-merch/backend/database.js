import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

export const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getProducts() {
  const [rows] = await pool.query("select * from products");
  return rows;
}

export async function getProduct(id) {
  const [rows] = await pool.query(
    `
        select * 
        from products
        where id = ?
        `,
    [id]
  );
  return rows;
}

export function buildProductQuery(search, sort) {
  let query = "SELECT * FROM products";
  const params = [];

  if (search) {
    query += " WHERE title LIKE ?";
    params.push(`%${search}%`);
  }

  if (sort) {
    switch (sort) {
      case "A-Z":
        query += " ORDER BY title ASC";
        break;
      case "Z-A":
        query += " ORDER BY title DESC";
        break;
      case "Price Asc":
        query += " ORDER BY price ASC";
        break;
      case "Price Desc":
        query += " ORDER BY price DESC";
        break;
      default:
        break;
    }
  }

  return { query, params };
}

export async function createProduct(
  title,
  description,
  descriptionSmall,
  price,
  alterText,
  imgSrc
) {
  const [result] = await pool.query(
    `INSERT INTO products (title, description, descriptionSmall, price, alterText, imgSrc) 
         VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description, descriptionSmall, price, alterText, imgSrc]
  );
  return result.insertId;
}

const prd = await getProduct(8);
console.log(prd);

// const prd = await createProduct("test", "test", "test", 1.0, "test", "test");
// console.log(prd);
