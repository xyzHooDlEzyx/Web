import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
// mysql -u root -p
export const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getZoosList() {
  const [result] = await pool.query("SELECT * FROM zoos");
  return result;
}

export async function getZoo(id) {
  const [result] = await pool.query(
    `
    SELECT *
    FROM zoos
    WHERE id = ?
    `,
    [id]
  );
  return result[0];
}

export async function createZoo(zooName, visitors, animals) {
  const [result] = await pool.query(
    `
    insert into zoos (zoo, visitors, animals)
    values(?, ?, ?);
    `,
    [zooName, visitors, animals]
  );
  return result[0];
}

export async function updateZoo(id, zooName, visitors, animals) {
  const [result] = await pool.query(
    `
    UPDATE zoos
    SET zoo = ?, visitors = ?, animals = ?
    WHERE id = ?;
    `,
    [zooName, visitors, animals, id]
  );
  return result;
}

export async function deleteZoo(id) {
  const [result] = await pool.query(
    `
    DELETE FROM zoos
    WHERE id = ?;
    `,
    [id]
  );
  return result;
}

// const zoos = await getZoosList();
// console.log("All zoos:", zoos);

// const zoo = await getZoo(2);
// console.log("Zoo with id 2:", zoo);

// const add = await createZoo("Zoo3", 5000, 100);
// console.log("New zoo added:", add);

// const update = await updateZoo(2, "Updated Zoo", 10000, 200);
// console.log("Zoo updated:", update);

// const deleted = await deleteZoo(3);
// console.log("Zoo deleted:", deleted);
